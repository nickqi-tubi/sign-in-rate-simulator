export const SESSION_EXPIRES_IN_DAYS = 60;

export const TOKEN_EXPIRES_IN_DAYS = 14;

export const REFRESH_STRATEGIES = {
  EXISTING: 'EXISTING',
  NEW: 'NEW',
};

export const STATUS = {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  DONE: 'DONE',
};

export const TOTAL_USERS = {
  key: 'totalUsers',
  default: 10000,
  max: 50000,
  min: 1000,
  step: 1000,
};

export const NEWLY_REGISTERED_USER_RATE = {
  key: 'newlyRegisteredUserRate',
  default: 0.1,
  max: 0.5,
  min: 0.01,
  step: 0.01,
};
