export const BASE_URL = 'https://forum-api.dicoding.dev/v1';

export function getAccessToken() {
  return localStorage.getItem('accessToken') || '';
}

export function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}