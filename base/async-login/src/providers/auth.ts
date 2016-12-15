export class Auth {

  login() {
    return new Promise(resolve => {
      setTimeout(() => resolve(true), 3000);
    });
  }

}
