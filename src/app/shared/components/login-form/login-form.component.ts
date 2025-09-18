import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
    @ViewChild('loginForm') public loginForm!: NgForm;

    get isFormInvalid(): boolean {
        return !!this.loginForm?.invalid;
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            console.log('Form submitted with values:', form.value);
        }
    }
}
