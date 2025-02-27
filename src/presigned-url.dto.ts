import { IsNotEmpty, IsString } from 'class-validator';

export class PresignedUrlDto {
  @IsNotEmpty()
  @IsString()
  filename: string;
}
