import { BrokerService } from './../../providers/broker-service';
import { PropertyService } from './../../providers/property-service';
import { Component } from '@angular/core';
import { ActionSheetController, ActionSheet, NavController, NavParams, ToastController } from 'ionic-angular';
import { BrokerDetailPage } from '../broker-detail/broker-detail';

@Component({
    selector: 'page-property-detail',
    templateUrl: 'property-detail.html'
})
export class PropertyDetailPage {

    property: any;
    broker = {};

    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController,
        public navParams: NavParams,
        public propertyService: PropertyService, public toastCtrl: ToastController, private brokerService: BrokerService) {
        this.property = this.navParams.data;
        brokerService.findById(this.property.broker).subscribe(b => this.broker = b);
    }

    like(property) {
        this.propertyService.like(property).subscribe(
            likes => {
                property.likes = likes;
            }
        );
    }

    openBrokerDetail() {
        this.navCtrl.push(BrokerDetailPage, this.broker);
    }

    favorite(property) {
        this.propertyService.favorite(property)
            .subscribe(property => {
                let toast = this.toastCtrl.create({
                    message: 'Property added to your favorites',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }

    share(property) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('share via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('share via twitter')
                },
                {
                    text: 'Email',
                    handler: () => console.log('share via email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('cancel share')
                }
            ]
        });

        actionSheet.present();
    }

}
