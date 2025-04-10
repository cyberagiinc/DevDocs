interface MdCombineOptions {
  contents: string[];
  filenames: string[];
  addFilenameHeaders?: boolean;
  addSeparators?: boolean;
  transformLinks?: boolean;
  customSeparator?: string;
  removeExtraNewlines?: boolean;
  stripMetadata?: boolean;
  removeLinks?: boolean;
}

/**
 * Combines multiple markdown contents into a single file
 * @param options Configuration options for combining markdown contents
 * @returns Object containing the combined content
 */
export function combineMarkdownContents(options: MdCombineOptions) {
  const {
    contents,
    filenames,
    addFilenameHeaders = true,
    addSeparators = true,
    transformLinks = true,
    customSeparator = '---',
    removeExtraNewlines = false,
    stripMetadata = false,
    removeLinks = false
  } = options;

  if (!contents || contents.length === 0) {
    throw new Error('No markdown contents provided for combining');
  }

  if (contents.length !== filenames.length) {
    throw new Error('Number of content items must match number of filenames');
  }

  let combinedContent = '';
  const separator = addSeparators ? `\n\n${customSeparator}\n\n` : '\n\n';
  
  for (const [index, content] of contents.entries()) {
    try {
      const filename = filenames[index];
      
      // Start with the original content
      let processedContent = content;

      // Strip metadata if requested
      if (stripMetadata) {
        processedContent = removeYamlFrontMatter(processedContent);
      }
      
      // Add header with filename if requested
      if (addFilenameHeaders) {
        combinedContent += `# ${filename}\n\n`;
      }
      
      // Remove links if requested (this takes precedence over transforming links)
      if (removeLinks) {
        processedContent = removeMarkdownLinks(processedContent);
      }
      // Transform internal links if requested (only if not removing links)
      else if (transformLinks) {
        processedContent = transformInternalLinks(processedContent, filename, filenames);
      }
      
      // Remove extra newlines if requested
      if (removeExtraNewlines) {
        processedContent = removeConsecutiveNewlines(processedContent);
      }
      
      combinedContent += processedContent;
      
      // Add separator between contents (except after the last one)
      if (index < contents.length - 1) {
        combinedContent += separator;
      }
    } catch (error) {
      console.error(`Error processing content for ${filenames[index]}:`, error);
      throw error;
    }
  }
  
  return {
    content: combinedContent
  };
}

/**
 * Transforms internal links between markdown files to work in the combined document
 * @param content The markdown content to transform
 * @param currentFilename Name of the current file being processed
 * @param allFilenames List of all filenames being combined
 * @returns Transformed markdown content
 */
function transformInternalLinks(content: string, currentFilename: string, allFilenames: string[]): string {
  // Regular expression to find markdown links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  return content.replace(linkRegex, (match, linkText, linkTarget) => {
    // Skip external links (those with protocols like http://)
    if (linkTarget.match(/^(https?|ftp):/i)) {
      return match;
    }
    
    // Skip anchor links (those starting with #)
    if (linkTarget.startsWith('#')) {
      return match;
    }
    
    // Check if the link target references one of our filenames
    const targetFilename = allFilenames.find(filename => 
      linkTarget === filename || 
      linkTarget.endsWith(`/${filename}`) || 
      linkTarget.endsWith(`\\${filename}`)
    );
    
    if (targetFilename) {
      // Transform to an anchor link to the section header for that file
      return `[${linkText}](#${targetFilename.toLowerCase().replace(/\s+/g, '-')})`;
    }
    
    // Otherwise, keep the link as is
    return match;
  });
}

/**
 * Removes consecutive newlines, ensuring there's at most one blank line between content
 * @param content The markdown content to process
 * @returns Processed content with extra newlines removed
 */
function removeConsecutiveNewlines(content: string): string {
  // Replace 3 or more consecutive newlines with just 2 newlines (one blank line)
  return content.replace(/\n{3,}/g, '\n\n');
}

/**
 * Removes YAML front matter from the beginning of a markdown string
 * @param content The markdown content to process
 * @returns Content with YAML front matter removed
 */
function removeYamlFrontMatter(content: string): string {
  // Regex to match YAML front matter (--- block at the start)
  // It handles both --- and ... as closing delimiters
  const frontMatterRegex = /^---\s*[\s\S]*?\s*(?:---|\.\.\.)\s*\n?/; 
  
  // Check if the content starts with a YAML block
  if (content.trim().startsWith('---')) {
    return content.replace(frontMatterRegex, '');
  }
  
  // Return original content if no front matter found
  return content;
}

/**
 * Removes all markdown links, replacing them with just the link text
 * @param content The markdown content to process
 * @returns Content with markdown links removed, preserving only the link text
 */
function removeMarkdownLinks(content: string): string {
  // Regular expression to find markdown links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  // Replace links with just the link text
  return content.replace(linkRegex, (match, linkText) => {
    return linkText;
  });
} 