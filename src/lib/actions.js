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

  return res.json();
}
