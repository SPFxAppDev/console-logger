import { LogType, ILoggerSettings } from './Logger';

export interface ILogger {
    /**
     * Log's the provided data in the Console under the loggingCategory of the Module.
     * @param data The data to Log in the Console.
     * @param logType The Type of Logging (Warning, Info, Error, Table or Log).
     */
    log(logType: LogType, ...data: any[]): void;

    getLogCategory(): string;

    getLogSettings(): ILoggerSettings;
}