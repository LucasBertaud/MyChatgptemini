import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URLS } from '../../../shared/constants/urls.constants';
import { Message } from '../../../shared/models/message.model';
import { CreateMessageDto } from './dto/create-message.dto';
import { Options } from '../../../shared/types/options.type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly http: HttpClient = inject(HttpClient);

  public getMessagesByDiscussionId(discussionId: string, options?: Options) {
    const params = new URLSearchParams();

    if (options?.offset !== undefined) {
      params.append('offset', options.offset.toString());
    }

    if (options?.limit !== undefined) {
      params.append('limit', options.limit.toString());
    }

    return this.http.get<Message[]>(
      API_URLS.MESSAGE.GET_BY_DISCUSSION(discussionId) + '?' + params.toString()
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
