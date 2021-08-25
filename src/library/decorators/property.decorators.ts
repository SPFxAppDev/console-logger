import { LogType, IConsoleLoggingEnabled, Logger } from '../Logger';
import { getLogCategoryOrCustom, logFunc as logFuncUtil } from './decorators.utility';
import { IPropertyLoggerDecoratorOptions } from './options.decorators';

const defaultOptions: IPropertyLoggerDecoratorOptions = {
    customLogCategory: null,
    enableConsoleLogging: null
};

export const propertyLogger: (options?: IPropertyLoggerDecoratorOptions) => any = (options: IPropertyLoggerDecoratorOptions = null): any => {

    options = {...defaultOptions, ...options};

    return (target: Object, propertyName: string) => {

        let enableConsoleLogging: IConsoleLoggingEnabled = options.enableConsoleLogging || Logger.DefaultSettings.LoggingEnabled;
        const loggingCategory: string = getLogCategoryOrCustom(target, options.customLogCategory, `${target.constructor['name']}.${propertyName}`);

        const logFunc: (logType: LogType, ...logData: any[]) => void = (logType: LogType, ...logData: any[]): void => {
            logFuncUtil(target, enableConsoleLogging, loggingCategory, logType, ...logData);
        };

        const containsLoggingEnabled: boolean = typeof enableConsoleLogging !== 'undefined' && enableConsoleLogging !== null;
        enableConsoleLogging = containsLoggingEnabled ? enableConsoleLogging : Logger.DefaultSettings.LoggingEnabled;

        // property value
        let _val: any = (target as any)[propertyName];

        // property getter method
        const getter: any = () => {
            logFunc(LogType.Log, `Get: ${propertyName} => ${_val}`);
            return _val;
        };

        // property setter method
        const setter: any = newVal => {
            logFunc(LogType.Log, `Set: ${propertyName} => ${newVal}`);
            _val = newVal;
        };

        // Delete property.
        if (delete ((target as any)[propertyName])) {

            // Create new property with getter and setter
            Object.defineProperty(target, propertyName, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    };
};