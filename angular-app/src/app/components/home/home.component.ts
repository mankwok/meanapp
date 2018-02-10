import { Component, OnInit, HostBinding  } from '@angular/core';
import { moveInLeft, fallIn } from '../../router.animations';
import { PageTitleService } from '../../services/page-title.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [moveInLeft()],
  host: {'[@moveInLeft]': ''}
})
export class HomeComponent implements OnInit {

  pageTitle:string = 'Home';
  constructor(private data: PageTitleService) { }

  ngOnInit() {
    this.data.changeTitle(this.pageTitle)
  }

}
