import { LogType, LogLevel, Logger } from '../Logger';
import { getLogCategoryOrCustom, logFunc as logFuncUtil } from './decorators.utility';
import { IMethodLoggerDecoratorOptions } from './options.decorators';

const defaultOptions: IMethodLoggerDecoratorOptions = {
    customLogCategory: null,
    logLevel: null
};

export const methodLogger: (options: IMethodLoggerDecoratorOptions) => any = (options: IMethodLoggerDecoratorOptions = null): any => {

    options = {...defaultOptions, ...options};
    
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): any => {

        const originalMethod: any = descriptor.value!;

        descriptor.value = function(): any {
            
            
            let logLevel: LogLevel = options.logLevel;
            const loggingCategory: string = getLogCategoryOrCustom(target, options.customLogCategory, propertyKey);
            let containsLogLevel: boolean = typeof logLevel !== 'undefined' && logLevel !== null;
            let targetContainsGetLogSettings: boolean = typeof target["getLogSettings"] == "function";
            if(!containsLogLevel && targetContainsGetLogSettings) {
                const settings = target["getLogSettings"]();
                if(settings && typeof settings["LogLevel"] == "number") {
                    logLevel = settings["LogLevel"];
                    containsLogLevel = true;
                }
            }

            logLevel = containsLogLevel ? logLevel : Logger.DefaultSettings.LogLevel;

            const logFunc: (logType: LogType, ...logData: any[]) => void = (logType: LogType, ...logData: any[]): void => {
                logFuncUtil(target, logLevel, loggingCategory, logType, ...logData);
            };

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