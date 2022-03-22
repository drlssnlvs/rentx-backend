import signale from "signale";

export default class BaseCommand {
  errors: string[];

  constructor() {
    this.errors = [];
  }

  isValid(): boolean {
    return this.errors.length === 0;
  }

  addError(message: string): boolean {
    this.errors.push(message);
    return false;
  }

  clear(): Array<string> {
    this.errors = [];
    return this.errors;
  }

  handleException(ex: Error): boolean {
    signale.error(ex.stack);
    this.addError(ex.message);

    return false;
  }
}
