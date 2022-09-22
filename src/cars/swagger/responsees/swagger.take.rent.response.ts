import { Cars } from "../../models/cars/cars.entity";
import { ApiProperty } from "@nestjs/swagger";
import { PriceType } from "../price.type";

export class SwaggerTakeRentResponse {
  @ApiProperty({
    type: Cars,
  })
  car: Cars;

  @ApiProperty({
    type: PriceType,
  })
  price: PriceType;
}
