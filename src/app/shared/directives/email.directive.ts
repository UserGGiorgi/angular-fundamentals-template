import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms'

@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi :true
    }]
})
export class EmailValidatorDirective implements Validator{
    validate(control: AbstractControl): ValidationErrors | null {
        return EmailValidatorDirective.emailValidator(control);
    }
    static emailValidator(control: AbstractControl): ValidationErrors | null {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!control.value) {
            return null;
        }

        const isValid = emailPattern.test(control.value);

        return isValid ? null : { invalidEmail: true };
    }
}
