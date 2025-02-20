export class CreateWorkDto {
  title: string;
  category: string;
  image: Buffer;
  author: string;
  userId: string;
}

export class UpdateWorkDto {
  title?: string;
  category?: string;
  image?: Buffer;
  author?: string;
  likes?: number;
  isLiked?: boolean;
  isFavorite?: boolean;
}
