import { IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoadCreateDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  total_days?: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  last_rent_total?: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  total_km?: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  last_km?: number;
}
