import { Global, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Global()
@Injectable()
export class HashService {
  /**
   * Generating hashed string with provided salt value and return it.
   * If the salt is empty, create the default salt using bcrypt.genSalt function
   * @param value
   * @param salt
   *
   * @return Promise<string> Encrypted value
   */
  async generateHashWithSalt(value: string, salt?: string): Promise<string> {
    return bcrypt.hash(value, salt || (await bcrypt.genSalt()));
  }

  /**
   * Compare the provided value with their encrypted variation.
   *
   * @param value
   * @param encryptedValue
   *
   * @return Promise<boolean> Success in case values are equals
   */
  compareHash(value: string, encryptedValue: string): Promise<boolean> {
    return bcrypt.compare(value, encryptedValue);
  }
}
