import { IsNotEmpty, IsString } from 'class-validator';

export class FindByUserIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
