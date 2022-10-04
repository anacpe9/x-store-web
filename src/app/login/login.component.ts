import { AlertService } from './../common/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../common/services/authentication.service';

@Component({
  selector: 'x-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
  ) {

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // // for fast dev
    // this.f.username.setValue('admin@x-store.local');
    // this.f.password.setValue('AdminP@ssw0rd');
    this.f.username.setValue('nu@x-store.local');
    this.f.password.setValue('UserP@ssw0rd');
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        _data => {
          this.router.navigate([this.returnUrl]);
        },
        _error => {
          this.loading = false;
          this.alertService.error(_error.error?.message || _error.statusText);

          // console.log(_error);
          // alert(_error.error?.message || _error.statusText);
        });
  }

}
