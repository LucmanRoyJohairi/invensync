export async function fetchWithAuth(path: string, options = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    credentials: 'include', // Important for sending cookies
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401) {
    // attempt refresh
    const refreshed = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    if (refreshed.ok) {
      // retry original request
      return fetchWithAuth(path, options);
    } else {
      throw new Error('Unauthorized');
    }
  }

  return res;
}
