import { ILoggerSettings, Logger, LogType } from './Logger';
import { IClassLogger } from './IClassLogger';

/**
* A Base Class for Console Logger
* For Intellisense with the @classLogger(), use this:
* @example export interface MyClass extends ClassLoggerBase {}; export class MyClass;
*/
export abstract class ClassLoggerBase implements IClassLogger {

    public logger: Logger;

    constructor() {
        this.assignLogger();
    }

    public log(logType: LogType, ...data: any[]): void {
        this.logger.logToConsole(logType, ...data);
    }

    public getLogCategory(): string {
        return 'SPFxAppDev Logger BASE';
    }

    public getLogSettings(): ILoggerSettings {
        return {...{}, ...Logger.DefaultSettings };
    }

    private assignLogger(): Logger {
        if(!this.logger) {
            const loggingSettings: ILoggerSettings = this.getLogSettings();
            this.logger = new Logger(this.getLogCategory(), loggingSettings);
        }

        return this.logger;        
    }
}