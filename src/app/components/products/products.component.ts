import {Component, OnInit} from '@angular/core';
import {
    CustomerStatusManagerComponent
} from "../customers/inner/customer-status-manager/customer-status-manager.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {NewProductComponent} from "./inner-pages/new-product/new-product.component";
import {UpdateProductComponent} from "./inner-pages/update-product/update-product.component";
import {ManageProductImagesComponent} from "./inner-pages/manage-product-images/manage-product-images.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {count, debounceTime} from "rxjs";
import {ProductService} from "../../service/product/product.service";
import {ConfirmationDeleteComponent} from "../confirmation-delete/confirmation-delete.component";
import {MatTooltip} from "@angular/material/tooltip";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ClipboardService} from "../../service/copy-clipboard/clipboard.service";
import {CurrencyConvertService} from "../../service/currency-convert/currency-convert.service";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CustomerStatusManagerComponent,
    MatIcon,
    MatIconButton,
    ReactiveFormsModule,
    MatTooltip,
    NgForOf,
    MatPaginator,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  searchText='';
  page:any=0;
  size:any=10;
  count=0;
  dataList:any[]=[];
  isEmpty=false;
  exchangeRate=0;


  searchForm: FormGroup = new FormGroup({
    text: new FormControl('')
  });

  constructor(private matDialog: MatDialog,
              private productService: ProductService,
              private clipboardService: ClipboardService,
              private currencyConvert:CurrencyConvertService) {
  }

  ngOnInit(): void {
    this.loadAllProducts();
    this.loadExchangeRate()
    this.searchForm.valueChanges
      .pipe(debounceTime(900))
      .subscribe(data => {
        this.searchText = data.text;
        this.loadAllProducts();
      })
  }

  loadExchangeRate(): void {
    this.currencyConvert.getExchangeRate('USD', 'LKR').subscribe(rate => {
      this.exchangeRate = rate;
    });
  }

  openNewProductForm(){
    let matDialogRef = this.matDialog.open(NewProductComponent,{
      width:'500px',
      disableClose:true
    });

    matDialogRef.afterClosed().subscribe(res=>{
      if (res){
        this.loadAllProducts();
      }
    })
  }

  convertToLKR(price: number): number {
    return price * this.exchangeRate;
  }

  openUpdateProductForm(product:any){
    let matDialogRef = this.matDialog.open(UpdateProductComponent,{
      width:'500px',
      disableClose:true,
      data:{product:product}
    });

    matDialogRef.afterClosed().subscribe(res=>{
      if (res){
        this.loadAllProducts();
      }
    })
  }

  openProductImageForm(product:any){
    let matDialogRef = this.matDialog.open(ManageProductImagesComponent,{
      width:'500px',
      disableClose:true,
      data: {product}
    });

    matDialogRef.afterClosed().subscribe(res=>{
      if (res){
        this.loadAllProducts();
        console.log('uploaded')
      }
    })
  }

  private loadAllProducts() {
    this.productService.search(this.page,this.size,this.searchText).subscribe(res=>{
      console.log(res);
      this.count=res.data?.count;
      this.dataList=res.data?.dataList || [];
      this.isEmpty=this.dataList.length === 0;

    });
  }

   deleteProduct(product:any){
    let dialogRef = this.matDialog.open(ConfirmationDeleteComponent,{
      width:'400px',
      data:{
        title:'Confirm Delete',
        message:'Are you sure you want delete this product?'
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      if (result){
        this.productService.delete(product).subscribe(res=>{
          this.loadAllProducts();
        },error => {
          console.log(error?.error?.message);
        })
      }
    })

  }


  getServerData(data: PageEvent) {
    this.page=data?.pageIndex;
    this.size=data?.pageSize;
    this.loadAllProducts();
  }

  copyItem(propertyId: any) {
    this.clipboardService.copy(propertyId);
  }
}
