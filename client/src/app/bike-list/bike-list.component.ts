import { Component, OnInit } from '@angular/core';
import { BikeService } from '../shared/bike/bike.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.css']
})
export class BikeListComponent implements OnInit {

 bikes: Array<any>;

  constructor(private bikeService: BikeService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.bikeService.getAll().subscribe(data => {
      this.bikes = data;
      for (const bike of this.bikes) {
        this.giphyService.get(bike.name).subscribe(url => bike.giphyUrl = url);
      }
    });
  }

}
