export type UserInput = {
  email: string;
  password: string;
};

export declare namespace PeopleType {
  type Data = {
    id: string;
    fullName: string;
    shortBio: string;
    info: string;
    quote: string;
    collection: string;
    webAlias: string;
    aiId: string;
    aiVoiceId: string;
    avatar: Image;
    health?: Detail[];
    routine?: Detail[];
    knowledge?: Detail[];
    wealth?: Detail[];
  };
  type Image = {
    id: string;
    width?: number;
    height?: number;
    location?: string;
  };
  type Detail = {
    id: string;
    title: string;
    performanceItems: PerformanceItem[];
  };
  type PerformanceItem = {
    id: string;
    text: string;
    title: string;
    index?: string;
    type?: string;
    resourceImage?: Image;
    resourceAuthor?: string;
    resourceLinkTitle?: string;
    resourceLinkUrl?: string;
  };
}
