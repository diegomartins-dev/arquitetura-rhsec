import { Component } from '@angular/core';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { TagModule } from 'primeng/tag';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardComponent } from '../../../../../shared/components/card/card.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	standalone: true,
	imports: [TableComponent, TagModule, DatePipe, TableModule, CardComponent]
})
export class HomeComponent {
	data: any[] = [
		{
			codigo: '1000',
			situacao: 'completa',
			escola: 'Colégio Militar',
			data: new Date(),
			cidade: 'Salvador',
			bairro: 'Centro',
			estado: 'Bahia',
			pais: 'Brasil'
		},
		{
			codigo: '1000',
			situacao: 'em progresso',
			escola: 'Colégio Estadual',
			data: new Date(),
			cidade: 'Salvador',
			bairro: 'Centro',
			estado: 'Bahia',
			pais: 'Brasil'
		},
		{
			codigo: '1000',
			situacao: 'desativada',
			escola: 'Colégio Estadual',
			data: new Date(),
			cidade: 'Salvador',
			bairro: 'Centro',
			estado: 'Bahia',
			pais: 'Brasil'
		}
	];
	columns: any[] = [
		{ field: 'codigo', header: 'Código' },
		{ field: 'escola', header: 'Escola' },
		{ field: 'cidade', header: 'Cidade' },
		{ field: 'data', header: 'Data' },
		{ field: 'situacao', header: 'Situação', class: 'text-center' },
		{ field: 'cidade', header: 'Bairro' },
		{ field: 'cidade', header: 'Estado' },
		{ field: 'cidade', header: 'País' }
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
