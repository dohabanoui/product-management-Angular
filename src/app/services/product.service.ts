import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host :string = "http://localhost:8089";

  constructor(private http: HttpClient) { }

  // Array<Product> c'est de l'interface Product.model.ts
  /*public getProducts(page:number=1, size:number=4):Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:8089/products?_page=${page}&_limit=${size}`);
  }*/
  public searchProducts(keyword:string="",page:number=1, size:number=4){
    return this.http.get(`${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`, {observe: 'response'});
  }

  public checkProduct(product: Product) {
    return this.http.patch<Product>(`${this.host}/products/${product.id}`,
      {checked: !product.checked});
  }

  public deleteProduct(product: Product) {
    return this.http.delete<any>(`${this.host}/products/${product.id}`);
  }

  saveProduct(product: Product) {
    return this.http.post<Product>(`${this.host}/products`, product);

  }

  // Je n'ai pas besoin de cette methode car j'ai ajouter le keyword dans la methode getProducts (car c'est la difference entre les deux)
  /*public searchProducts(keyword:string,page:number=1,size: number=3):Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`);
  }*/
  getProductById(productId: number):Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${productId}`);


  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`, product);

  }
}
