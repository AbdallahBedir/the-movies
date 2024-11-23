import { request } from './request';

describe('request', () => {
  let fetchMock: any = undefined;

  it('should send params correctly with GET method', () => {
    fetchMock = jest.spyOn(global, 'fetch');

    request('movie/top_rated', { page: 3, language: 'en-US' });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/top_rated?page=3&language=en-US',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: expect.any(String),
        },
      },
    );
  });

  it('should send request body correctly with POST method', () => {
    fetchMock = jest.spyOn(global, 'fetch');

    const payload = {
      media_id: 123456,
    };

    request('account/watchlist', payload, 'POST');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/account/watchlist',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: expect.any(String),
        },
        body: JSON.stringify(payload),
      },
    );
  });
});
