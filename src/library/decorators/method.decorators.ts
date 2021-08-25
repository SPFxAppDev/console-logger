import { LogType, IConsoleLoggingEnabled, Logger } from '../Logger';
import { getLogCategoryOrCustom, logFunc as logFuncUtil } from './decorators.utility';
import { IMethodLoggerDecoratorOptions } from './options.decorators';

const defaultOptions: IMethodLoggerDecoratorOptions = {
    customLogCategory: null,
    enableConsoleLogging: null
};

export const methodLogger: (options: IMethodLoggerDecoratorOptions) => any = (options: IMethodLoggerDecoratorOptions = null): any => {

    options = {...defaultOptions, ...options};
    
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): any => {

        const originalMethod: any = descriptor.value!;

        descriptor.value = function(): any {
            
            
            let enableConsoleLogging: IConsoleLoggingEnabled = options.enableConsoleLogging || Logger.DefaultSettings.LoggingEnabled;
            const loggingCategory: string = getLogCategoryOrCustom(target, options.customLogCategory, propertyKey);

            const logFunc: (logType: LogType, ...logData: any[]) => void = (logType: LogType, ...logData: any[]): void => {
                logFuncUtil(target, enableConsoleLogging, loggingCategory, logType, ...logData);
            };

            const containsLoggingEnabled: boolean = typeof enableConsoleLogging !== 'undefined' && enableConsoleLogging !== null;
            enableConsoleLogging = containsLoggingEnabled ? enableConsoleLogging : Logger.DefaultSettings.LoggingEnabled;

            if (arguments && arguments.length > 0) {
                logFunc(LogType.Log, [`${propertyKey} START with params`, arguments]);
            } else {
                logFunc(LogType.Log, `${propertyKey} START`);
            }

            const result: any = originalMethod.apply(this, arguments);

            if(!(result instanceof Promise)) {
                logFunc(LogType.Log, `${propertyKey} END`);
                return result;
            }

            return Promise.resolve(result).then((value) => {
                logFunc(LogType.Log, `${propertyKey} END`);
                return value;
            }).catch((error) => {
                logFunc(LogType.Error, `ERROR occurred in ${propertyKey}`);
                logFunc(LogType.Error, error);
                logFunc(LogType.Log, `${propertyKey} END`);
                return Promise.reject(error);
            });
        };
    };
};