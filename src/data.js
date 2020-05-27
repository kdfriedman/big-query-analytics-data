export const fetchData = async (url = '', data) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP Status Code - ${response.status}: failed to fetch`);
    }
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
