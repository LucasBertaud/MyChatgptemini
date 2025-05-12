import { Component, effect, inject, OnInit } from '@angular/core';
import { DiscussionService } from '../../../features/discussion/discussion.service';
import { DateKeyEnum } from '../../../shared/enums/date-key.enum';
import { GroupByDatePipe } from '../../../shared/pipes/group-by-date.pipe';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Discussion } from '../../../shared/models/discussion.model';
import { globalDiscussions } from '../../../shared/signals';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [GroupByDatePipe, RouterLink, RouterLinkActive],
  templateUrl: './aside.component.html',
  providers: [DiscussionService],
})
export class AsideComponent implements OnInit {
  public readonly UPDATED_AT = DateKeyEnum.UPDATED_AT;
  private readonly discussionService = inject(DiscussionService);

  public discussions: Discussion[] = [];
  constructor() {
    effect(() => {
      this.discussions = globalDiscussions();
    });
  }

  ngOnInit() {
    this.discussionService.getDiscussionsByUser();
  }
}
