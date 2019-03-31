import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService } from './services';
import { Principal } from './models';

@Component({ selector: 'body', template: '<router-outlet></router-outlet>' })
export class AppComponent implements OnInit {
    currentUser: Principal;

    constructor(private router: Router, private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
