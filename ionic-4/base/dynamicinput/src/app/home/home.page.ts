import {Component} from '@angular/core';
import {UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  public myForm: UntypedFormGroup;
  private playerCount = 1;

  constructor(private readonly formBuilder: UntypedFormBuilder){
    this.myForm = formBuilder.group({
      player1: ['', Validators.required]
    });
  }

  addControl(): void {
    this.playerCount++;
    this.myForm.addControl('player' + this.playerCount, new UntypedFormControl('', Validators.required));
  }

  removeControl(control: any): void {
    this.myForm.removeControl(control.key);
  }
}
