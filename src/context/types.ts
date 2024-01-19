export interface Action {
  type: string;
  payload: Record<string, any>;
}

export interface User {
  token?: string;
}
