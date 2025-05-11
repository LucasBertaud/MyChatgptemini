import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URLS } from '../../../shared/constants/urls.constants';
import { Message } from '../../../shared/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly http: HttpClient = inject(HttpClient);

  public getMessagesByDiscussionId(discussionId: string) {
    return this.http.get<Message[]>(
      API_URLS.MESSAGE.GET_BY_DISCUSSION(discussionId)
    );
  }
}
