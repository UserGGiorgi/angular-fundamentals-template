import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(minutes: number): string {
        if (minutes == null || isNaN(minutes) || minutes < 0) {
            return '00:00 hours';
        }

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        // Format hours and minutes to 2 digits
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = mins.toString().padStart(2, '0');

        // Use "hour" for exactly 1 hour, otherwise "hours"
        const hourText = hours === 1 ? 'hour' : 'hours';

        return `${formattedHours}:${formattedMinutes} ${hourText}`;
    }
}