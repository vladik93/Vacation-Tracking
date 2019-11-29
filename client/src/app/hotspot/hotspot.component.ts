import { Component, OnInit } from '@angular/core';
import { VacationService } from '../vacation.service';
import { Vacation } from '../vacation.model';


@Component({
  selector: 'app-hotspot',
  templateUrl: './hotspot.component.html',
  styleUrls: ['./hotspot.component.css']
})
export class HotspotComponent implements OnInit {
  hotspots: Vacation[] = [];
  interval = 2000;

  constructor(private vacationService: VacationService) { }

  ngOnInit() {
    this.fetchVacationHotspots();
  }

  fetchVacationHotspots() {
    this.vacationService.getVacationHotspots()
    .subscribe((data) => this.hotspots = data);
  }
}
