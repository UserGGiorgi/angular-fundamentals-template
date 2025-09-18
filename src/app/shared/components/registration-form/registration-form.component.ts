import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailValidatorDirective } from '@shared/directives/email.directive';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
    registrationForm: FormGroup;

    constructor() {
        this.registrationForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ]),
            email: new FormControl('', [
                Validators.required,
                EmailValidatorDirective.emailValidator
            ]),
            password: new FormControl('', [
                Validators.required
            ])
        });
    }

    onSubmit() {
        if (this.registrationForm.valid) {
            // Handle form submission
            console.log('Form submitted with values:', this.registrationForm.value);
            // You would typically call a registration service here
        }
    }
}