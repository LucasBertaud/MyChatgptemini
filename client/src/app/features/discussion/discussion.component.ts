import { Component, effect, inject, Input, OnInit } from '@angular/core';
import { MessageComponent } from './message/message.component';
import { ChatComponent } from '../../shared/components/chat/chat.component';
import { Message } from '../../shared/models/message.model';
import { globalMessages } from '../../shared/signals';
import { NgIf, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-discussion',
  imports: [ChatComponent, MessageComponent, NgIf],
  standalone: true,
  templateUrl: './discussion.component.html',
})
export class DiscussionComponent implements OnInit {
  private readonly scroll = inject(ViewportScroller);
  @Input() messages!: Message[];

  constructor() {
    effect(() => {
      this.messages = globalMessages();
    });
  }

  ngOnInit() {
    globalMessages.set(this.messages);
    const discussion = document.getElementById('discussion');
    if (discussion) {
      discussion.scrollTo(0, discussion.scrollHeight);
    }
  }
}
