import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

// on declare l interceptor dans providers de app.module.ts
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor( private appState:AppStateService,
               private loadingService:LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /*
    this.appState.setProductState({
      //initialisation du status par LOADING
      status: "LOADING",
    });*/
    this.loadingService.showLoadingSpinner();

    // creation d'une copie de la requete
    let req = request.clone({
      //ajout du header Authorization
      headers: request.headers.set("Authorization", "Bearer JWT")
    });
    return  next.handle(req).pipe(
      finalize(()=> {
        /*this.appState.setProductState({
          status: "",
        });*/
    this.loadingService.hideLoadingSpinner();
  })
    );
  }
}
