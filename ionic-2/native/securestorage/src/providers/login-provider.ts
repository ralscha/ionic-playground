import {Observable} from 'rxjs';

export class LoginProvider {

  constructor() {
  }

  public login(username: string, password: string) {
    let data = {success: 1};

    if (password !== 'password') {
      data.success = 0;
    }

    return Observable.from([data]);

  }

}
