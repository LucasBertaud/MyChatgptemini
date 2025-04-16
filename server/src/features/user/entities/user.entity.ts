import { Discussion } from 'src/features/discussion/entities/discussion.entity';

export interface User {
  id: string;
  name: string;
  email: string;
  discussions?: Discussion[];
}
