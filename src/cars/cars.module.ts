import { Module } from "@nestjs/common";
import { CarsController } from "./cars.controller";
import { CarsService } from "./services/cars.service";
import { SqlProvider } from "./services/sql.provider";
import { DatabaseLoadProvider } from "./services/database.load.provider";

@Module({
  controllers: [CarsController],
  providers: [CarsService, SqlProvider, DatabaseLoadProvider],
  imports: [],
})
export class CarsModule {}
