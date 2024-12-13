import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { CardComponent } from '../../../../../shared/components/card/card.component';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { TagComponent } from '../../../../../shared/components/tag/tag.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	standalone: true,
	imports: [TableComponent, TagModule, DatePipe, TableModule, CardComponent, TagComponent]
})
export class HomeComponent {
	data: any[] = [
		{
			codigo: '00001',
			situacao: 'completa',
			escola: 'Colégio Estadual Carlos Costa',
			data: '2025-03-01',
			cidade: 'Salvador'
		},
		{
			codigo: '00002',
			situacao: 'em progresso',
			escola: 'Colégio Estadual Thales de Azevedo',
			data: '2025-01-12',
			cidade: 'Lauro de Freitas'
		},
		{
			codigo: '00003',
			situacao: 'desativada',
			escola: 'Centro Educacional do Estado',
			data: '2025-09-11',
			cidade: 'Simões Filho'
		},
		{
			codigo: '00004',
			situacao: 'completa',
			escola: 'Colégio da Polícia Militar',
			data: '2025-04-24',
			cidade: 'Valença'
		},
		{
			codigo: '00005',
			situacao: 'em progresso',
			escola: 'Centro Integrado de Educação',
			data: '2025-06-30',
			cidade: 'Feira de Santana'
		}
	];
	columns: any[] = [
		{ field: 'codigo', header: 'Código' },
		{ field: 'escola', header: 'Escola' },
		{ field: 'cidade', header: 'Cidade' },
		{ field: 'data', header: 'Data' },
		{ field: 'situacao', header: 'Situação', class: 'text-center' }
	];
}
