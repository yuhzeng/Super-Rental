import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot, DocumentSnapshot } from '@angular/fire/firestore';
import { ChatThread, ChatMessage } from 'app/models/chat';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatThreadsCollection: AngularFirestoreCollection<ChatThread>;

  constructor(private afs: AngularFirestore,
              private _httpclient: HttpClient) {
    this.chatThreadsCollection = afs.collection<ChatThread>('chat-threads');
  }

  // TODO: Verify this works on server
  getIpAddress(): Promise<any> {
    // const url = 'http://ipv4.myexternalip.com/json';
    const url = 'https://json.geoiplookup.io/api';
    return this._httpclient.get(url).toPromise();
  }

  async createNewChatThread(_chatThreadID: string = '') {
    const chatThreadID = _chatThreadID || this.afs.createId();
    const chatThreadObj = {
      chatThreadID: chatThreadID,
      active: true,
      userTyping: false,
      adminTyping: false
    };
    return this.chatThreadsCollection
      .doc(chatThreadID)
      .set(chatThreadObj)
      .then(() => chatThreadObj);
  }

  getChatThread(activeThreadID: string): Observable<any> {
    console.log(activeThreadID);
    return this.chatThreadsCollection
      .doc(activeThreadID)
      .valueChanges();
  }

  getAllChatThreads(): Observable<ChatThread[]> {
    return this.chatThreadsCollection.valueChanges();
  }

  getActiveChatThreads(): Observable<ChatThread[]> {
    return this.afs.collection<ChatThread>('chat-threads',
        ref => ref.where('active', '==', true))
      .valueChanges();
  }

  updateChatThread(activeThreadID: string, data: {}): Promise<void> {
    return this.chatThreadsCollection
      .doc(activeThreadID)
      .update(data);
  }

  getMessagesForChat(activeThreadID: string): Observable<ChatMessage[]> {
    return this.afs.collection('chat-threads')
      .doc(activeThreadID)
      .collection<ChatMessage>('messages', ref => ref.orderBy('sentAt'))
      .valueChanges();
  }

  sendMessage(messageObj: any): Promise<void> {
    console.log(messageObj);
    const messageID = this.afs.createId();
    const { messageText, chatThreadID, sender } = messageObj;
    const chatThreadObj = <ChatMessage> {
      messageID: messageID,
      isRead: false,
      sentAt: Date.now(),
      messageText: messageText,
      chatThreadID: chatThreadID,
      sender: sender
    };
    return this.chatThreadsCollection
      .doc(chatThreadID)
      .collection('messages')
      .doc(messageID)
      .set(chatThreadObj);
  }

  markMessageAsRead(chatThreadID: string, messageID: string): Promise<void> {
    return this.chatThreadsCollection
      .doc(chatThreadID)
      .collection('messages')
      .doc(messageID)
      .update({
        read: true
      });
  }

  markMessagesAsRead(chatThreadID: string, currentUser: string): Promise<void> {
    const batch = this.afs.firestore.batch();
    return this.chatThreadsCollection
      .doc(chatThreadID)
      .collection('messages')
      .get()
      .toPromise()
      .then((messages: QuerySnapshot<ChatMessage>) => {
        messages.forEach((message) => {
          if (currentUser === 'anon-user' && message.data().sender === 'admin') {
            return batch.update(message.ref, {
              isRead: true
            });
          } else if (currentUser === 'admin' && message.data().sender !== 'admin') {
            return batch.update(message.ref, {
              isRead: true
            });
          }
        });
        batch.delete(this.chatThreadsCollection.doc(chatThreadID).ref);
        return batch.commit();
      });
  }

  // TODO: TEST??? Concurrency / overlapping request issue predictions
  async closeThread(chatThreadID: string): Promise<void> {
    const batch = this.afs.firestore.batch();
    await this.chatThreadsCollection
      .doc(chatThreadID)
      .collection('messages')
      .get()
      .toPromise()
      .then((messages: QuerySnapshot<ChatMessage>) => messages.forEach(message => batch.delete(message.ref)));
    batch.delete(this.chatThreadsCollection.doc(chatThreadID).ref);
    return batch.commit();
  }

  markThreadInactive(chatThreadID: string): Promise<void> {
    return this.chatThreadsCollection
      .doc(chatThreadID)
      .update({
        isActive: false
      });
  }

}
