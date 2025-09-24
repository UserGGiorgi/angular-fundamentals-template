import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
    registrationForm: FormGroup;
    isLoading = false;
    errorMessage = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.registrationForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(2) // Changed from 6 to 2 for testing
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(4) // Added minimum length
            ])
        });
    }

    onSubmit() {
        if (this.registrationForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';

            const userData = {
                name: this.registrationForm.value.name,
                email: this.registrationForm.value.email,
                password: this.registrationForm.value.password
            };

            console.log('Attempting registration with:', userData);

            this.authService.register(userData).subscribe({
                next: (response) => {
                    this.isLoading = false;
                    console.log('Registration successful:', response);
                    this.router.navigate(['/courses']);
                },
                error: (error) => {
                    this.isLoading = false;
                    this.errorMessage = error.message || 'Registration failed. Please try again.';
                    console.error('Registration failed:', error);
                }
            });
        } else {
            this.registrationForm.markAllAsTouched();
        }
    }
}