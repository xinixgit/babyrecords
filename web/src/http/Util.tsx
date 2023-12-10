export const handleResponse = (response: Response) => {
  if (response.ok) {
    return response.json()
  }
  throw new Error('Request failed with status: ' + response.status);
}