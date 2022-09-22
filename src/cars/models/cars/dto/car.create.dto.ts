import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CarCreateDto {
  @ApiProperty({
    type: String,
    example: "Some string",
  })
  @IsNotEmpty()
  @IsString()
  mark: string;

  @ApiProperty({
    type: String,
    example: "Some string",
  })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({
    type: String,
    example: "Some string",
  })
  @IsNotEmpty()
  @IsString()
  gov_number: string;

  @ApiProperty({
    type: String,
    example: "Some string",
  })
  @IsNotEmpty()
  @IsString()
  vin: string;

  @IsOptional()
  @IsNumber()
  load_id: number;
}
