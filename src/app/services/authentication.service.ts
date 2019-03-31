import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Principal } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Principal>;
    public currentUser: Observable<Principal>;
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private API_URL= environment.apiUrl;

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<Principal>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Principal {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.API_URL + '/users/authenticate', { username, password })
            .pipe(map(user => {
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    this.loggedIn.next(true);
                    this.router.navigate(['/']);
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }
}