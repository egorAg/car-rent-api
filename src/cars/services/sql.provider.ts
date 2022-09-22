import { NestPgPool, PgConnection } from "nest-pg";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ICar } from "../models/cars/interfaces/car.interface";
import { CarCreateRentDto } from "../models/cars/dto/car.create.rent.dto";
import { IReport } from "../models/reports/interfaces/report.interface";
import { CarCreateDto } from "../models/cars/dto/car.create.dto";
import { ILoad } from "../models/load/interfaces/load.interface";
import { LoadUpdateDto } from "../models/load/dto/load.update.dto";
import { GetReportDto } from "../models/reports/dto/get.report.dto";

@Injectable()
export class SqlProvider {
  constructor(@PgConnection() private readonly db: NestPgPool) {}

  public async getAll(): Promise<ICar[]> {
    return await this.db.rows("SELECT * FROM cars");
  }

  public async getCarWithLoad(id): Promise<ICar> {
    const res: ICar[] = await this.db.rows(`
        SELECT * FROM cars
        LEFT JOIN load
        ON load.id=cars.loadId 
        WHERE cars.id IN (${id})
    `);

    console.log(res);

    if (res.length === 0)
      throw new HttpException(
        `Car with id: ${id} not found`,
        HttpStatus.NOT_FOUND
      );

    return {
      id: res[0]["id"],
      mark: res[0]["mark"],
      model: res[0]["model"],
      gov_number: res[0]["gov_number"],
      vin: res[0]["vin"],
      is_available: res[0]["is_available"],
      taken_from: res[0]["taken_from"],
      taken_for: res[0]["taken_for"],
      load: {
        id: res[0]["loadid"],
        total_days: res[0]["total_days"],
        last_rent_total: res[0]["last_rent_total"],
        total_km: res[0]["total_total_km"],
        last_km: res[0]["last_km"],
      },
    };
  }

  public async createReport(data: CarCreateRentDto): Promise<IReport> {
    const today = new Date();
    const dateFrom: Date = new Date(data.taken_from);
    const dateFor: Date = new Date(data.taken_for);
    const daysInMouth = this.daysInMouth(today.getFullYear(), today.getMonth());
    const inRentDays = Math.round((+dateFor - +dateFrom) / 86400000);

    const report = await this.db.rows(`
        INSERT INTO "report_entity" ("inrentdays", "mouth", "daysinmouth", "year", "car", "currentpercent") 
        VALUES (${inRentDays}, ${today.getMonth()}, ${daysInMouth}, ${today.getFullYear()}, ${
      data.id
    }, ${(inRentDays * 100) / daysInMouth}) 
        RETURNING * 
    `);

    return report[0];
  }

  public async createCar(dto: CarCreateDto): Promise<ICar> {
    const res: ICar[] = await this.db.rows(`
        INSERT INTO cars (mark, model, gov_number, vin, loadId)
        VALUES ('${dto.mark}', '${dto.model}', '${dto.gov_number}', '${dto.vin}', '${dto.load_id}')
        RETURNING *
    `);

    return {
      id: res[0]["id"],
      mark: res[0]["mark"],
      model: res[0]["model"],
      gov_number: res[0]["gov_number"],
      vin: res[0]["vin"],
      is_available: res[0].is_available,
      taken_for: res[0].taken_for,
      taken_from: res[0].taken_from,
    };
  }

  public async createLoad(): Promise<ILoad> {
    const res = await this.db.rows(`
        INSERT INTO load (total_days, last_rent_total, total_km, last_km)
        VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT)
        RETURNING *
    `);

    return {
      id: res[0]["id"],
      total_days: res[0]["total_days"],
      last_rent_total: res[0]["last_rent_total"],
      total_km: res[0]["total_km"],
      last_km: res[0]["last_km"],
    };
  }

  public async getLoadByCarId(id: number): Promise<ILoad> {
    const res = await this.db.rows(`
      SELECT * FROM load
      WHERE id = ${id}
      LIMIT 1
    `);

    return {
      id: res[0]["id"],
      total_days: res[0]["total_days"],
      last_rent_total: res[0]["last_rent_total"],
      total_km: res[0]["total_km"],
      last_km: res[0]["last_km"],
    };
  }

  public async updateCar(data: CarCreateRentDto): Promise<ICar> {
    await this.db.rows(`
        UPDATE "cars" 
        SET "taken_for" = ${+new Date(data.taken_for)}, 
        "taken_from" = ${+new Date(data.taken_from)}, 
        "is_available" = false
         WHERE "id" IN (${data.id})
    `);

    return this.getCarWithLoad(data.id);
  }

  public async updateLoad(data: LoadUpdateDto): Promise<ILoad> {
    const load = await this.getLoadByCarId(data.carId);

    const days = Math.round(data.days / 86400000);

    await this.db.rows(`
        UPDATE "load" SET
        "total_days" = ${load.total_days + days},
        "last_rent_total" = ${days},
        "total_km" = ${load.total_km + data.km},
        "last_km" = ${data.km}
        WHERE "id" IN (${load.id})
    `);

    return this.getLoadByCarId(data.carId);
  }

  public async getReportsToCar(data: GetReportDto): Promise<IReport[]> {
    return await this.db.rows(`
            SELECT * FROM report_entity
            WHERE report_entity.car IN (${data.id}) AND report_entity.year IN (${data.year}) AND report_entity.mouth IN (${data.mouth})
        `);
  }

  public daysInMouth(year, month): number {
    return new Date(year, month, 0).getDate();
  }
}
