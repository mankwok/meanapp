import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Title } from '@angular/platform-browser';


@Injectable()
export class PageTitleService {
  private pageTitleSource = new BehaviorSubject<string>("Title");

  currentPageTitle = this.pageTitleSource.asObservable();
  constructor(private titleService: Title ) { }
  
  changeTitle(newPageTitle: string) {
    this.pageTitleSource.next(newPageTitle);
    this.titleService.setTitle(newPageTitle);
  }
}
