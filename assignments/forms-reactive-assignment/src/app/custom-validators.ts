import { FormControl } from "@angular/forms";
import { promise } from "protractor";
import { Observable } from "rxjs";

export class CustomValidators {
    static invalidProjectNameValidator(control: FormControl): {[s: string]: boolean} {
        if(control.value === 'Test')
        {
            return {'invalidProjectName': true}
        }
        return null
    }

    static invalidProjectNameValidatorAsync(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'Testproject') {
                    resolve({'invalidProjectName': true})
                }
                else {
                    resolve(null)
                }
            },1500)
        })
        return promise;
    }
}