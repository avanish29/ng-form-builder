import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@/services';

@Component({selector: 'app-navbar', templateUrl: './app-leftnav.component.html', styleUrls: ['./app-leftnav.component.css']})
export class AppLeftNavComponent implements OnInit {
    isLoggedIn$: Observable<boolean>;
    
    constructor(private authenticationService: AuthenticationService) {        
    }

    ngOnInit() {
        this.isLoggedIn$ = this.authenticationService.isLoggedIn;
    }
}