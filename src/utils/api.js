const BASE_URL = 'https://forum-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

async function fetchWithAuth(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const responseJson = await response.json();

  if (!response.ok || responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
}

const api = {
  putAccessToken,

  register({ name, email, password }) {
    return fetchJson(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
  },

  async login({ email, password }) {
    const data = await fetchJson(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    return data.token;
  },

  async getOwnProfile() {
    const response = await fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    return responseJson.data.user;
  },

  async getAllUsers() {
    const data = await fetchJson(`${BASE_URL}/users`);
    return data.users;
  },

  async getAllThreads() {
    const data = await fetchJson(`${BASE_URL}/threads`);
    return data.threads;
  },

  async getThreadDetail(id) {
    const data = await fetchJson(`${BASE_URL}/threads/${id}`);
    return data.detailThread;
  },

  async createThread({ title, body, category }) {
    const response = await fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, category }),
    });
    const json = await response.json();
    return json.data.thread;
  },

  async createComment(threadId, content) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      }
    );
    const json = await response.json();
    return json.data.comment;
  },

  upVoteThread(id) {
    return fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, { method: 'POST' });
  },

  downVoteThread(id) {
    return fetchWithAuth(`${BASE_URL}/threads/${id}/down-vote`, { method: 'POST' });
  },

  neutralizeThreadVote(id) {
    return fetchWithAuth(`${BASE_URL}/threads/${id}/neutral-vote`, { method: 'POST' });
  },

  upVoteComment(threadId, commentId) {
    return fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      { method: 'POST' }
    );
  },

  downVoteComment(threadId, commentId) {
    return fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      { method: 'POST' }
    );
  },

  neutralizeCommentVote(threadId, commentId) {
    return fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      { method: 'POST' }
    );
  },

  async getLeaderboards() {
    const data = await fetchJson(`${BASE_URL}/leaderboards`);
    return data.leaderboards;
  },
};

export default api;