export const getAllParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const obj = {};

  for (let [q, a] of searchParams) obj[q] = a;

  return obj;
};

export const setParam = (params, k, v) => {
  if (typeof k == "object") {
    const paramArr = [];
    for (const k in params) paramArr.push([k, params[k]]);
    for (const key in k) paramArr.push([key, k[key]]);
    return paramArr.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&");
  } else {
    params[k] = v;
    const paramArr = [];
    for (const k in params) paramArr.push([k, params[k]]);
    return paramArr.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&");
  }
};
