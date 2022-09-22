import { Module } from "@nestjs/common";
import { CarsModule } from "./cars/cars.module";
import { ConfigModule } from "@nestjs/config";
import { NestPgModule, NestPgOptions } from "nest-pg";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    NestPgModule.register({
      user: process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASSWORD || "admin",
      host: process.env.DATABASE_HOST || "localhost",
      database: process.env.DATABASE_NAME || "car-rent-database",
      port: 5432,
    } as NestPgOptions),
    CarsModule,
  ],
})
export class AppModule {}
