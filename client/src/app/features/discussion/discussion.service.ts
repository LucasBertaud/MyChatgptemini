import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Discussion } from '../../shared/models/discussion.model';
import { API_URLS } from '../../shared/constants/urls.constants';
import { globalDiscussions } from '../../shared/signals';

@Injectable()
export class DiscussionService {
  private readonly http: HttpClient = inject(HttpClient);

  public getDiscussionsByUser() {
    this.http
      .get<Discussion[]>(API_URLS.DISCUSSION.GET_BY_USER)
      .subscribe((discussions) => {
        globalDiscussions.update((prev) => {
          const mergedDiscussions = [
            ...prev.filter(
              (d) => !discussions.some((newD) => newD.id === d.id)
            ),
            ...discussions,
          ];
          return mergedDiscussions;
        });
      });
  }
}
