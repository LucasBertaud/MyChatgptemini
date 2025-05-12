import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Message } from '../../models/message.model';
import { CreateMessageDto } from '../../../features/discussion/message/dto/create-message.dto';
import { MessageService } from '../../../features/discussion/message/message.service';
import { DiscussionService } from '../../../features/discussion/discussion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { globalMessages } from '../../signals';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  imports: [ReactiveFormsModule],
  providers: [DiscussionService],
})
export class ChatComponent {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly discussionService: DiscussionService =
    inject(DiscussionService);
  private messageService: MessageService = inject(MessageService);
  chatForm = new FormGroup({
    content: new FormControl(''),
  });
  public loader: WritableSignal<boolean> = signal(false);

  onSubmit() {
    const discussionId = this.activatedRoute.snapshot.params['id'];
    if (this.chatForm.valid && this.chatForm.value.content) {
      this.loader.set(true);
      const content = this.chatForm.value.content;
      const createMessageDto: CreateMessageDto = {
        ai: false,
        content: content,
        discussionId: discussionId ? discussionId : null,
      };
      this.messageService.createMessage(createMessageDto).subscribe({
        next: (response: { user: Message; ai: Message }) => {
          this.discussionService.getDiscussionsByUser();
          if (!discussionId) {
            this.router.navigate([`/${response.ai.discussion.id}`]);
          } else {
            globalMessages.update((messages) => {
              return [...messages, response.user, response.ai];
            });
          }
        },
        error: (error) => {
          console.error('Error sending message:', error);
        },
        complete: () => {
          this.chatForm.reset();
          this.loader.set(false);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
