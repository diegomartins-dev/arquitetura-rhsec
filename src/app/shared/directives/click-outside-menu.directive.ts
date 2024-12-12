import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
	selector: '[appClickOutside]',
	standalone: true
})
export class ClickOutsideMenuDirective {
	@Output() closeMenu = new EventEmitter<boolean>();

	@HostListener('document:click', ['$event.target'])
	onClick(target: HTMLElement): void {
		const clickedInside =
			target.classList.contains('category') ||
			target.parentElement?.classList.contains('category') ||
			this.isContainsClassName(target, 'submenu');

		if (!clickedInside) {
			this.closeMenu.emit(true);
		} else {
			this.closeMenu.emit(false);
		}
	}

	isContainsClassName(target: HTMLElement, className: string): boolean {
		if (target.parentElement && !target.classList.contains(className)) {
			return this.isContainsClassName(target.parentElement, className);
		} else {
			return target.classList.contains(className);
		}
	}
}
