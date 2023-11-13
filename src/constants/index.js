export const LAST_SEEN_WITHIN_DAYS = 10; // Baseline logged-in users are picked within the last 10 days
export const LOOKAHEAD_DAYS = 180;
export const DAYS_SPAN_PER_TICK = 10;

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

export const SETTINGS = {
  TOTAL_USERS: {
    default: 30000,
    max: 50000,
    min: 1000,
    step: 1000,
  },

  NEWLY_REGISTERED_USER_RATE: {
    default: 0.1,
    max: 0.5,
    min: 0.01,
    step: 0.01,
  },

  VISIT_PER_DAYS: {
    default: 10,
    max: 40,
    min: 1,
    step: 1,
  },

  SESSION_EXPIRES_IN_DAYS: {
    default: SESSION_EXPIRES_IN_DAYS,
    max: 200,
    min: SESSION_EXPIRES_IN_DAYS,
    step: 1,
  },

  TOKEN_EXPIRES_IN_DAYS: {
    default: TOKEN_EXPIRES_IN_DAYS,
    max: TOKEN_EXPIRES_IN_DAYS,
    min: 1,
    step: 1,
  },
};
