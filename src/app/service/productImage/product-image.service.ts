import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {
  baseUrl = 'http://localhost:8001/api/v1/products';
  imageBaseUrl = 'http://localhost:8001/api/v1/product-images';
  constructor(private http:HttpClient) { }
  uploadProductImage(productId:any, file:File):Observable<any>{
    const formData:FormData = new FormData();
    formData.append('productImage',file,file.name);
    return this.http.post(`${this.imageBaseUrl}/${productId}`,formData);
  }

  getProductImages(productId:any):Observable<any>{
    return this.http.get(`${this.imageBaseUrl}/${productId}`);
  }
}
