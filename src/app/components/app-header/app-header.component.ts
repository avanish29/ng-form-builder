import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Principal } from '@/models';
import { AuthenticationService } from '@/services';

@Component({selector: 'app-header', templateUrl: './app-header.component.html', styleUrls: ['./app-header.component.css']})
export class AppHeaderComponent implements OnInit, OnDestroy {
    isLoggedIn$: Observable<boolean>;
    
    constructor(private authenticationService: AuthenticationService) {        
    }

    ngOnInit() {
        this.isLoggedIn$ = this.authenticationService.isLoggedIn;
    }

    ngOnDestroy() {
        this.authenticationService.logout();
    }
    
    onLogout() {
        this.authenticationService.logout();
    }
}