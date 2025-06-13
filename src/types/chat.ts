export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

export interface ChatUser {
  id: string;
  username: string;
  isOnline: boolean;
}
