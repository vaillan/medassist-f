/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Thread {
  contents: Array<any>;
  safetySettings: Array<any>;
}
export interface Threads {
  id: number;
  user_id: number;
  gemini: Thread;
  mode: string;
}