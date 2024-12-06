import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
	selectedTheme: string = 'lara-light-indigo';
	themes: any[] = [
		{
			themeName: 'lara-light-indigo',
			src: 'assets/themes/lara/lara-indigo-light.css',
			colorSchema: 'light-theme',
			schema: 'Claro'
		},
		{
			themeName: 'lara-dark-indigo',
			src: 'assets/themes/lara/lara-indigo-dark.css',
			colorSchema: 'dark-theme',
			schema: 'Escuro'
		}
	];

	themeItems: any[] = [
		{
			label: 'Claro',
			command: () => {
				this.changeTheme('lara-light-indigo');
			}
		},
		{
			label: 'Escuro',
			command: () => {
				this.changeTheme('lara-dark-indigo');
			}
		}
	];

	selectedFont = 'font-arial';

	fonts: any[] = [
		{ label: 'Arial', value: 'font-arial' },
		{ label: 'Sans Serif', value: 'font-sans-serif' },
		{ label: 'Roboto', value: 'font-roboto' },
		{ label: 'Inter', value: 'font-inter' }
	];

	fontItems: any[] = [
		{
			label: 'Arial',
			command: () => {
				this.changeFont('font-arial');
			}
		},
		{
			label: 'Sans Serif',
			command: () => {
				this.changeFont('font-sans-serif');
			}
		},
		{
			label: 'Roboto',
			command: () => {
				this.changeFont('font-roboto');
			}
		},
		{
			label: 'Inter',
			command: () => {
				this.changeFont('font-inter');
			}
		}
	];

	initialize() {
		this.selectedTheme = localStorage.getItem('theme') || this.selectedTheme;
		this.selectedFont = localStorage.getItem('font') || this.selectedFont;
		this.changeTheme(this.selectedTheme);
		this.getThemeName(this.selectedTheme);
		this.changeFont(this.selectedFont);
		this.getFont(this.selectedFont);
	}

	changeTheme(theme: string) {
		const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
		themeLink.setAttribute('href', this.themes.find((t) => t.themeName == theme)!.src);
		localStorage.setItem('theme', theme);
		this.selectedTheme = theme;

		const body = document.body;
		body.classList.remove('light-theme', 'dark-theme');
		body.classList.add(this.themes.find((t) => t.themeName == theme)!.colorSchema);
	}

	changeFont(font: string) {
		const body = document.body;
		body.classList.remove('font-arial', 'font-sans-serif', 'font-roboto', 'font-inter');
		body.classList.add(font);
		localStorage.setItem('font', font);
		this.selectedFont = font;
	}

	getFont(font: string) {
		return this.fonts.find((t) => t.value == font)?.label;
	}

	getThemeName(theme: string): string {
		return this.themes.find((t) => t.themeName == theme)!.schema;
	}
}
