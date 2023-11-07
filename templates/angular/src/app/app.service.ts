import { Injectable } from '@angular/core';
import { Pact, signWithChainweaver } from '@kadena/client';
import writeMessage from '../utils/writeMessage';
import readMessage from '../utils/readMessage';

@Injectable({ providedIn: 'root' })
export class AppService {
  async writeMessage(account: string, message: string) {
    try {
      await writeMessage({account, messageToWrite: message});
    } catch (e) {
      console.log(e);
    }
  }

  async readMessage(account: string): Promise<string> {
    try {
      return await readMessage({account});
    } catch (e) {
      throw e;
    }
  }
}
