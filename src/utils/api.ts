export async function fetchAPI<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const response = await fetch(`${baseUrl}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export async function createApiError(response: Response): Promise<Error> {
  const data = await response.json().catch(() => ({}));
  return new Error(data.error || data.message || 'An error occurred');
}
