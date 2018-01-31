import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeService } from '../shared/bike/bike.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bike-edit',
  templateUrl: './bike-edit.component.html',
  styleUrls: ['./bike-edit.component.css']
})
export class BikeEditComponent implements OnInit, OnDestroy {
  bike: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bikeService: BikeService,
              private giphyService: GiphyService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.bikeService.get(id).subscribe((bike: any) => {
          if (bike) {
            this.bike = bike;
            this.bike.href = bike._links.self.href;
            this.giphyService.get(bike.name).subscribe(url => bike.giphyUrl = url);
          } else {
            console.log(`Bike with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/bike-list']);
  }

  save(form: NgForm) {
    this.bikeService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error))
  }

  remove(href) {
    this.bikeService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error))
  }
}
