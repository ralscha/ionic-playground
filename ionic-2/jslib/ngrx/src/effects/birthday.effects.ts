import {Injectable} from "@angular/core";
import {BirthdayService} from "../providers/birthday-service";
import {BirthdayActions} from "../actions/birthday-actions";
import {Effect, toPayload, Actions} from '@ngrx/effects';
import {Observable} from "rxjs";
import {Birthday} from "../models/birthday";

@Injectable()
export class BirthdayEffects {
  constructor(private actions$: Actions,
              private db: BirthdayService,
              private birthdayActions: BirthdayActions) {
  }

  @Effect() addBirthday$ = this.actions$
    .ofType(BirthdayActions.ADD_BIRTHDAY)
    .map<Birthday>(toPayload)
    .mergeMap(birthday => this.db.add(birthday));

  @Effect() updateBirthday$ = this.actions$
    .ofType(BirthdayActions.UPDATE_BIRTHDAY)
    .map<Birthday>(toPayload)
    .mergeMap(birthday => this.db.update(birthday));

  @Effect() deleteBirthday$ = this.actions$
    .ofType(BirthdayActions.DELETE_BIRTHDAY)
    .map<Birthday>(toPayload)
    .mergeMap(birthday => this.db.delete(birthday));

  allBirthdays$ = this.db.getAll()
    .map(birthdays => this.birthdayActions.loadBirthdaysSuccess(birthdays));

  changedBirthdays$ = this.db.getChanges()
    .map(change => {
      if (change._deleted) {
        return this.birthdayActions.deleteBirthdaySuccess(change._id);
      }
      else {
        return this.birthdayActions.addUpdateBirthdaySuccess(change);
      }
    });

  @Effect() getBirthdays$ = Observable.concat(this.allBirthdays$, this.changedBirthdays$);

}
