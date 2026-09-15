const blobPrefix = 'blob:'

/**
 * Create an object url for a freshly picked file, releasing the one it replaces
 * @param previous the url currently displayed, released when it is an object url
 * @param file the file to expose
 * @returns the object url of the given file
 */
export function replaceObjectUrl(previous: string, file: File): string {
  if (previous.startsWith(blobPrefix)) URL.revokeObjectURL(previous)
  return URL.createObjectURL(file)
}
