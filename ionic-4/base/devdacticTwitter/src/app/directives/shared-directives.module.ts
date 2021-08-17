import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { StickySegmentDirective } from './sticky-segment.directive';

@NgModule({
  declarations: [HideHeaderDirective, StickySegmentDirective],
  imports: [
    CommonModule
  ],
  exports: [HideHeaderDirective, StickySegmentDirective]
})
export class SharedDirectivesModule { }
