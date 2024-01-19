export type ChatContentType = {
  message: string;
  generated: boolean;
  audioUrl?: string;
};
export type ChatMenuType = {
  label: string;
  value: string;
  icon: string;
};
export declare namespace PreviousChatType {
  type Data = {
    id: string;
    projectId: string;
    conversationId: string;
    authorId: string;
    authorName: string;
    generated: boolean; //true for AI, false for human
    date: string;
    text: string;
  };
  type Body = {
    input: {
      conversation_id: string;
      limit: number;
    };
  };
}

type MessageType = {
  authorName: string;
  message: string;
};

export declare namespace ConversationChatType {
  type Data = {
    memory: { memory: string };
    messages: MessageType[];
    response: MessageType;
  };
  type Body = {
    conversationId: string;
    aiId: string;
    authorId: string;
    authorName: string;
    message: string;
  };
}

export type ChatSwitchActionType = 'text' | 'voice';

export type ConversationListType = {
  id: string;
  aiId: string;
  dateUpdated: string;
};

export type ChatMenuActionType = 'restart' | 'report';
