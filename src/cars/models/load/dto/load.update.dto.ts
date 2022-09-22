import { IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoadUpdateDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  km: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  days: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  carId: number;
}
