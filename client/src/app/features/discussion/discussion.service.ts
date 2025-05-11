import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Discussion } from '../../shared/models/discussion.model';
import { API_URLS } from '../../shared/constants/urls.constants';

@Injectable()
export class DiscussionService {
  private readonly http: HttpClient = inject(HttpClient);

  public getDiscussionsByUser() {
    return this.http.get<Discussion[]>(API_URLS.DISCUSSION.GET_BY_USER);
  }
}
