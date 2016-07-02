import {Component, ViewChild} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {Slides} from 'ionic-angular';
import {AgeValidator} from  '../../validators/age';
import {UsernameValidator} from  '../../validators/username';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  @ViewChild('signupSlider') signupSlider: Slides;

  slideOneForm: ControlGroup;
  slideTwoForm: ControlGroup;

  firstNameChanged: boolean = false;
  lastNameChanged: boolean = false;
  ageChanged: boolean = false;

  usernameChanged: boolean = false;
  privacyChanged: boolean = false;

  submitAttempt: boolean = false;

  ionViewLoaded() {
    this.slideOneForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      age: ['', AgeValidator.isValid]
    });

    this.slideTwoForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
      privacy: ['', Validators.required],
      bio: ['']
    });
  }

  constructor(private formBuilder: FormBuilder) {

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
    }
    else if (!this.slideTwoForm.valid) {
      this.signupSlider.slideTo(1);
    }
    else {
      console.log("success!")
      console.log(this.slideOneForm.value);
      console.log(this.slideTwoForm.value);
    }
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

}