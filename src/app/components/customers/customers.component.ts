import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {CustomerStatusManagerComponent} from "./inner/customer-status-manager/customer-status-manager.component";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    CustomerStatusManagerComponent,
    MatTooltip
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

}
