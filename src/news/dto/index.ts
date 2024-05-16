import { IsNotEmpty, IsString } from 'class-validator';

export class TextDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
