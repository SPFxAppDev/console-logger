import { LogType, Logger, LogLevel, ILoggerSettings } from '../Logger';

export const logFunc: (target: any, logLevel: LogLevel, loggingCategory: string, logType: LogType, ...logData: any[]) => void =
(target: any, logLevel: LogLevel, loggingCategory: string, logType: LogType, ...logData: any[]): void => {
    const containsLogger: boolean = typeof target['logger'] === 'object'; // && (target as any).getLogger() instanceof Logger;
    let loggingSettings: ILoggerSettings = containsLogger ? (target as any).logger.getCurrentSettings() : {...{}, ...Logger.DefaultSettings};
    loggingSettings.LogLevel = logLevel;
    const logger: Logger = new Logger(loggingCategory, loggingSettings);
    logger.logToConsole(logType, ...logData);
};

export const getLogCategoryOrCustom: (target: any, customLogCategory?: string, fallbackValue?: string) => any = (target: any, customLogCategory: string = null, fallbackValue: string = '') => {
    let loggingCategory: string = '';
    
    if (typeof customLogCategory === 'string') {
        loggingCategory = customLogCategory;
    } else {
        const containsLoggingCategory: boolean = typeof target['getLogCategory'] === 'function' && typeof (target as any).getLogCategory() === 'string';
        // console.log("SSC", typeof target['getLogCategory'], (" loggingCategory: " +loggingCategory.slice(0) ), (" customLogCategory: " + customLogCategory));
        loggingCategory = containsLoggingCategory ? (target as any).getLogCategory() : fallbackValue;
    }

    return loggingCategory;
};

export const getLogSettings: () => ILoggerSettings = (): ILoggerSettings => {
    return Logger.DefaultSettings;
};