import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.page.html',
  styleUrls: ['./update-modal.page.scss'],
})
export class UpdateModalPage implements OnInit {
  choice = 0;
  @Input() mySubject!: BehaviorSubject<string>;
  choices = [
    'Credit Card',
    'Paypal',
    'Bank transfer'
  ];

  constructor(private readonly modalCtrl: ModalController) { }

  // Set the initial choice based on the input
  ngOnInit() {
    const preselect = this.mySubject.value;
    this.choice = this.choices.indexOf(preselect);
  }

  // Change the choice and update the Subject
  changeChoice(num: number) {
    this.choice = num;
    this.mySubject.next(this.choices[num]);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
