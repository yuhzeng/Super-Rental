import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChatThreadComponent } from './chat/chat-thread/chat-thread.component';
import { ChatMessageComponent } from './chat/chat-message/chat-message.component';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';
import { HeaderComponent, FooterComponent } from './shared-export';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material-module';
import { CommunityComponent } from './community/community-page/community.component';
import { CommunityPageCardComponent } from './community/community-page-card/community-page-card.component';
import { AddEventComponent } from './community/add-event/add-event.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ChatThreadComponent,
    ChatMessageComponent,
    ChatWindowComponent,
    HeaderComponent,
    FooterComponent,
    CommunityComponent,
    AddEventComponent,
    CommunityPageCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ChatThreadComponent,
    ChatMessageComponent,
    ChatWindowComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    CommunityComponent,
    AddEventComponent,
    CommunityPageCardComponent
  ]
})

export class SharedModule { }
