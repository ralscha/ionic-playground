import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { trigger, style, animate, transition, group, query, animateChild } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [

    trigger('container', [
      transition(':enter', [
        style({opacity: '0'}),
        group([
          animate('500ms ease-out', style({opacity: '1'})),
          query('@badge, @message', [
            animateChild()
          ])
        ])

      ]),
      transition(':leave', [
        group([
          animate('500ms ease-out', style({opacity: '0'})),
          query('@badge, @message', [
            animateChild()
          ])
        ])
      ])
    ]),

    trigger('badge', [
      transition(':enter', [
        style({transform: 'translateY(400%)'}),
        animate('500ms ease-out', style({transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({transform: 'translateY(400%)'}))
      ])
    ]),

    trigger('message', [
      transition(':enter', [
        style({opacity: '0'}),
        animate('500ms 1000ms ease-out', style({opacity: '1'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({opacity: '0'}))
      ])
    ])

  ]
})
export class HomePage {

  public displayAchievement = false;

  constructor(private toastCtrl: ToastController){

  }

  test(){

    this.toastCtrl.create({
      message: 'Achievement unlocked!',
      duration: 2000
    }).then((toast) => {
      toast.present();
    });

    this.displayAchievement = true;

    setTimeout(() => {
      this.displayAchievement = false;
    }, 3000);

  }

}
