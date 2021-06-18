/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchError } from './fetchError';

export interface FetchResult<TData> {
  data?: TData;
  isLoading: boolean;
  error?: FetchError;
  mutate: any;
}
