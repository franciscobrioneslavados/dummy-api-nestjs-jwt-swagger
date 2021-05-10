import { Injectable, Logger } from '@nestjs/common';

import * as util from 'util';

@Injectable()
export class LoggerService extends Logger {
  context?: string;

  public setContext(context: string) {
    this.context = context;
  }

  log(message: any, context?: string) {
    const formattedMessage = this.formatMessage(message);
    return super.log(formattedMessage, context);
  }

  error(message: any, trace?: string, context?: string): any {
    return super.error(message, context);
  }

  warn(message: any, context?: string): any {
    const formattedMessage = this.formatMessage(message);
    return super.warn(formattedMessage, context);
  }

  debug(message: any, context?: string): any {
    const formattedMessage = this.formatMessage(message);
    return super.debug(formattedMessage, context);
  }

  verbose(message: any, context?: string): any {
    const formattedMessage = this.formatMessage(message);
    return super.verbose(formattedMessage, context);
  }

  formatMessage(message: any) {
    if (typeof message === 'object' || Array.isArray(message)) {
      return `\n  ${util.inspect(message, { colors: true, depth: null })}`;
    }
    return message;
  }
}
