const BASE_URL = "https://www.reddit.com/r";

export async function fetcher(resource: string) {
  const response = await fetch(`${BASE_URL}${resource}`);
  const json = await response.json();

  return json;
}
