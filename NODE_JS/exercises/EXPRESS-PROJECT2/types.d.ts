export interface Friend {
  name: string;
  id: number;
  messages: string[];
}

export type FriendList = Friend[];

export interface Message {
  id: number;
  senderId: keyof FriendList;
  title: string;
  body: string;
}

export interface RestError {
  error: string;
}
