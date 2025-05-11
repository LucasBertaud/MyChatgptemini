import { Component, inject } from '@angular/core';
import { DiscussionService } from '../../../features/discussion/discussion.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DateKeyEnum } from '../../../shared/enums/date-key.enum';
import { GroupByDatePipe } from '../../../shared/pipes/group-by-date.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [GroupByDatePipe, RouterLink],
  templateUrl: './aside.component.html',
  providers: [DiscussionService],
})
export class AsideComponent {
  public readonly UPDATED_AT = DateKeyEnum.UPDATED_AT;
  private readonly discussionService = inject(DiscussionService);
  public discussions = toSignal(this.discussionService.getDiscussionsByUser(), {
    initialValue: [],
  });
}
