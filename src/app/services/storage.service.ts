import { Injectable } from '@angular/core';
import { LoggedUser } from '../interfaces/LoggedUser';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get getLoggedUser(): LoggedUser | null {
    const storedData = localStorage.getItem('loggedUser');
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return null;
    }
  }
}
