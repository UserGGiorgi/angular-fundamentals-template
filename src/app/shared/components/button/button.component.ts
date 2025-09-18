import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() buttonText: string = 'Button';
    @Input() iconName: string = '';
    @Input() disabled: boolean = false;
    @Input() primary: boolean = false;

    @Output() buttonClick = new EventEmitter<void>();

    onClick(): void {
        this.buttonClick.emit();
    }
}
