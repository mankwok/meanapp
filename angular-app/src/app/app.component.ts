import { Component, OnInit } from '@angular/core';
import { PageTitleService } from './services/page-title.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PageTitleService]
})
export class AppComponent implements OnInit{
  pageTitle:string;

  constructor(private data: PageTitleService) { }

  ngOnInit() {
    this.data.currentPageTitle.subscribe(currentPageTitle => this.pageTitle = currentPageTitle)

  }
}
