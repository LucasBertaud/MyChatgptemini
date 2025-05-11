import { Discussion } from './discussion.model';

export interface User {
  id: string;
  discussions?: Discussion[];
}
