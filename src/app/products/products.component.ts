import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  // je peux utilisee Array<any> au lieu de Array<Product> si on a pas l'interface Product
  /* on va les deplacer dans app-state-service.ts
  public products :Array<Product> = [];
  public keyword: string = "";

  totalPages: number = 0;
  pageSize: number = 3;
  currentPage: number = 1;
*/

  //totalPagesArray: number[] = [];


  //constructor(private http: HttpClient) {}

  constructor(private productService: ProductService,
              private router : Router,
              public appState: AppStateService) {}
  ngOnInit() {
    this.searchProducts();
    //this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);

  }


  /*getProducts() {
    //this.http.get<Array<any>>('http://localhost:8089/products')
    this.productService.getProducts(this.currentPage,this.pageSize)
      .subscribe({
        next:(resp) =>
        {//this.products = data;
          this.products = resp.body as Product[];
          //calcul du nombre de pages
          let totalProducts:number =parseInt(resp.headers.get('x-total-count')!);
          this.totalPages= Math.floor(totalProducts/this.pageSize);
          if(totalProducts % this.pageSize != 0) {this.totalPages= this.totalPages+1;
          }
        },
        error: error => {console.log('There was an error!', error);}
      })
  }*/

  searchProducts() {
    /*
    this.appState.setProductState({
      status: 'LOADING',
    });*/

    this.productService.searchProducts(
      this.appState.productState.keyword,
      this.appState.productState.currentPage,
      this.appState.productState.pageSize)
      .subscribe({
        next: (resp) => {
          //this.appState.productState.products  = resp.body as Product[];
          let products = resp.body as Product[];
          const totalCountHeader = resp.headers.get('X-Total-Count');
          //this.appState.productState.totalProducts= totalCountHeader
          console.log('Total count header:', totalCountHeader);
          if (totalCountHeader) {
            const totalProducts: number = parseInt(totalCountHeader);
            //this.appState.productState.totalPages= Math.floor(totalProducts / this.appState.productState.pageSize);
            let totalPages = Math.floor(totalProducts / this.appState.productState.pageSize);
            if (totalProducts % this.appState.productState.pageSize != 0) {
              ++totalPages;
            }
            this.appState.setProductState({
              //les données qu'on veut modifier
              products: products,
              totalProducts: totalProducts,
              totalPages: totalPages,
              status: 'LOADED'

            })
          }
        },
        error: error => {
          this.appState.setProductState({
            status: 'ERROR',
            errorMessage: error
          });}
      });
  }


  // on doit changer cette methode pour pouvoir utiliser app-state
  /*
  searchProducts() {
    this.productService.searchProducts(
      this.appState.productState.keyword,
      this.appState.productState.currentPage,
      this.appState.productState.pageSize)
      .subscribe({
        next: (resp) => {
          // Mettre à jour uniquement la propriété products
          // la liste des produits je vais le stocker dans le service
          this.appState.productState.products = resp.body as Product[];
          let totalProducts = parseInt(resp.headers.get('x-total-count')!);
          this.appState.productsState.totalProducts= totalProducts;
          console.log('totalProducts:', totalProducts);
          this.appState.productState.totalPages = Math.floor(totalProducts / this.appState.productState.pageSize);

          if (totalProducts % this.appState.productState.pageSize != 0) {
            ++this.appState.productState.totalPages;
          }
        },
        error: error => {
          console.log('There was an error!', error);
        }
      });
  }
*/

  /*products :Array<any> = [
    {id: 1,name: "Computer", price:5000,checked: false},
    {id: 2,name: "Mouse",price:200, checked: true},
    {id: 3,name: "Keyboard",price:2000, checked: false}
    ];
   */

  handleCheckProduct(product: Product) {
    // changement seulement au niveau de checked
    //this.http.patch<any>(`http://localhost:8089/products/${product.id}`, {checked: !product.checked})
    this.productService.checkProduct(product)
      .subscribe({
        next: updatedProduct => {
          product.checked = !product.checked;
        }
      }
  );
}

  handleDelete(product: Product) {
    if (confirm('Are you sure you want to delete this product?')) {
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        //this.products = this.products.filter(p => p.id !== product.id)

        //this.appState.productState.products =
          //this.appState.productState.products.filter((p:any) => p.id !== product.id)

        this.searchProducts();

      }
    })

  }
}

  /*searchProducts() {
    this.currentPage = 1;
    this.totalPages = 0;
    this.productService.searchProducts(this.keyword,this.currentPage,this.pageSize).subscribe({
      next : value => {
        this.products=value;
      }
    })
  }*/

  handleGoToPage(page: number) {
    this.appState.productState.currentPage = page;
    this.searchProducts();
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);

  }
}
