export class ChatMessage {

    messageID: string;
    sentAt: number;
    isRead: boolean;
    sender: string;
    messageText: string;
    chatThreadID: string;

    constructor(obj?: any) {
        this.messageID          = obj.messageID;
        this.isRead             = obj.isRead || false;
        this.sentAt             = obj.sentAt;
        this.messageText        = obj.messageText;
        this.sender             = obj.sender;
        this.chatThreadID       = obj.chatThreadID;
    }
}

export class ChatThread {

    chatThreadID: string;
    isActive: boolean;
    adminTyping: boolean;
    userTyping: boolean;

    constructor(obj?: any) {
        this.chatThreadID       = obj.chatThreadID;
        this.isActive           = obj.isActive;
        this.adminTyping        = obj.adminTyping;
        this.userTyping         = obj.userTyping;
    }
}
