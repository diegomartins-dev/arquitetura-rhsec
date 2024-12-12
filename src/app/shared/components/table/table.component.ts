import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
	selector: 'app-table',
	templateUrl: 'table.component.html',
	standalone: true,
	styleUrl: './table.component.scss',
	imports: [TableModule]
})
export class TableComponent {
	@Input() data: any[] = [];
}
