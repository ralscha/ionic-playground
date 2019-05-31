import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  @ViewChild('header', { static: true }) headerImage: ElementRef;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private renderer: Renderer2
  ) { }

  ngOnInit() {

    const coords = this.navParams.get('coords');

    this.renderer.setStyle(this.headerImage.nativeElement, 'transform', `translate3d(0, ${coords.y - 56}px, 0) scale3d(0.9, 0.9, 1)`);
    this.renderer.setStyle(this.headerImage.nativeElement, 'transition', '0.5s ease-in-out');

    setTimeout(() => {
      this.renderer.removeStyle(this.headerImage.nativeElement, 'transform');
    }, 50);

  }

  close(){
    this.modalCtrl.dismiss();
  }

}
