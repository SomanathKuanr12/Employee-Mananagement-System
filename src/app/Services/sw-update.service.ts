import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Observable, concat, first, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwUpdateService {

  constructor(private update: SwUpdate, private appRef: ApplicationRef) { }

  checkForUpdate(): Observable<boolean | string> {
    const appIsStable = this.appRef.isStable.pipe(first(isStable => isStable == true));
    const everyTwoMinutes = interval(1 * 60 * 1000);
    const everyTwoMinutesIsStable = concat(appIsStable, everyTwoMinutes);
    return new Observable<boolean | string>((observer) => {
      everyTwoMinutesIsStable.subscribe(async () => {
        try {
          const isUpdateAvailable = await this.update.checkForUpdate();
          if (isUpdateAvailable) {
            observer.next(true);
          } 
          if(!isUpdateAvailable) {
            observer.next(false);
          }
        } catch (error) {
          observer.next("error occured");
        }
      });
    });
  }
}
