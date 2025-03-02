import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  HostListener,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText = '';
  private tooltipElement!: HTMLElement;
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('mouseenter') onMouseEnter() {
    this.createTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeTooltip();
  }

  @HostListener('focus') onFocus() {
    this.createTooltip();
  }

  @HostListener('blur') onBlur() {
    this.removeTooltip();
  }

  private createTooltip() {
    if (!this.tooltipElement) {
      this.tooltipElement = this.renderer.createElement('span');
      const text = this.renderer.createText(this.tooltipText);
      this.renderer.appendChild(this.tooltipElement, text);

      this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
      this.renderer.setStyle(
        this.tooltipElement,
        'background-color',
        'rgba(254, 114, 76, 0.5)'
      );
      this.renderer.setStyle(this.tooltipElement, 'color', 'white');
      this.renderer.setStyle(this.tooltipElement, 'padding', '2px');
      this.renderer.setStyle(this.tooltipElement, 'border-radius', '3px');
      this.renderer.setStyle(this.tooltipElement, 'font-size', '8px');

      this.renderer.appendChild(
        this.elementRef.nativeElement,
        this.tooltipElement
      );

      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      const tooltipWidth = this.tooltipElement.offsetWidth;
      const tooltipLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
      const tooltipTop = rect.top + rect.height + 5;

      this.renderer.setStyle(this.tooltipElement, 'top', `${tooltipTop}px`);
      this.renderer.setStyle(this.tooltipElement, 'left', `${tooltipLeft}px`);
    }
  }

  private removeTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(
        this.elementRef.nativeElement,
        this.tooltipElement
      );
      this.tooltipElement = null!;
    }
  }
}
