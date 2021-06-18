import useSWR from 'swr';
import { fetchWithBaseUrl } from '../fetcher';
import { FetchError } from '../fetchError';
import { FetchResult } from '../fetchResult';
import { PostDto } from './dto';

export function useAllPosts(): FetchResult<PostDto[]> {
  const { data, error, mutate } = useSWR<PostDto[], FetchError>(`/posts`, fetchWithBaseUrl);

  return {
    data,
    isLoading: !data && !error,
    error,
    mutate,
  };
}

export function usePostById(postId: number): FetchResult<PostDto> {
  const { data, error, mutate } = useSWR<PostDto, FetchError>(`/posts/${postId}`, fetchWithBaseUrl);

  return {
    data,
    isLoading: !data && !error,
    error,
    mutate,
  };
}

export function usePostsByUserId(userId: number): FetchResult<PostDto[]> {
  const { data, error, mutate } = useSWR<PostDto[], FetchError>(`/users/${userId}/posts`, fetchWithBaseUrl);

  return {
    data,
    isLoading: !data && !error,
    error,
    mutate,
  };
}
