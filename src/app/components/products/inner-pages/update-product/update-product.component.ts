import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ProductService} from "../../../../service/product/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit{
  readonly dialogRef=inject(MatDialogRef<UpdateProductComponent>);
  readonly productService=inject(ProductService);
  readonly matSnackBar=inject(MatSnackBar)
  readonly data = inject(MAT_DIALOG_DATA);

  constructor() {
  }

  form = new FormGroup({
    qty:new FormControl('',[Validators.required]),
    unitPrice:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
    this.form.patchValue({
      qty:this.data?.product.qty,
      unitPrice:this.data?.product.unitPrice,
      description:this.data?.product.description
    })
  }

  update(){
    const obj={
      qty:this.form.value.qty,
      unitPrice:this.form.value.unitPrice,
      description:this.form.value.description
    }
    this.productService.update(obj,this.data?.product.propertyId).subscribe(res=>{
      this.dialogRef.close(true);
      this.matSnackBar.open('Product Saved!..', 'close',{
        duration:2000
      });
    }, error => {
      console.log(error?.error?.message);
    })
  }

  close(){
    this.dialogRef.close(false);
  }


}
