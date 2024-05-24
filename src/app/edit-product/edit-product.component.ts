import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  productId!: number;
  productFormGroup!: FormGroup;
  constructor(private activatedRoute:ActivatedRoute,
              private productService: ProductService,
              private formBuilder: FormBuilder
  ) {
  }
  ngOnInit(): void {
    // Get the product id from the route
    this.productId = this.activatedRoute.snapshot.params['id'];
    //initialize the form
    this.productService.getProductById(this.productId).subscribe(
      {
        next:(product) => {
          this.productFormGroup = this.formBuilder.group({
            id:this.formBuilder.control(product.id),
            name:this.formBuilder.control(product.name,Validators.required),
            price:this.formBuilder.control(product.price,[Validators.min(100)]),
            checked:this.formBuilder.control(product.checked)
          })
        },
        error: (error) => {
          console.log(error);
        }

      }
    )

  }

  updateProduct() {
    let product : Product = this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next: (product) => {
        alert(JSON.stringify(product));
      },
      error: (error) => {
        console.log(error);
      }
    })

  }
}
