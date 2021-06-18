import useSWR from 'swr';
import { fetchWithBaseUrl } from '../fetcher';
import { FetchError } from '../fetchError';
import { FetchResult } from '../fetchResult';
import { CommentDto } from './dto';

export function useCommentsByPostId(postId: number): FetchResult<CommentDto[]> {
  const { data, error, mutate } = useSWR<CommentDto[], FetchError>(`/posts/${postId}/comments`, fetchWithBaseUrl);

  return {
    data,
    isLoading: !data && !error,
    error,
    mutate,
  };
}
