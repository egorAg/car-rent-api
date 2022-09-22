import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CarCreateDto } from "./models/cars/dto/car.create.dto";
import { CarCreateRentDto } from "./models/cars/dto/car.create.rent.dto";
import { GetReportDto } from "./models/reports/dto/get.report.dto";
import { GetReportsDto } from "./models/reports/dto/get.reports.dto";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { Cars } from "./models/cars/cars.entity";
import { ReportEntity } from "./models/reports/report.entity";
import { SwaggerTakeRentResponse } from "./swagger/responsees/swagger.take.rent.response";
import { CarsService } from "./services/cars.service";

@ApiTags("all")
@Controller("cars")
export class CarsController {
  constructor(private serv: CarsService) {}

  @ApiOperation({
    description: "Get all cars",
  })
  @ApiOkResponse({
    type: [Cars],
  })
  @Get()
  public async getAll() {
    return await this.serv.getAllCars();
  }

  @ApiOperation({
    description: "add car",
  })
  @ApiOkResponse({
    type: Cars,
  })
  @ApiBody({
    type: CarCreateDto,
  })
  @Post()
  public async setItem(@Body() dto: CarCreateDto) {
    return await this.serv.addCar(dto);
  }

  @ApiOperation({
    description: "take rent",
  })
  @ApiOkResponse({
    type: SwaggerTakeRentResponse,
  })
  @ApiBody({
    type: CarCreateRentDto,
  })
  @Post("/take")
  public async takeForRent(@Body() dto: CarCreateRentDto) {
    return await this.serv.rent(dto);
  }

  @ApiOperation({
    description: "Get load by car id",
  })
  @ApiParam({
    name: "id",
    required: true,
    example: 1,
  })
  @Get("/get-overview-by-car/:id")
  public async getOverviewByCar(@Param("id") id: number) {
    return await this.serv.getOverviewByCar(id);
  }

  @ApiOperation({
    description: "Get all reports by mouth",
  })
  @ApiOkResponse({ type: [ReportEntity] })
  @Get("/get-all-reports")
  public async getAlReportMouth(@Body() dto: GetReportsDto) {
    return this.serv.getAllReportsByMouthYear(dto);
  }

  @ApiOperation({
    description: "Get report to current car by mouth",
  })
  @ApiOkResponse({
    type: ReportEntity,
  })
  @Get("get-report-mouth-by-car")
  public async getReportMouth(@Body() dto: GetReportDto) {
    return this.serv.getReportToCarByMouthYear(dto);
  }
}
