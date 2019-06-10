import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HasRoleDirective} from './has-role.directive';

@NgModule({
  declarations: [HasRoleDirective],
  exports: [HasRoleDirective],
  imports: [
    CommonModule
  ]
})
export class SharedDirectivesModule { }
