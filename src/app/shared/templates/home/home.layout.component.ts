import { Component } from '@angular/core';
import { MenuDefinitivoComponent } from '../../components/menu-definitivo/menu-definitivo.component';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-home-layout',
	templateUrl: './home.layout.component.html',
	standalone: true,
	imports: [MenuDefinitivoComponent, RouterOutlet]
})
export class HomeLayoutComponent {}
