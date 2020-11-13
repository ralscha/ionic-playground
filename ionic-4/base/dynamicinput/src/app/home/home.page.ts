import {Component} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  public myForm: FormGroup;
  private playerCount = 1;

  constructor(private readonly formBuilder: FormBuilder){
    this.myForm = formBuilder.group({
      player1: ['', Validators.required]
    });
  }

  addControl(): void {
    this.playerCount++;
    this.myForm.addControl('player' + this.playerCount, new FormControl('', Validators.required));
  }

  removeControl(control: any): void {
    this.myForm.removeControl(control.key);
  }
}
