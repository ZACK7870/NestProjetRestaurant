import { Injectable } from '@nestjs/common';
import { Reservation } from '../common/interfaces/reservation.interface';
import { CreateReservationDto } from '../common/dto/create-reservation.dto';
import { UpdateReservationDto } from '../common/dto/update-reservation.dto';

@Injectable()
export class AdminService {
  private reservations: Reservation[] = [];

  async createReservation(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const reservation: Reservation = {
      id: this.reservations.length + 1,
      name: createReservationDto.name,
      phoneNumber: createReservationDto.phoneNumber,
      createdAt: new Date(),
    };
    this.reservations.push(reservation);
    return reservation;
  }

  async getAllReservations(): Promise<Reservation[]> {
    return this.reservations;
  }

  async getReservation(id: number): Promise<Reservation | undefined> {
    return this.reservations.find(res => res.id === id);
  }

  async updateReservation(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation | null> {
    const index = this.reservations.findIndex(res => res.id === id);
    if (index !== -1) {
      this.reservations[index] = {
        ...this.reservations[index],
        ...updateReservationDto,
      };
      return this.reservations[index];
    }
    return null;
  }

  async deleteReservation(id: number): Promise<Reservation | null> {
    const index = this.reservations.findIndex(res => res.id === id);
    if (index !== -1) {
      const removed = this.reservations.splice(index, 1);
      return removed[0];
    }
    return null;
  }
}