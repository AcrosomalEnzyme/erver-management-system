import { Request } from '@nestjs/common';

export type LocalUser = {
  /**
   * The username of the user
   */
  username: string;
  // password: string;
};

export interface RequestWithUserLocal extends Request {
  /**
   * The user object
   */
  user: LocalUser;
}
