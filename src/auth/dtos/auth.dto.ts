// create-auth.dto.ts
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name;

  @IsOptional()
  @IsString()
  image;

  @IsEmail()
  email;
}
