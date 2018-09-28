import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../../models/Location';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements OnInit {

  lat: string = '';
  lng: string = '';

  //coordenadas
  @Input() latitud: number;
  @Input() longitud: number;
  @Input() markers: Location[];

  constructor() { }

  ngOnInit() {
  }

  mapClicked(evt){
    console.log(evt);
    console.log(this.markers);
  }

}
