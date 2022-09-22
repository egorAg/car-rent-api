import { Injectable, OnModuleInit } from "@nestjs/common";
import { NestPgPool, PgConnection } from "nest-pg";

@Injectable()
export class DatabaseLoadProvider implements OnModuleInit {
  constructor(@PgConnection() private readonly db: NestPgPool) {}

  async onModuleInit(): Promise<void> {
    //create table load on start
    await this.db.rows(`
    CREATE TABLE IF NOT EXISTS load (
                id SERIAL PRIMARY KEY,
                total_days INTEGER NOT NULL DEFAULT 0,
                last_rent_total INTEGER NOT NULL DEFAULT 0,
                total_km INTEGER NOT NULL DEFAULT 0,
                last_km INTEGER NOT NULL DEFAULT 0
            )
        `);

    //create table cars on start
    await this.db.rows(`
            CREATE TABLE IF NOT EXISTS cars (
                id SERIAL PRIMARY KEY,
                mark VARCHAR (50) NOT NULL,
                model VARCHAR (50) NOT NULL,
                gov_number VARCHAR (50) NOT NULL,
                vin VARCHAR (50) NOT NULL,
                is_available BOOLEAN NOT NULL DEFAULT true,
                taken_from BIGINT NOT NULL DEFAULT 0,
                taken_for BIGINT NOT NULL DEFAULT 0,
                loadId INTEGER NOT NULL,
                FOREIGN KEY (loadId) REFERENCES load (id)
            )
        `);

    //create table reports on start
    await this.db.rows(`
    CREATE TABLE IF NOT EXISTS report_entity (
                id SERIAL PRIMARY KEY,
                inRentDays INTEGER NOT NULL DEFAULT 0,
                mouth INTEGER NOT NULL DEFAULT 0,
                daysInMouth INTEGER NOT NULL DEFAULT 0,
                year INTEGER NOT NULL DEFAULT 0,
                car INTEGER NOT NULL DEFAULT 0,
                currentPercent INTEGER NOT NULL DEFAULT 0
            )
        `);
  }
}
