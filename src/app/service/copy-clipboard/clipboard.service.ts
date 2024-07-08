import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  readonly snackBar=inject(MatSnackBar);
  constructor() { }

  copy(text: string){
    if (navigator.clipboard){
      navigator.clipboard.writeText(text).then(()=>{
        this.snackBar.open('copied to the clipboard','close',{
          duration:3000
        });
      }).catch(err =>{
        this.snackBar.open('try again!','close',{
          duration:3000
        })
      })
    }else{
      this.snackBar.open('something went wrong','close',{
        duration:2000
      })
    }
  }
}
