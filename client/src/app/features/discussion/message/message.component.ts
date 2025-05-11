import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../shared/models/message.model';
import { IsAiDirective } from '../../../shared/directives/is-ai.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  imports: [IsAiDirective, NgClass],
})
export class MessageComponent implements OnInit {
  @Input() message!: Message;

  ngOnInit(): void {
    console.log(this.message);
  }
}
