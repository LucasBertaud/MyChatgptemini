import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../shared/models/message.model';
import { IsAiDirective } from '../../../shared/directives/is-ai.directive';
import { NgClass } from '@angular/common';
import { CopyToClipboardDirective } from '../../../shared/directives/copy-to-clipboard.directive';
import { MarkdownComponent, provideMarkdown } from 'ngx-markdown';
import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

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
  providers: [provideMarkdown()],
})
export class MessageComponent {
  @Input() message!: Message;
}
