import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from '../common/dto/create-reservation.dto';
import { Reservation } from '../common/interfaces/reservation.interface';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    return this.reservationsService.create(createReservationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reservation | undefined> {
    return this.reservationsService.findOne(id);
  }

  @Get()
  findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }
}