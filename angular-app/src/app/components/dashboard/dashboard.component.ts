import { Component, OnInit } from '@angular/core';
import { moveInLeft, fallIn } from '../../router.animations';
import { PageTitleService } from '../../services/page-title.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [moveInLeft()],
  host: {'[@moveInLeft]': ''}
})
export class DashboardComponent implements OnInit {

  pageTitle:string = 'Dashboard';
  constructor(private data: PageTitleService) { }

  ngOnInit() {
    this.data.changeTitle(this.pageTitle)
  }

}
