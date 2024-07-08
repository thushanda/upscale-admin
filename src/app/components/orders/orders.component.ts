import { Component } from '@angular/core';
import {
    CustomerStatusManagerComponent
} from "../customers/inner/customer-status-manager/customer-status-manager.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-orders',
  standalone: true,
    imports: [
        CustomerStatusManagerComponent,
        MatIcon,
        MatIconButton
    ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

}
