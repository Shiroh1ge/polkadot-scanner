import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// in a real scenario this would come from the database, but for this example we'll use a hardcoded value
const HASHED_PASSWORD = '$2b$10$lwL6XT53CyNF7cP.bDtqFeTtAWARajLN0kIhTEBEwhxnvxUt/ktgi';

@Injectable()
export class AuthService {
  public isPasswordValid(password: string): Promise<boolean> {
    return bcrypt.compare(password, HASHED_PASSWORD);
  }
}
