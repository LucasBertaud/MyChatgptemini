import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URLS } from '../../../shared/constants/urls.constants';
import { Message } from '../../../shared/models/message.model';
import { CreateMessageDto } from './dto/create-message.dto';

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

  public createMessage(message: CreateMessageDto) {
    return this.http.post<{ user: Message; ai: Message }>(
      API_URLS.MESSAGE.CREATE,
      {
        ai: message.ai,
        content: message.content,
        discussionId: message.discussionId,
      }
    );
  }

  public updateMessage(id: string, message: Message) {
    return this.http.patch<Message>(API_URLS.MESSAGE.UPDATE(id), message);
  }
}
