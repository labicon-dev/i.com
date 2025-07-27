export async function fetchMembers() {
  if (!import.meta.env.VITE_API_URL || !import.meta.env.VITE_API_KEY) {
    console.warn(
      'API environment variables not configured. Returning empty members array.',
    );
    return [];
  }

  try {
    const res = await fetch(
      import.meta.env.VITE_API_URL + '/members/list_members',
      {
        method: 'GET',
        headers: {
          'X-API-KEY': import.meta.env.VITE_API_KEY,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status}`);
    }

    const data = await res.json();

    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }

    return data;
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
}
