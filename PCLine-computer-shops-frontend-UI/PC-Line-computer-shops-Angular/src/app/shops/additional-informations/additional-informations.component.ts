import { Component, Inject } from '@angular/core';
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
      const shopId = +params['shopId'];
      console.log("Shop ID:", shopId);

      this.addressService.getAdrresForShopService(shopId).subscribe(result => {
        this.address = result;
      });
    });
  }

}
