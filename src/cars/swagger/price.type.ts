import { ApiProperty } from "@nestjs/swagger";

export class PriceType {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  price: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  discount: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  totalDays: number;
}
