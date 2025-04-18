import { IsNumber } from 'class-validator';

export class FindById {
  @IsNumber()
  id: number;
}
