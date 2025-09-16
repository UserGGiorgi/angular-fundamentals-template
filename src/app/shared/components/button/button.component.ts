import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() buttonText: string = 'Button';
    @Input() iconName: string = '';

    @Output() buttonClick = new EventEmitter<void>();

    onClick(): void {
        this.buttonClick.emit();
    }

    // Use the names for the inputs `buttonText` and `iconName`.
}
