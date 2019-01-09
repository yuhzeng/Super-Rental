import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/service-export';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  public ipAddress: Observable<string>;

  constructor(private _chatService: ChatService) {}

  ngOnInit() {
    this._chatService.getIpAddress().then(ipAddress => this.ipAddress = ipAddress.ip);
  }

}
