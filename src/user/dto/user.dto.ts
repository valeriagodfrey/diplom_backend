export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly secondName: string;
  readonly nickName: string;
  readonly role: 'user' | 'mentor';
}
// src/users/dto/update-user.dto.ts
export class UpdateUserDto {
  readonly email?: string;
  readonly firstName?: string;
  readonly secondName?: string;
  readonly nickName?: string;
  readonly role?: 'user' | 'mentor';
  readonly dob?: Date;
  readonly phone?: string;
  readonly country?: string;
  readonly city?: string;
  readonly postalCode?: string;
}
