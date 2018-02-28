import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pageTitle:string = 'Login';
  constructor(private data: PageTitleService) { }

  ngOnInit() {
    this.data.changeTitle(this.pageTitle)
  }

}
