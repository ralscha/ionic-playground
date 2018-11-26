import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorProvider} from "../../providers/validator/validator";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  form: FormGroup;
  charactersCounted: number = 0;

  constructor(formBuilder: FormBuilder,
              validatorProvider: ValidatorProvider) {
    this.form = formBuilder.group({
      'message': ['', Validators.minLength(10)],
      'service': formBuilder.group({
        facebook: [false],
        flickr: [false],
        instagram: [false],
        twitter: [false],
        youtube: [false],
        whatsapp: [false]
      }, {validator: validatorProvider.validateCheckboxes})
    });
  }

  validateMe(val) {
    console.log('Validating form');
    console.dir(val);
  }

  countCharacters(event) {
    event.preventDefault();
    this.charactersCounted = event.target.value.length;
  }


}
