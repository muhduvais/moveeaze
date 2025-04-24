declare namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
  