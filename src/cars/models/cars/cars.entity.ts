import { Load } from "../load/load.entity";
import { ApiProperty } from "@nestjs/swagger";

export class Cars {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: String,
    example: "Some string",
  })
  mark: string;

  @ApiProperty({
    type: String,
    example: "Some string",
  })
  model: string;

  @ApiProperty({
    type: String,
    example: "Some string",
  })
  gov_number: string;

  @ApiProperty({
    type: String,
    example: "Some string",
  })
  vin: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  is_available: boolean;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  taken_from: number;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  taken_for: number;

  load_total: Load;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  created_at: Date;
}
