import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-additional-informations',
  templateUrl: './additional-informations.component.html',
  styleUrls: ['./additional-informations.component.scss']
})
export class AdditionalInformationsComponent {


  address?: Address; // Poprawiono literówkę: 'address' zamiast 'addres'

  constructor(private route: ActivatedRoute, private addressService: AddressService) {
    this.route.params.subscribe(params => {
      const shopId = +params['shopId']; // Pobranie shopId z parametrów routingu
      console.log("Shop ID:", shopId);

      // Teraz możesz wywołać odpowiednią metodę z addressService i przekazać shopId
      this.addressService.getAdrresForShop(shopId).subscribe(result => {
        this.address = result; // Przypisanie danych do zmiennej 'address'
        console.log("Address Data:", this.address.addressId);
      });
    });
  }

}
