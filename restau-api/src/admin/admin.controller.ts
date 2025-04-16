import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateReservationDto } from '../common/dto/create-reservation.dto';
import { UpdateReservationDto } from '../common/dto/update-reservation.dto';
import { Reservation } from '../common/interfaces/reservation.interface';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('reservations')
  createReservation(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    return this.adminService.createReservation(createReservationDto);
  }

  @Get('reservations')
  getAllReservations() {
    return this.adminService.getAllReservations();
  }

  @Get('reservations/:id')
  getReservation(@Param('id') id: string) {
    return this.adminService.getReservation(+id);
  }

  @Put('reservations/:id')
  updateReservation(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.adminService.updateReservation(+id, updateReservationDto);
  }

  @Delete('reservations/:id')
  deleteReservation(@Param('id') id: string) {
    return this.adminService.deleteReservation(+id);
  }
}
