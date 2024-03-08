// create-log.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class CreateLogDto {
  @IsString()
  streakId: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  created_at?: Date;

  @IsOptional()
  updated_at?: Date;
}
