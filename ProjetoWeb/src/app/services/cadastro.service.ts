import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Reminder } from '../models/reminder';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  API_URL = "http://localhost:8080"

  constructor(private http:HttpClient) { }

  get()
  {
    return this.http.get(`${this.API_URL}/getReminder`);
  }

  save(reminder: Reminder)
  {
    return this.http.post(`${this.API_URL}/saveReminder`, reminder);
  }

  delete(reminderId: any)
  {
    return this.http.delete(`${this.API_URL}/deleteReminder/${reminderId}`);
  }

  edit(reminder: Reminder)
  {
    return this.http.put(`${this.API_URL}/editReminder/${reminder._id}`, reminder);
  }
}
