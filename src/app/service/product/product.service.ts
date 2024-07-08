import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl='http://localhost:8001/api/v1/products';
  constructor(private http:HttpClient) { }
  create(obj:any){
    return this.http.post(this.baseUrl,{
      qty:obj.qty,
      unitPrice:obj.unitPrice,
      description:obj.description
    })
  }

  search(page:any,size:any,searchText:any):Observable<any>{
    let params = new HttpParams();
    params=params.append('searchText', searchText);
    params=params.append('page', page);
    params=params.append('size',size);
    return this.http.get(this.baseUrl+'/list',{params:params});
  }

  delete(id:any){
    return this.http.delete(this.baseUrl+'/'+ id);
  }

  update(obj:any, id:any):Observable<any>{
    return this.http.put(this.baseUrl+'/'+id,{
      qty:obj.qty,
      unitPrice:obj.unitPrice,
      description:obj.description
    })
  }


}
