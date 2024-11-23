export const request = async (path, params, method = 'GET') => {
  let url = `https://api.themoviedb.org/3/${path}`;

  let options: RequestInit = {
    method,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };
  if ('GET' === method) {
    url += '?' + new URLSearchParams(params).toString();
  } else {
    options.body = JSON.stringify(params);
  }

  console.log(`request`, url, options);

  const response = await fetch(url, options);
  return response.json();
};
