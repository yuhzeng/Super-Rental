import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'app/models/chat';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() public message: ChatMessage;
  @Input() public anonUser: boolean;
  constructor() { }

  ngOnInit() {
  }

}
