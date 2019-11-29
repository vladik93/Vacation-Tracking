import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { VacationService } from '../vacation.service';
import { UserService } from '../user.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, BaseChartDirective } from 'ng2-charts';
import { Vacation } from '../vacation.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnInit, OnChanges {

  @ViewChild(BaseChartDirective) private chart: BaseChartDirective;


  vacationsCount: any = [];
  vacationsName: any = [];



  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };

  public barChartLabels: Label[] = this.vacationsName;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: this.vacationsCount, label: 'Followers', backgroundColor: '#6b9ae5', borderColor: 'blue' }
  ];

  constructor(private vacationService: VacationService, private userService: UserService, private router: Router,
    private cookie: CookieService) { }

  ngOnInit() {
    if (this.cookie.check('express-session-storage') === false) {
      this.router.navigateByUrl('error/session_error');
    }

    this.userService.userSession()
        .pipe(map((user) => {
            if (user.admin.data[0] === 0) {
                this.router.navigateByUrl('error/admin_error');
            }
    }))
    .subscribe((value) => console.log(value));

    this.getVacationName();
    this.getVacationCount();
  }

  ngOnChanges() {
    setInterval(() => {
      this.chart.chart.update();
    }, 1000);
  }



  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  getVacationCount() {
    this.vacationService.getVacations()
    .subscribe((data) => {
      this.vacationsCount = data.map((vacation) => {
        this.vacationsCount.push(vacation.follow_count);
        console.log(this.vacationsCount);
      });
    });

  }

  getVacationName() {
    this.chart.update();
    this.vacationService.getVacations()
    .subscribe((data) => {
      this.vacationsName = data.map((vacation) => {
        this.vacationsName.push(vacation.destination);
        console.log(this.vacationsName);
      });
    });
  }

}
