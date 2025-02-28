import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
  OnInit,
  DestroyRef,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appIfViewport]',
})
export class ResponsiveDirective implements OnInit {
  @Input() appIfViewport!: 'mobile' | 'desktop';

  private breakpointObserver = inject(BreakpointObserver);
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 767px)', '(min-width: 768px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (
          this.appIfViewport === 'mobile' &&
          result.breakpoints['(max-width: 767px)']
        ) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else if (
          this.appIfViewport === 'desktop' &&
          result.breakpoints['(min-width: 768px)']
        ) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }
}
