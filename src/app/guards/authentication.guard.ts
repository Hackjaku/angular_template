import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanLoad {

  constructor(
    private storageService: StorageService,
    private router: Router,
    private httpClient: HttpClient
  ) {

  }

  get isAuthenticated(): boolean {
    return (this.storageService.getLoggedUser?.token) ? true : false;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isAuthenticated) {
      return this.router.parseUrl('public');
    }    else {
      return true;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + this.storageService.getLoggedUser?.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    return this.httpClient.get(`${environment.url}user/checkauth`, options).pipe(
      map(() => {
        return true;
      }),
      catchError(() => of(this.router.parseUrl('public')))
    )
  }

}
