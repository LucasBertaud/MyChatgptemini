export const INJECTION_TOKENS_REPOSITORIES = {
  USER_REPOSITORY: Symbol('UserRepository'),
  DISCUSSION_REPOSITORY: Symbol('DiscussionRepository'),
  MESSAGE_REPOSITORY: Symbol('MessageRepository'),
};

export const INJECTION_TOKENS = {
  ...INJECTION_TOKENS_REPOSITORIES,
  AI_SERVICE: Symbol('AiService'),
};
