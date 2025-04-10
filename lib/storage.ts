export async function saveMarkdown(url: string, content: string) {
  try {
    const response = await fetch('/api/storage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, content }),
    })

    if (!response.ok) {
      throw new Error('Failed to save markdown')
    }

    return await response.json()
  } catch (error) {
    console.error('Error saving markdown:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to save markdown' }
  }
}

export async function loadMarkdown(url: string) {
  try {
    const response = await fetch(`/api/storage?url=${encodeURIComponent(url)}`)
    
    if (!response.ok) {
      throw new Error('Failed to load markdown')
    }
    
    const data = await response.json()
    // Return just the content string rather than the entire response object
    return data.content || ''
  } catch (error) {
    console.error('Error loading markdown:', error)
    return ''
  }
}