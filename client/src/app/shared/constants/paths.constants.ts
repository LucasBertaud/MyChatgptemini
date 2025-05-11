export const API_PATHS = {
  DISCUSSION: {
    BASE: '/discussion',
    CREATE: '',
    FIND_BY_ID: (id: string): string => `/${id}`,
    FIND_BY_USER: '/user',
    UPDATE: (id: string): string => `/${id}`,
    DELETE: (id: string): string => `/${id}`,
  },
  MESSAGE: {
    BASE: '/message',
    CREATE: '',
    FIND_BY_ID: (id: string): string => `/${id}`,
    FIND_BY_DISCUSSION: (id: string): string => `/discussion/${id}`,
    UPDATE: (id: string): string => `/${id}`,
    DELETE: (id: string): string => `/${id}`,
  },
};
