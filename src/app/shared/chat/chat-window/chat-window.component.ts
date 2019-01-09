import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ChatMessage, ChatThread } from 'app/models/chat';
import { Observable, Subject } from 'rxjs';
import { ChatService, AuthXService } from 'app/services/service-export';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnChanges {

  public anonUser: boolean;
  public accordionOpened: boolean;
  public _chatThreads: Observable<ChatThread[]>;
  public _activeThread: ChatThread;
  public _activeThreadSubject = new Subject<ChatThread>();
  public _messages = new Subject<ChatMessage[]>();
  @Input() public ipAddress: string;

  constructor(private authXService: AuthXService,
              private _chatService: ChatService) { }

  ngOnInit() {
    this.accordionOpened = false;
    this.anonUser = !(this.authXService.authenticated);
    if ( !this.anonUser ) {
        this._chatThreads = this._chatService.getActiveChatThreads()
          .pipe(
            map(chatThreads => {
              console.log(chatThreads);
              return chatThreads;
            })
          );
      }
  }

  // TODO: https://stackoverflow.com/questions/38893207/angular-2-ngonchanges-fires-when-template-renders
  // tslint:disable-next-line:member-ordering
  firstChange: boolean;
  ngOnChanges(changes: SimpleChanges) {
    // if (changes['ipAddress'] && this.ipAddress !== undefined && !this.firstChange && changes['ipAddress'].isFirstChange()) {
    //   this.firstChange = true;
    //   // console.log('changes[\'ipAddress\']' + this.ipAddress);
    // }
    if (!changes['ipAddress'].isFirstChange() && !this.firstChange) {
        this.firstChange = true;
        this.setActiveThread(this.ipAddress);
    }
}

  switchTyping(chatThreadData: any) {
    // console.log('from rentz');
    const { chatThreadID, typing } = chatThreadData;
    if (this.anonUser) {
      this._chatService.updateChatThread(chatThreadID, {
        userTyping: typing
      });
    } else {
      this._chatService.updateChatThread(chatThreadID, {
        adminTyping: typing
      });
    }
  }

  setActiveThread(activeThreadID) {
    console.log(activeThreadID);
    this._chatService.getChatThread(activeThreadID)
      .subscribe(activeThread => {
        if (activeThread) {
          // this.handleReadReceipts();
          this._activeThread = activeThread;
          this._activeThreadSubject.next(activeThread);
        } else {
          this._chatService.createNewChatThread(activeThreadID)
            .then((newChatObj: any) => newChatObj as ChatThread)
            .then((newChatThread) => {
              this._activeThreadSubject.next(newChatThread);
              this._activeThread = activeThread;
            });
        }
    });
    this._chatService.getMessagesForChat(activeThreadID)
      .subscribe(chatMessages => this._messages.next(chatMessages));
  }

  toggleAccordion = () => {
    this.handleReadReceipts();
    this.accordionOpened = !this.accordionOpened;
  }

  handleReadReceipts() {
    console.log('toggle');
    console.log(this._activeThread);
    if (this._activeThread) {
      console.log('activeThread');
      const user = (this.anonUser) ? 'anon-user' : 'admin';
      return this._chatService.markMessagesAsRead(this._activeThread.chatThreadID, user);
    }
  }
}
