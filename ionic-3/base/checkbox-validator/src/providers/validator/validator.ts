import 'rxjs/add/operator/map';
import {FormControl} from "@angular/forms";

export class ValidatorProvider {

  validateCheckboxes(boxes: FormControl) {
    let valid: boolean = false;

    for (let k in boxes.value) {
      var val = boxes.value[k];

      if (val) {
        valid = true;
        break;
      }
    }

    if (valid) {
      return null;
    }

    return {
      checkboxRequired: true
    };
  }

}
