export async function fetcher<JSON = any>(url: RequestInfo | URL, options?: RequestInit) {
  if (!url) {
    throw new Error('URL is not defined');
  }

  const fullUrl = new URL(url.toString());
  // console.log('🚀 ~ file: fetcher.ts:10 ~ fullUrl:', fullUrl);

  let reponse: Response;

  if (!options) {
    reponse = await fetch(fullUrl);
  } else {
    reponse = await fetch(fullUrl, options);
  }

  const data = await reponse.json();

  if (reponse.status !== 200) {
    throw new Error(data.message || 'Failed to fetch API');
  }

  return data;
}
