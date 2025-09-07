export const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(url, options)
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`)
  }
  if (response.status === 204) {
    return null as T
  }
  return response.json() as Promise<T>
}
