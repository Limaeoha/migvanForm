abstract class Configurable {
  startingChar: number;
  endingChar: number;
  remainingStr: string;
  porpetiesArr: string[];

  constructor(txt: string, delimiter: string) {
    this.remainingStr = txt;
    this.startingChar = this.remainingStr.indexOf(delimiter);

    const num = 4; // : number = Object.keys(this).length - Object.keys(Configurable).length;
    this.porpetiesArr = new Array(num);

    for (let i = 0; i < num; i++) {
      this.porpetiesArr[i] = this.remainingStr.slice(0, this.startingChar);
      this.remainingStr = this.remainingStr.slice(this.startingChar + delimiter.length);
      this.startingChar = this.remainingStr.indexOf(delimiter);
    }
  }
}

export class User extends Configurable {
  username: string;
  fullname: string;
  accounts: number[];
  restricted: boolean;

  constructor(txt: string) {
    super(txt, '<D>');
    this.username = this.porpetiesArr[0];
    this.fullname = this.porpetiesArr[1];
    this.accounts = this.porpetiesArr[2].split(',').map(v => parseInt(v, 10));
    this.restricted = this.porpetiesArr[3] ? true : false;
  }
}

export class Config {
  users = new Map<string, User>(); // map username -> User
  accounts = new Map<number, User>(); // map account number -> User
  current: User;

  constructor(all: string, current: string) {
    for (let search: number = all.indexOf('<D>'); search !== -1; ) {
      const newUser = new User(all);

      search = newUser.startingChar;
      all = newUser.remainingStr;

      if (isNaN(newUser.accounts[0])) { // not a valid user, i.e the first line (headers)
        continue;
      }

      this.users.set(newUser.username, newUser);
      this.accounts.set(newUser.accounts[0], newUser);
    }

    const dummyUser = new User(current); // headers
    this.current = new User(dummyUser.remainingStr);
  }

  getUser(username: string): User {
    return this.users.get(username);
  }

  getUserByAccount(account: number): User {
    return this.accounts.get(account);
  }
}
