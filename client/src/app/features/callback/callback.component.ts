import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {
  constructor(private http: HttpClient, private auth: AuthService) {}

  isAuthenticated$ = this.auth.isAuthenticated$;

  ngOnInit() {
    this.callApi();
    this.isAuthenticated$.subscribe((result) => {
      console.log(result);
    });
  }
  callApi(): void {
    this.http
      .get(`${environment.api.url}/user/323`)
      .subscribe((result) => console.log(result));
  }
}
