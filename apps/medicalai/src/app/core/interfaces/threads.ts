/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Thread {
  role: string;
  parts: Array<any>;
}
export interface Threads {
  id: number;
  user_id?: number;
  gemini: Thread;
}
