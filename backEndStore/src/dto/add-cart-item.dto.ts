import { IsInt, IsOptional, Min } from 'class-validator';

export class AddCartItemDto {
  @IsInt()
  @Min(1)
  sneakerId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;
}



