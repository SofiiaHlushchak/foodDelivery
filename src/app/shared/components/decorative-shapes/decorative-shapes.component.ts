import { Component } from '@angular/core';

@Component({
  selector: 'app-decorative-shapes',
  template: `
    <div class="absolute left-0 right-0 top-0 h-20 overflow-hidden">
      <div
        class="absolute right-0 top-0 h-44 w-48 -translate-y-2/3 translate-x-2/3 rounded-full bg-primary"></div>
      <div
        class="absolute left-0 top-0 h-24 w-24 -translate-x-2/4 -translate-y-1/4 rounded-full border-[30px] border-primary bg-white"></div>
      <div
        class="absolute left-0 top-0 h-40 w-40 -translate-y-2/4 rounded-full bg-soft-cream"></div>
    </div>
  `,
})
export class DecorativeShapesComponent {}
