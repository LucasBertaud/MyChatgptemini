import { Component } from '@angular/core';
import { ChatComponent } from '../../shared/components/chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
