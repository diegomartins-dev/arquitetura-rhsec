import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
	selector: 'app-tag',
	templateUrl: './tag.component.html',
	standalone: true,
	styleUrl: './tag.component.scss',
	imports: [TagModule]
})
export class TagComponent {
	@Input() value?: string;

	getSeverity(status?: string) {
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
