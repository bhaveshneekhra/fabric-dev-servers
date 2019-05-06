import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace finnet{
   export class Faculty extends Participant {
      facultyId: string;
      firstName: string;
      lastName: string;
   }
   export class Account extends Asset {
      accountId: string;
      owner: Faculty;
      balance: number;
   }
   export class ApproveRequest extends Transaction {
      from: Account;
      to: Account;
      purpose: string;
      amount: number;
   }
// }
