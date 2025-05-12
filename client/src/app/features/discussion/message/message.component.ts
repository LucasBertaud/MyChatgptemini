import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Message } from '../../../shared/models/message.model';
import { IsAiDirective } from '../../../shared/directives/is-ai.directive';
import { NgClass } from '@angular/common';
import { CopyToClipboardDirective } from '../../../shared/directives/copy-to-clipboard.directive';
import { MarkdownComponent, provideMarkdown } from 'ngx-markdown';
import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import './message.service';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  imports: [
    IsAiDirective,
    NgClass,
    CopyToClipboardDirective,
    MarkdownComponent,
  ],
  providers: [provideMarkdown(), MessageService],
})
export class MessageComponent {
  @Input() message!: Message;
  @Input() precedentMessage!: Message;
  isLoading = signal(false);
  private readonly messageService: MessageService = inject(MessageService);

  async retry() {
    this.isLoading.set(true);
    this.messageService
      .updateMessage(this.message.id, this.precedentMessage)
      .subscribe({
        next: (response) => {
          this.message = response;
        },
        error: (error) => {
          console.error('Error retrying message:', error);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }
}
