import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {
  constructor(private http: HttpClient, private auth: AuthService) {}

  public isAuthenticated$: Observable<boolean> | undefined;

  ngOnInit() {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
    this.isAuthenticated$.subscribe((result) => {});
  }
}
