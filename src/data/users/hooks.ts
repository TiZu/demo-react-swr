import useSWR from 'swr';
import { fetchWithBaseUrl } from '../fetcher';
import { FetchError } from '../fetchError';
import { FetchResult } from '../fetchResult';
import { UserDto } from './dto';

export function useAllUsers(): FetchResult<UserDto[]> {
  const { data, error, mutate } = useSWR<UserDto[], FetchError>(`/users`, fetchWithBaseUrl);

  return {
    data,
    isLoading: !data && !error,
    error,
    mutate,
  };
}

export function useUserById(userId: number): FetchResult<UserDto> {
  const { data, error, mutate } = useSWR<UserDto, FetchError>(`/users/${userId}`, fetchWithBaseUrl);

  return {
    data,
    isLoading: !data && !error,
    error,
    mutate,
  };
}
