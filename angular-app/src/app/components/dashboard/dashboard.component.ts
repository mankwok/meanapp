import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pageTitle:string = 'Dashboard';
  constructor(private data: PageTitleService) { }

  ngOnInit() {
    this.data.changeTitle(this.pageTitle)
  }

}
