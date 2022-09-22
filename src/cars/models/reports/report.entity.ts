import { ApiProperty } from "@nestjs/swagger";

export class ReportEntity {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  inRentDays: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  mouth: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  daysInMouth: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  year: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  car: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  currentPercent: number;
}
