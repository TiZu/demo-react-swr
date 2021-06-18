import { postWithBaseUrl } from '../fetcher';
import { CommentDto, CreateCommentDto } from './dto';

export async function requestCreateComment(comment: CreateCommentDto): Promise<CommentDto> {
  return await postWithBaseUrl(`/comments`, comment);
}
