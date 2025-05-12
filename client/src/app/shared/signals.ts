import { signal } from '@angular/core';
import { Discussion } from './models/discussion.model';
import { Message } from './models/message.model';

export const globalDiscussions = signal<Discussion[]>([]);
export const globalMessages = signal<Message[]>([]);
