import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsernameValidator} from '../validators/username';
import {AgeValidator} from '../validators/age';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  @ViewChild('signupSlider', { static: true }) signupSlider;

  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;

  public submitAttempt = false;

  constructor(public formBuilder: FormBuilder) {
    this.slideOneForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      age: ['', AgeValidator.isValid]
    });

    this.slideTwoForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
      privacy: ['', Validators.required],
      bio: ['']
    });

  }

  next() {
    this.signupSlider.slideNext();
  }

  prev() {
    this.signupSlider.slidePrev();
  }

  save() {
    this.submitAttempt = true;

    if (!this.slideOneForm.valid) {
      this.signupSlider.slideTo(0);
    } else if (!this.slideTwoForm.valid) {
      this.signupSlider.slideTo(1);
    } else {
      console.log('success!');
      console.log(this.slideOneForm.value);
      console.log(this.slideTwoForm.value);
    }

  }

}
