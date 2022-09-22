import { IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetReportDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  year: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  mouth: number;
}
