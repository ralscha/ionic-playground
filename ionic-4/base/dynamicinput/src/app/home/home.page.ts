import {Component} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  public myForm: FormGroup;
  private playerCount = 1;

  constructor(private formBuilder: FormBuilder){
    this.myForm = formBuilder.group({
      player1: ['', Validators.required]
    });
  }

  addControl(){
    this.playerCount++;
    this.myForm.addControl('player' + this.playerCount, new FormControl('', Validators.required));
  }

  removeControl(control){
    this.myForm.removeControl(control.key);
  }
}
