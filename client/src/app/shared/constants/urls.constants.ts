import { API_PATHS } from './paths.constants';
import { environment } from '../../../environments/environment';

export const API_URLS = {
  DISCUSSION: {
    CREATE:
      environment.api.url +
      API_PATHS.DISCUSSION.BASE +
      API_PATHS.DISCUSSION.CREATE,
    GET_BY_ID: (id: string): string =>
      environment.api.url +
      API_PATHS.DISCUSSION.BASE +
      API_PATHS.DISCUSSION.FIND_BY_ID(id),
    GET_BY_USER:
      environment.api.url +
      API_PATHS.DISCUSSION.BASE +
      API_PATHS.DISCUSSION.FIND_BY_USER,
    UPDATE: (id: string): string =>
      environment.api.url +
      API_PATHS.DISCUSSION.BASE +
      API_PATHS.DISCUSSION.UPDATE(id),
    DELETE: (id: string): string =>
      environment.api.url +
      API_PATHS.DISCUSSION.BASE +
      API_PATHS.DISCUSSION.DELETE(id),
  },
  MESSAGE: {
    CREATE:
      environment.api.url + API_PATHS.MESSAGE.BASE + API_PATHS.MESSAGE.CREATE,
    GET_BY_ID: (id: string): string =>
      environment.api.url +
      API_PATHS.MESSAGE.BASE +
      API_PATHS.MESSAGE.FIND_BY_ID(id),
    GET_BY_DISCUSSION: (discussionId: string): string =>
      environment.api.url +
      API_PATHS.MESSAGE.BASE +
      API_PATHS.MESSAGE.FIND_BY_DISCUSSION(discussionId),
    UPDATE: (id: string): string =>
      environment.api.url +
      API_PATHS.MESSAGE.BASE +
      API_PATHS.MESSAGE.UPDATE(id),
    DELETE: (id: string): string =>
      environment.api.url +
      API_PATHS.MESSAGE.BASE +
      API_PATHS.MESSAGE.DELETE(id),
  },
};
