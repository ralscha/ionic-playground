import {Control} from '@angular/common';

export class UsernameValidator {

    static checkUsername(control: Control): Promise<{ [msg: string]: boolean }> {

        return new Promise(resolve => {

            //Fake a slow response from server

            setTimeout(() => {
                if (control.value.toLowerCase() === "greg") {

                    resolve({
                        "username taken": true
                    });

                } else {
                    resolve(null);
                }
            }, 2000);

        });
    }

}