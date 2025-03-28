     import { NextResponse } from 'next/server'
     
     // Helper function to implement retry logic with exponential backoff
     async function fetchWithRetry(
       url: string,
       options: RequestInit,
       maxRetries: number = 3,
       baseDelayMs: number = 1000
     ): Promise<Response> {
       let lastError: Error | null = null;
       
       for (let attempt = 0; attempt < maxRetries; attempt++) {
         try {
           console.log(`Fetch attempt ${attempt + 1}/${maxRetries}`);
           const response = await fetch(url, options);
           return response;
         } catch (error) {
           lastError = error instanceof Error ? error : new Error(String(error));
           
           // Don't retry if it's an AbortError (timeout)
           if (lastError.name === 'AbortError') {
             console.log('Request was aborted (timeout), not retrying');
             throw lastError;
           }
           
           // Don't retry if we've reached the max retries
           if (attempt >= maxRetries - 1) {
             console.log(`Maximum retry attempts (${maxRetries}) reached, giving up`);
             throw lastError;
           }
           
           // Calculate exponential backoff delay with jitter
           const delay = baseDelayMs * Math.pow(2, attempt) * (0.5 + Math.random() * 0.5);
           console.log(`Retrying in ${delay}ms...`);
           await new Promise(resolve => setTimeout(resolve, delay));
         }
       }
       
       // This should never happen, but TypeScript needs it
       throw lastError || new Error('Unknown error during fetch retry');
     }
     
     export async function POST(request: Request) {
       try {
         const { url, depth = 3 } = await request.json()
     
         if (!url) {
           return NextResponse.json(
             { error: 'URL is required' },
             { status: 400 }
           )
         }
     
         // Validate depth is between 1 and 5
         const validatedDepth = Math.min(5, Math.max(1, parseInt(String(depth)) || 3))
         
         console.log('Making discover request for URL:', url, 'with depth:', validatedDepth)
         
         // Make a direct request to the backend API instead of using the discoverSubdomains function
         const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:24125'
         console.log('Using backend URL:', backendUrl)
         
         console.log('Sending request to backend API:', `${backendUrl}/api/discover`)
         
         // Set a long timeout for the fetch request (10 minutes)
         // This is necessary because the backend can take 5-7 minutes to process complex URLs
         const timeoutMs = 10 * 60 * 1000; // 10 minutes in milliseconds
         console.log(`Setting fetch timeout to ${timeoutMs}ms (${timeoutMs/60000} minutes)`);
         
         // Create an AbortController to handle the timeout
         const controller = new AbortController();
         const timeoutId = setTimeout(() => {
           console.log(`Fetch timeout of ${timeoutMs}ms reached, aborting request`);
           controller.abort();
         }, timeoutMs);
         
         try {
           // Use fetchWithRetry instead of fetch to implement retry logic with exponential backoff
           const response = await fetchWithRetry(
             `${backendUrl}/api/discover`,
             {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({ url, depth: validatedDepth }),
               signal: controller.signal,
             },
             3, // maxRetries
             1000 // baseDelayMs
           );
      
      // Clear the timeout since the request completed
      clearTimeout(timeoutId);
      
      console.log('Response status from backend:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error response from backend:', errorData)
        return NextResponse.json(
          { error: errorData.error || 'Failed to discover pages' },
          { status: response.status }
        )
      }
      
      const data = await response.json()
      console.log('Received response from backend:', data)
      console.log('Discovered pages count:', data.pages?.length || 0)
      if (data.pages?.length > 0) {
        console.log('First discovered page:', data.pages[0])
      } else {
        console.warn('No pages were discovered')
      }
  
      // Even if we get an empty array, we should still return it with a 200 status
      return NextResponse.json({
        pages: data.pages || [],
        message: data.message || (data.pages?.length === 0 ? 'No pages discovered' : `Found ${data.pages?.length} pages`)
      })
    } catch (fetchError: unknown) {
      // Clear the timeout to prevent memory leaks
      clearTimeout(timeoutId);
      
      console.error('Error during fetch operation:', fetchError);
      
      // Check if this is an AbortError (timeout)
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error('Request was aborted due to timeout');
        return NextResponse.json(
          {
            error: 'Request timed out after ' + (timeoutMs / 60000) + ' minutes',
            details: 'The backend service is taking too long to respond. This may happen with complex websites.',
            errorType: 'TimeoutError',
            pages: []
          },
          { status: 504 } // Gateway Timeout
        );
      }
      
      // Check for other types of errors
      if (fetchError instanceof Error) {
        console.error('Error name:', fetchError.name);
        console.error('Error message:', fetchError.message);
        
        // Check for network-related errors
        if (fetchError.message.includes('fetch') || fetchError.message.includes('network')) {
          console.error('Network error detected during fetch operation');
        }
      }
      
      // Re-throw the error to be caught by the outer try-catch
      throw fetchError;
    }
    
  } catch (error: unknown) {
    console.error('Error in discover route:', error)
    
    // Log more detailed information about the error
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
      
      // Check for network-related errors
      if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('ECONNREFUSED')) {
        console.error('Network error detected - possible connection issue to backend service')
      }
      
      // Check for timeout errors
      if (error.message.includes('timeout')) {
        console.error('Timeout error detected - backend service might be taking too long to respond')
      }
      
      // Check specifically for HeadersTimeoutError
      const errorCause = (error as any).cause;
      if (errorCause && errorCause.code === 'UND_ERR_HEADERS_TIMEOUT') {
        console.error('HeadersTimeoutError detected - server took too long to send headers')
        return NextResponse.json(
          {
            error: 'The server took too long to respond',
            details: 'The backend service is taking too long to send response headers. This may happen with complex websites that require extensive processing.',
            errorType: 'HeadersTimeoutError',
            pages: []
          },
          { status: 504 } // Gateway Timeout
        )
      }
    }
    
    // Check if it's a TypeError, which might indicate issues with the response format
    if (error instanceof TypeError) {
      console.error('TypeError detected - possible issue with response format or undefined values')
      
      // Check if it's specifically a fetch failure
      if (error.message.includes('fetch failed')) {
        console.error('Fetch failure detected - this might be due to a timeout or connection issue')
        return NextResponse.json(
          {
            error: 'Failed to fetch data from the backend service',
            details: 'The request to the backend service failed. This might be due to a timeout or connection issue.',
            errorType: 'FetchError',
            pages: []
          },
          { status: 503 } // Service Unavailable
        )
      }
    }
    
    // Default error response
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to discover pages',
        details: error instanceof Error ? error.stack : undefined,
        errorType: error instanceof Error ? error.name : 'Unknown',
        pages: []
      },
      { status: 500 }
    )
  }
}