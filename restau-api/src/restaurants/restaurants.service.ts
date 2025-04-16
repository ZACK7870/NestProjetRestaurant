import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from '../common/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from '../common/dto/update-restaurant.dto';
import { Restaurant } from '../common/interfaces/restaurant.interface';

@Injectable()
export class RestaurantsService {
  private restaurants: Restaurant[] = [];

  create(createRestaurantDto: CreateRestaurantDto): Restaurant {
    const newRestaurant: Restaurant = { id: Date.now(), ...createRestaurantDto };
    this.restaurants.push(newRestaurant);
    return newRestaurant;
  }

  findAll(): Restaurant[] {
    return this.restaurants;
  }

  findOne(id: number): Restaurant | undefined {
    return this.restaurants.find((restaurant) => restaurant.id === id);
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto): Restaurant | null {
    const restaurantIndex = this.restaurants.findIndex(
      (restaurant) => restaurant.id === id,
    );
    if (restaurantIndex > -1) {
      this.restaurants[restaurantIndex] = {
        ...this.restaurants[restaurantIndex],
        ...updateRestaurantDto,
      };
      return this.restaurants[restaurantIndex];
    }
    return null;
  }

  remove(id: number): Restaurant | null {
    const restaurantIndex = this.restaurants.findIndex(
      (restaurant) => restaurant.id === id,
    );
    if (restaurantIndex > -1) {
      const removedRestaurants = this.restaurants.splice(restaurantIndex, 1);
      return removedRestaurants[0];
    }
    return null;
  }
}