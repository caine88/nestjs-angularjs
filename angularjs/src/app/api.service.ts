import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from  './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
  API_SERVER = "http://localhost:3000/users";

  public getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.API_SERVER}`);
  }

  public register(user: User): Observable<User>{
    return this.httpClient.post<User>(`${this.API_SERVER}/register`, user);
  }

  public getUser(id: string): Observable<User>{
    return this.httpClient.get<User>(`${this.API_SERVER}/${id}`);
  }

  public updateUser(user: User): Observable<User>{
    return this.httpClient.patch<User>(`${this.API_SERVER}/${user._id}/update`, user);
  }

  public deleteUser(id: string): Observable<User>{
    return this.httpClient.delete<User>(`${this.API_SERVER}/${id}/delete`);
  }
}
