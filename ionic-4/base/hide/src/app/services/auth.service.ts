import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface User {
  name: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser = new BehaviorSubject<User>(null);

  login(name: string) {
    if (name === 'user') {
      this.currentUser.next({
        name: 'Dummy User',
        roles: ['read-content', 'purchase-items', 'user']
      });
    } else if (name === 'admin') {
      this.currentUser.next({
        name: 'The Admin',
        roles: ['read-content', 'write-content', 'admin']
      });
    }
  }

  getUser$() {
    return this.currentUser.asObservable();
  }

  logout() {
    this.currentUser.next(null);
  }

  hasRoles(roles: string[]): boolean {
    for (const role of roles) {
      if (!this.currentUser.getValue() || !this.currentUser.getValue().roles.includes(role)) {
        return false;
      }
    }
    return true;
  }

}
