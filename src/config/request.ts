export const request = async (path, params, method = 'GET') => {
  let url = `https://api.themoviedb.org/3/${path}`;

  let options: RequestInit = {
    method,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTQwNmI0MTU5NTJjZTNkYjI1N2UzNWVjODhmMDgyOSIsIm5iZiI6MTczMjEzMzg5NS42Njk4NTA4LCJzdWIiOiI2NzNjZmE4ODM1NTU0MTc5MTNiMTYzYmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ND4MEyIVXKdwhifbOGt_nOflkune7cdxERyjJvq4kjA',
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
