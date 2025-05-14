import {
  Component,
  effect,
  ElementRef,
  inject,
  Input,
  OnInit,
  NgZone,
  ViewChild,
} from '@angular/core';
import { MessageComponent } from './message/message.component';
import { ChatComponent } from '../../shared/components/chat/chat.component';
import { Message } from '../../shared/models/message.model';
import { globalMessages } from '../../shared/signals';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MessageService } from './message/message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discussion',
  imports: [ChatComponent, MessageComponent, InfiniteScrollDirective],
  standalone: true,
  templateUrl: './discussion.component.html',
})
export class DiscussionComponent implements OnInit {
  @Input() messages!: Message[];
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private discussionId = this.route.snapshot.paramMap.get('id');
  private ngZone = inject(NgZone);
  @ViewChild('window') scrollContainer!: ElementRef<HTMLDivElement>;

  constructor() {
    effect(() => {
      this.messages = globalMessages();
    });
  }

  loadMoreMessages() {
    if (this.discussionId && this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;

      const previousScrollHeight = container.scrollHeight;
      const previousScrollTop = container.scrollTop;

      this.messageService
        .getMessagesByDiscussionId(this.discussionId, {
          offset: this.messages.length,
          limit: 10,
        })
        .subscribe((messages) => {
          globalMessages.update((prev) => [...messages.reverse(), ...prev]);
          this.ngZone.onStable.pipe().subscribe(() => {
            const newScrollHeight = container.scrollHeight;
            const diff = newScrollHeight - previousScrollHeight;
            container.scrollTop = previousScrollTop + diff;
          });
        });
    }
  }

  ngOnInit() {
    globalMessages.set(this.messages.reverse());
    this.route.data.subscribe((data) => {
      this.discussionId = this.route.snapshot.paramMap.get('id');
      this.ngZone.onStable.pipe().subscribe(() => {
        const container = this.scrollContainer?.nativeElement;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    });
  }
}
