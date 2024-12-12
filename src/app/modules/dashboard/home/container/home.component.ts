import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	standalone: true,
	imports: [TableComponent]
})
export class HomeComponent {}
