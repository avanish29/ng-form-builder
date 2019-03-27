import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@/services';

@Component({ selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css'] })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private alertService: AlertService) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required])
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get input() { return this.loginForm.controls; }

    isFieldInvalid(field: string) {
        return (
            (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
            (this.loginForm.get(field).untouched && this.submitted)
        );
    }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.valid) {
            this.loading = true;
            this.authenticationService.login(this.input.username.value, this.input.password.value)
                .pipe(first())
                .subscribe(
                    data => { this.router.navigate([this.returnUrl]); },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    }
                );
        }       
    }
}