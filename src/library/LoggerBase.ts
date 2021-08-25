import { ILoggerSettings, Logger, LogType } from './Logger';
import { ILogger } from './ILogger';

/**
* A Base Class for Console Logger
* For Intellisense with the @classLogger(), use this:
* @example export interface MyClass extends LoggerBase {}; export class MyClass;
*/
export abstract class LoggerBase implements ILogger {

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
        return Logger.DefaultSettings;
    }

    private assignLogger(): Logger {
        if(!this.logger) {
            const loggingSettings: any = Logger.DefaultSettings;
            loggingSettings.LoggingEnabled = this.getLogSettings();
            this.logger = new Logger(this.getLogCategory(), loggingSettings);
        }

        return this.logger;        
    }
}