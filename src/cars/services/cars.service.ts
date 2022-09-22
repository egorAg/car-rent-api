import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SqlProvider } from "./sql.provider";
import { ICar } from "../models/cars/interfaces/car.interface";
import { CarCreateDto } from "../models/cars/dto/car.create.dto";
import { ILoad } from "../models/load/interfaces/load.interface";
import { CarCreateRentDto } from "../models/cars/dto/car.create.rent.dto";
import { ICarRentSuccess } from "../interfaces/car.rent.sucess.interface";
import { GetReportDto } from "../models/reports/dto/get.report.dto";
import { IReportMouth } from "../models/reports/interfaces/report.mouthly.interface";
import { IReport } from "../models/reports/interfaces/report.interface";
import { GetReportsDto } from "../models/reports/dto/get.reports.dto";
import { IPrice } from "../interfaces/price.interface";

@Injectable()
export class CarsService {
  constructor(private readonly sqlProvider: SqlProvider) {}

  public async getAllCars(): Promise<ICar[]> {
    return this.sqlProvider.getAll();
  }

  public async addCar(input: CarCreateDto): Promise<ICar> {
    const load: ILoad = await this.sqlProvider.createLoad();
    console.log(load);

    const car: ICar = await this.sqlProvider.createCar({
      ...input,
      load_id: load.id,
    });
    console.log(car);

    return this.sqlProvider.getCarWithLoad(car.id);
  }

  public async rent(data: CarCreateRentDto): Promise<ICarRentSuccess> {
    const car = await this.sqlProvider.getCarWithLoad(data.id);
    if (!car.is_available)
      throw new HttpException(
        "Car already taken by other user",
        HttpStatus.I_AM_A_TEAPOT
      );

    const endOfService = new Date(+new Date(car.taken_for) + 259200000);

    if (!(+endOfService < +new Date()))
      throw new HttpException(
        `It's been less than 3 days since the last rental. Car will be available at ${new Date(
          +new Date(car.taken_for) + 259200000
        )}`,
        HttpStatus.CONFLICT
      );

    return await this.rent_success(data);
  }

  public async getReportToCarByMouthYear(
    dto: GetReportDto
  ): Promise<IReportMouth> {
    const reports: IReport[] = await this.sqlProvider.getReportsToCar(dto);
    const days = this.sqlProvider.daysInMouth(dto.year, dto.mouth);

    const final: IReportMouth = {
      carId: dto.id,
      percent: null,
      days,
    };

    for (const report of reports) {
      final.percent += report.currentpercent;
    }

    final.percent = final.percent / reports.length;

    final.percent = final.percent ? final.percent : 0;

    return final;
  }

  public async getAllReportsByMouthYear(
    dto: GetReportsDto
  ): Promise<IReportMouth[]> {
    const cars: ICar[] = await this.sqlProvider.getAll();

    const reports: IReportMouth[] = [];
    for (const car of cars)
      reports.push(
        await this.getReportToCarByMouthYear({
          id: car.id,
          mouth: dto.mouth,
          year: dto.year,
        })
      );

    return reports;
  }

  public async getOverviewByCar(id: number): Promise<ILoad> {
    const car = await this.sqlProvider.getCarWithLoad(id);
    return car.load;
  }

  private async rent_success(data: CarCreateRentDto): Promise<ICarRentSuccess> {
    const dateFrom: Date = new Date(data.taken_from);
    const dateFor: Date = new Date(data.taken_for);
    const maxRentDuration = 2592000000;
    const rentDurationInvalid: boolean = maxRentDuration < +dateFor - +dateFrom;

    if (rentDurationInvalid)
      throw new HttpException("Max rent time: 30 days", HttpStatus.BAD_REQUEST);

    if (dateFrom.getDay() == 6 || dateFrom.getDay() == 0)
      throw new HttpException(
        "Start of rent can become only on work days",
        HttpStatus.BAD_REQUEST
      );

    if (dateFor.getDay() == 6 || dateFor.getDay() == 0)
      throw new HttpException(
        "End of rent can become only on work days",
        HttpStatus.BAD_REQUEST
      );

    const carAfterUpdate: ICar = await this.sqlProvider.updateCar(data);
    await this.sqlProvider.updateLoad({
      carId: carAfterUpdate.id,
      days: +dateFor - +dateFrom,
      km: data.km,
    });
    await this.sqlProvider.createReport(data);

    return {
      car: await this.sqlProvider.getCarWithLoad(data.id),
      price: this.calculatePrice(Math.round((+dateFor - +dateFrom) / 86400000)),
    };
  }

  private calculatePrice(days: number): IPrice {
    const tariffUnder4days = 1000;
    if (days <= 4)
      return {
        price: days * tariffUnder4days,
        discount: 0,
        totalDays: days,
      };

    if (days <= 9 && days > 4) {
      const d4 = 4 * tariffUnder4days;

      const last =
        (tariffUnder4days - (tariffUnder4days * 15) / 100) * (days - 4);

      return {
        price: d4 + last,
        discount: 5,
        totalDays: days,
      };
    }

    if (days <= 17 && days > 10) {
      const d4 = 4 * tariffUnder4days;

      const d9 = (tariffUnder4days - (tariffUnder4days * 5) / 100) * 5;

      const last =
        (tariffUnder4days - (tariffUnder4days * 15) / 100) * (days - 10);

      return {
        price: d4 + d9 + last,
        discount: 5,
        totalDays: days,
      };
    }

    if (days <= 30 && days > 18) {
      const d4 = 4 * tariffUnder4days;

      const d9 = (tariffUnder4days - (tariffUnder4days * 5) / 100) * 5;

      const d17 = (tariffUnder4days - (tariffUnder4days * 10) / 100) * 7;

      const last =
        (tariffUnder4days - (tariffUnder4days * 15) / 100) * (days - 18);

      return {
        price: d4 + d9 + d17 + last,
        discount: 15,
        totalDays: days,
      };
    }
  }
}
