import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { AnimatedFabDirective } from './animated-fab.directive';

@NgModule({
  declarations: [
    HideHeaderDirective,
    AnimatedFabDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [HideHeaderDirective, AnimatedFabDirective]
})
export class SharedDirectivesModule { }
