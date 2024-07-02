/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpHeaders } from "@angular/common/http";

const headers = new HttpHeaders(
  { 
    'Content-Type': 'application/json',
  }
);

export const Options = {
  headers: headers,
}