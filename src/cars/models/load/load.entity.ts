import { Cars } from "../cars/cars.entity";
import { ApiProperty } from "@nestjs/swagger";

export class Load {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  total_days: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  last_rent_total: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  total_km: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  last_km: number;

  car: Cars;
}
