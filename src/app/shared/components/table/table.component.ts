import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
	selector: 'app-table',
	templateUrl: 'table.component.html',
	standalone: true,
	styleUrl: './table.component.scss',
	imports: [TableModule, TagModule, DatePipe]
})
export class TableComponent {
	@Input() data: any[] = [
		{
			codigo: '1000',
			situacao: 'completa',
			escola: 'Colégio Militar',
			data: new Date(),
			cidade: 'Salvador'
		},
		{
			codigo: '1000',
			situacao: 'em progresso',
			escola: 'Colégio Estadual',
			data: new Date(),
			cidade: 'Salvador'
		},
		{
			codigo: '1000',
			situacao: 'desativada',
			escola: 'Colégio Estadual',
			data: new Date(),
			cidade: 'Salvador'
		}
	];
	@Input() columns: any[] = [
		{ field: 'codigo', header: 'Código' },
		{ field: 'escola', header: 'Escola' },
		{ field: 'cidade', header: 'Cidade' },
		{ field: 'data', header: 'Data' },
		{ field: 'situacao', header: 'Situação' }
	];

	getSeverity(status: string) {
		switch (status) {
			case 'completa':
				return 'success';
			case 'em progresso':
				return 'warning';
			case 'desativada':
				return 'danger';
			default:
				return 'secondary';
		}
	}
}
