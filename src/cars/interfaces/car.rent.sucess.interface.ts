import { ICar } from "../models/cars/interfaces/car.interface";
import { IPrice } from "./price.interface";

export interface ICarRentSuccess {
  car: ICar;
  price: IPrice;
}
