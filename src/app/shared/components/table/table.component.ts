import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

export interface Column {
	field: string;
	header: string;
}

@Component({
	selector: 'app-table',
	templateUrl: 'table.component.html',
	standalone: true,
	styleUrl: './table.component.scss',
	imports: [TableModule, TagModule, CurrencyPipe, DatePipe]
})
export class TableComponent {
	products: any[] = [];

	cols: Column[] = [
		{ field: 'code', header: 'Code' },
		{ field: 'name', header: 'Name' },
		{ field: 'category', header: 'Category' },
		{ field: 'quantity', header: 'Quantity' },
		{ field: 'inventoryStatus', header: 'Status' },
		{ field: 'rating', header: 'Rating' }
	];

	getSeverity(status: string) {
		switch (status) {
			case 'INSTOCK':
				return 'success';
			case 'LOWSTOCK':
				return 'warning';
			case 'OUTOFSTOCK':
				return 'danger';
			default:
				return 'secondary';
		}
	}
}
