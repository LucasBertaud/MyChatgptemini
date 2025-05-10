import { Discussion } from '../../../domain/discussion/entities/discussion.entity';

export interface User {
  id: string;
  discussions?: Discussion[];
}
