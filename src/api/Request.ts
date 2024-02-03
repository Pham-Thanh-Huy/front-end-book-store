export async function url_request(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Không thể truy cập ${url}`);
  }

  return response.json();
}
