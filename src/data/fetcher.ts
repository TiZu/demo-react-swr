/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'unfetch';
import { FetchError } from './fetchError';

const baseUrl = 'http://localhost:3001';

export async function fetchWithBaseUrl(url: string): Promise<any> {
  const fullUrl = baseUrl + url;

  const response = await fetch(fullUrl);

  if (!response.ok) {
    const fetchError = new FetchError('Error performing get request.');
    fetchError.status = response.status;
    const responseJson = await response.json();
    fetchError.info = Object.keys(responseJson).length === 0 ? undefined : JSON.stringify(responseJson);

    throw fetchError;
  }

  return response.json();
}

export async function postWithBaseUrl(url: string, data: any): Promise<any> {
  const fullUrl = baseUrl + url;

  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const fetchError = new FetchError('Error performing post request.');
    fetchError.status = response.status;
    fetchError.info = JSON.stringify(await response.json());

    throw fetchError;
  }

  return response.json();
}
