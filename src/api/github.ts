// Fetch specific Github User
export const fetchGithubUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`
  );

  if (!res.ok) throw new Error(`User ${username} not found.`);

  const data = await res.json();
  return data;
};

// Suggest top 5 Github Users based on query
export const searchGithubUser = async (query: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`
  );

  if (!res.ok) throw new Error(`User ${query} not found.`);

  const data = await res.json();
  return data.items;
};

// Check if following a user on Github
export const checkIfFollowingUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    }
  );

  // check if followed by the auth user (204) or not followed (404)
  if (res.status === 204) {
    return true;
  } else if (res.status === 404) {
    return false;
  } else {
    throw new Error(
      `Failed to check follow status: ${res.statusText} (Status: ${res.status})`
    );
  }
};

// PUT mutation - Follow user on Github
export const followGithubUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to follow user');
  }

  return true;
};

// DELETE mutation - Unfollow user on Github
export const unfollowGithubUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to unfollow user');
  }

  return true;
};
