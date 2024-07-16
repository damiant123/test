import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'testProject';
  syncToken!: string;
  projects: Observable<any> = this.getProjects();

  constructor(private client: HttpClient) {
  }

  makeProject() {
    let headers: HttpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer 78bf9d29479db5dfdac2c3c0b3317634775ba3a5')
      .append('Content-Type', 'application/json');

    return this.client
      .post(
        `https://api.todoist.com/rest/v2/projects`,
        { name: 'Shopping List' },
        { headers }
      )
      .subscribe();
  }

  getProjects(): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders().set(
      'Authorization',
      'Bearer 78bf9d29479db5dfdac2c3c0b3317634775ba3a5'
    );

    return this.client
      .get(
        'https://api.todoist.com/rest/v2/projects',
        { headers }
      )
      .pipe(tap((res: any) => (this.syncToken = res.syncToken)));
  }
}
