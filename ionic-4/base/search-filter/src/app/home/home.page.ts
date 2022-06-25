import {Component, OnInit} from '@angular/core';
import {debounceTime} from 'rxjs/operators';
import {UntypedFormControl} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  searchControl: UntypedFormControl;
  items: any;
  searching: any = false;

  constructor(public navCtrl: NavController, public dataService: DataService) {
    this.searchControl = new UntypedFormControl();
  }

  ngOnInit(): void {
    this.setFilteredItems('');

    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {
        this.searching = false;
        this.setFilteredItems(search);
      });

  }

  onSearchInput(): void {
    this.searching = true;
  }

  setFilteredItems(searchTerm: string) {
    this.items = this.dataService.filterItems(searchTerm);
  }
}
