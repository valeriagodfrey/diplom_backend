// src/posts/dto/post.dto.ts
export class CreatePostDto {
  readonly title: string;
  readonly content: string;
  readonly tags?: string[];
  readonly image?: string;
  readonly communityId: number;
  readonly userId: string;
}

export class UpdatePostDto {
  readonly content?: string;
  readonly image?: string;
}
