export interface ResponseType {
  code: number;
  data?: {
    [key: string]: any,
  },
  message?: string;
}

export async function get(url: string, query?: object) {
  const res = await fetch(url);
  const response = await res.json();
  if (response.code === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}

export async function post(url: string, params?: object) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params || {}),
  });
  const response = await res.json();
  if (response.code === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}
