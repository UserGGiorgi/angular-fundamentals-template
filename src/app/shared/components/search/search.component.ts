import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    @Input() placeholder = '';
    @Output() search = new EventEmitter<string>();
    searchTerm = '';

    onSearch() {
        this.search.emit(this.searchTerm);
    }
}