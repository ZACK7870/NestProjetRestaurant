import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../interfaces/user.interface'; // Utilise l'interface User
import { ROLES_KEY } from '../../auth/roles.decorator'; // Chemin ajusté selon l'arborescence
import { Role } from '../../auth/role.enum'; // Chemin ajusté selon l'arborescence

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true; // Aucun rôle n'est requis
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user; 
    return user && requiredRoles.some(role => user.roles?.includes(role));
  }
}