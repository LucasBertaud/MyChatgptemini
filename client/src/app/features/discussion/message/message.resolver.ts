import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from '../../../shared/models/message.model';

export const messageResolver: ResolveFn<Message[]> = (route) => {
  const userService = inject(MessageService);
  return userService.getMessagesByDiscussionId(route.paramMap.get('id')!, {
    offset: 0,
    limit: 10,
  });
};
