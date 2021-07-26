import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwipeItemComponent } from './swipe-item/swipe-item.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SwipeItemComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [SwipeItemComponent]
})
export class SharedComponentsModule { }
