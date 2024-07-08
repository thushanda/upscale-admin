import {Component, inject, Inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductImageService} from "../../../../service/productImage/product-image.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-manage-product-images',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './manage-product-images.component.html',
  styleUrl: './manage-product-images.component.scss'
})
export class ManageProductImagesComponent implements OnInit{
  readonly data = inject(MAT_DIALOG_DATA);

  images:any[] = [];
  selectedFile: File | null = null;

  constructor(private dialogRef: MatDialogRef<ManageProductImagesComponent>,
              private productImageService: ProductImageService,
              ) {

    console.log(this.data?.product+ 'productID')
  }

  ngOnInit(): void {
    console.log(this.data?.product+ 'productID is coming')
    this.loadProductImages();

  }

  loadProductImages(){
    this.productImageService.getProductImages(this.data?.product).subscribe(res =>{
      this.images = res.data;
      console.log(this.productImageService.getProductImages(this.data?.product))
    })
  }



  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push({ resourceUrl: e.target.result });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage(){
    if (this.selectedFile){
      this.productImageService.uploadProductImage(this.data?.product,this.selectedFile).subscribe(res=>{
        console.log(this.selectedFile?.name)
        console.log('uploaded success')
        this.loadProductImages();
        this.selectedFile=null;
      })
    }
  }


  close(){
    this.dialogRef.close();
  }

}
