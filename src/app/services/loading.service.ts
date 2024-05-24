import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  //subject est un observable
  public isLoading$ = new Subject<boolean>()

  constructor() { }

  showLoadingSpinner():void{
    //emettre une valeur
    this.isLoading$.next(true);
  }
  hideLoadingSpinner():void{
    this.isLoading$.next(false);
  }
}

