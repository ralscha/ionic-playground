import { HttpClient } from '@angular/common/http';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {PopoverController, RefresherCustomEvent} from '@ionic/angular';
import { AccountPage } from '../account/account.page';

type emails = {
  from: string
  read: boolean
  content: string
  date: string
  star: boolean
  id: string
  color?: string
}

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {
  emails: emails[] = [];

  constructor(private http: HttpClient, private router: Router,
    private popoverCtrl: PopoverController,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.http.get<emails[]>('./assets/data.json').subscribe(res => {
      this.emails = res.map(email => {
        email.color = this.intToRGB(this.hashCode(email.from));
        return email;
      });
      console.log(this.emails);
    });
  }

  private hashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  private intToRGB(i: number) {
    const c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    return '#' + '00000'.substring(0, 6 - c.length) + c;
  }

  openDetails(id: string) {
    this.router.navigate(['tabs', 'mail', id]);
  }

  async openAccount(ev: Event) {
    const popover = await this.popoverCtrl.create({
      component: AccountPage,
      event: ev,
      cssClass: 'custom-popover'
    });

    await popover.present();
  }

  doRefresh(ev: RefresherCustomEvent) {
    setTimeout(() => ev.target?.complete(), 2000);
  }

  // new function
  removeMail(id: string) {
    this.emails = this.emails.filter(email => email.id != id);
    this.changeDetector.detectChanges();
  }
}
