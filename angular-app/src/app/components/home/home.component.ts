import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageTitle:string = 'Home';
  constructor(private data: PageTitleService) { }

  ngOnInit() {
    this.data.changeTitle(this.pageTitle)
  }

}
