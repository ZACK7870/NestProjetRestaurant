import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from '../common/dto/create-reservation.dto';
import { UpdateReservationDto } from '../common/dto/update-reservation.dto';
import { Reservation } from '../common/interfaces/reservation.interface';

@Injectable()
export class ReservationsService {
  private reservations: Reservation[] = [];

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const reservation: Reservation = {
      id: this.reservations.length + 1,
      ...createReservationDto,
      createdAt: new Date(),
    };
    this.reservations.push(reservation);
    return reservation;
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservations;
  }

  async findOne(id: string | number): Promise<Reservation | undefined> {
    const reservationId = typeof id === 'string' ? parseInt(id) : id;
    return this.reservations.find(
      (reservation) => reservation.id === reservationId,
    );
  }

  async update(
    id: string | number,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation | null> {
    const reservationId = typeof id === 'string' ? parseInt(id) : id;
    const index = this.reservations.findIndex(
      (reservation) => reservation.id === reservationId,
    );
    if (index > -1) {
      this.reservations[index] = {
        ...this.reservations[index],
        ...updateReservationDto,
      };
      return this.reservations[index];
    }
    return null;
  }

  async remove(id: string | number): Promise<Reservation | null> {
    const reservationId = typeof id === 'string' ? parseInt(id) : id;
    const index = this.reservations.findIndex(
      (reservation) => reservation.id === reservationId,
    );
    if (index > -1) {
      const removed = this.reservations.splice(index, 1);
      return removed[0];
    }
    return null;
  }
}
