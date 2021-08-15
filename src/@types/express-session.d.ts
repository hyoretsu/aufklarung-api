/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-self-import */
import 'express-session';

declare module 'express-session' {
 interface Session {
  email: string;
  user_id: string;
 }
}
