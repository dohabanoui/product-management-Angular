import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";
import {state} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productState:any ={

    products : [],
    keyword:  "",

    totalPages: 0,
    pageSize: 3,
    currentPage: 1,
    totalProducts: 0,
    status: "",
    errorMessge: ""
  }
  constructor() { }
  // on va creer une methode pour modifier le state
  public setProductState(state:any):void{
    // je vais copier tout les attributs et on ajoutant le state
    // je cree une copie par this.productState et dans cette copie je vais changer ce que je veux
    this.productState={...this.productState,...state}

  }
}
