import {Component, ViewChild} from '@angular/core';
import {IonicSelectableComponent} from 'ionic-selectable';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  selectedUsers = null;
  users = [
    {
      id: 0,
      name: 'Simon Grimm',
      country: 'Germany'
    },
    {
      id: 1,
      name: 'Max Lynch',
      country: 'Wisconsin'
    },
    {
      id: 2,
      name: 'Mike Hartington',
      country: 'New York'
    }
  ];

  groups = [
    {
      name: 'Angular',
      id: 0,
      type: 'Framework'
    },
    {
      name: 'React',
      id: 1,
      type: 'Framework'
    },
    {
      name: 'Javascript',
      id: 3,
      type: 'Language'
    },
    {
      name: 'Swift',
      id: 4,
      type: 'Language'
    },
  ];

  // Interesting part starts here
  @ViewChild('selectComponent') selectComponent!: IonicSelectableComponent;
  toggle = true;
  group = null;
  selected = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userChanged(event: { component: IonicSelectableComponent, value: any }): void {
    console.log('Selected: ', event);
  }

  openFromCode(): void {
    this.selectComponent.open();
  }

  clear(): void {
    this.selectComponent.clear();
    this.selectComponent.close();
  }

  toggleItems(): void {
    this.selectComponent.toggleItems(this.toggle);
    this.toggle = !this.toggle;
  }

  confirm(): void {
    this.selectComponent.confirm();
    this.selectComponent.close();
  }
}
