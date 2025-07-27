export async function fetchMembers() {
  const res = await fetch(
    import.meta.env.VITE_API_URL + '/members/list_members',
    {
      method: 'GET',
      headers: {
        'X-API-KEY': import.meta.env.VITE_API_KEY,
      },
    },
  );

  const data = await res.json();

  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }

  return data;
}
