import { Component, Input } from '@angular/core';
import { MessageComponent } from './message/message.component';
import { ChatComponent } from '../../shared/components/chat/chat.component';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'app-discussion',
  imports: [ChatComponent, MessageComponent],
  standalone: true,
  templateUrl: './discussion.component.html',
})
export class DiscussionComponent {
  @Input() messages!: Message[];
}
