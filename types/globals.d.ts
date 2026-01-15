// types/globals.d.ts
export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: 'super-admin' | 'admin' | 'user';
    };
  }
}