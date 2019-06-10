import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  passedId = null;

  constructor(private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.passedId = this.activatedRoute.snapshot.paramMap.get('myid');
  }

}
