/**
 * This should come as no surprise, we need to import Injectable so we can use this provider as an injectable.
 * We also need to import firebase so we can talk to our DB.
 */
import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class ProfileData {
  // We'll use this to create a database reference to the userProfile node.
  userProfile: any;

  // We'll use this to create an auth reference to the logged in user.
  currentUser: any;


  constructor() {
    /**
     * Here we create the references I told you about 2 seconds ago 😛
     */
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.database().ref('/userProfile');

  }

  /**
   * This one should be really easy to follow, we are calling a function getUserProfile() that takes no parameters.
   * This function returns a DATABASE reference to the userProfile/uid of the current user
   * and we'll use it to get the user profile info in our page.
   */
  getUserProfile(): any {
    return this.userProfile.child(this.currentUser.uid);
  }

  /**
   * This one takes 2 string parameters, firstName & lastName, it just saves those 2 to the userProfile/uid node
   * for the current user as the firstName & lastName properties.
   */
  updateName(firstName: string, lastName: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  /**
   * Pretty much the same as before, just that instead of saving the name it's saving the date of birth
   */
  updateDOB(birthDate: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }

  /**
   * This is were things get trickier, this one is taking the user's email and first it's calling the
   * this.currentUser auth reference to call it's updateEmail() function, it's very important that you
   * understand that this is changing your email in the AUTH portion of firebase, the one stored in the
   * userProfile/uid node hasn't changed.
   * After it successfully changes your email in the AUTH portion of firebase it updates your email in the
   * real time database in the userProfile/uid node.
   */
  updateEmail(newEmail: string): any {
    this.currentUser.updateEmail(newEmail).then(() => {
      this.userProfile.child(this.currentUser.uid).update({
        email: newEmail
      });
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * Just like before this is changing the user's password, but remember,
   * this has nothing to do with the database this is the AUTH portion of
   * Firebase.
   */
  updatePassword(newPassword: string): any {
    this.currentUser.updatePassword(newPassword).then(() => {
      console.log("Password Changed");
    }, (error) => {
      console.log(error);
    });
  }
}
