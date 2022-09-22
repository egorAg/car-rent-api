import { IsISO8601, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CarCreateRentDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  @IsNotEmpty()
  @IsISO8601()
  taken_from: Date;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  @IsNotEmpty()
  @IsISO8601()
  taken_for: Date;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsNumber()
  km: number;
}
