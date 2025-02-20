export class CreateCommunityDto {
  readonly name: string;
  readonly category: string;
  readonly description?: string;
  readonly userId: string;
}

export class UpdateCommunityDto {
  readonly name?: string;
  readonly category?: string;
  readonly description?: string;
}
