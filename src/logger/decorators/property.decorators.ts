import { LogType, LogLevel, Logger } from '../Logger';
import { getLogCategoryOrCustom, logFunc as logFuncUtil } from './decorators.utility';
import { IPropertyLoggerDecoratorOptions } from './options.decorators';

const defaultOptions: IPropertyLoggerDecoratorOptions = {
    customLogCategory: null,
    logLevel: null
};

export const propertyLogger: (options?: IPropertyLoggerDecoratorOptions) => any = (options: IPropertyLoggerDecoratorOptions = null): any => {

    options = {...defaultOptions, ...options};

    return (target: Object, propertyName: string) => {
        
        let logLevel: LogLevel = options.logLevel;
        let containsLogLevel: boolean = typeof logLevel !== 'undefined' && logLevel !== null;

        const logFunc: (currentInstance: Object, logType: LogType, ...logData: any[]) => void = (currentInstance: Object, logType: LogType, ...logData: any[]): void => {
            
            let loggingCategory: string = getLogCategoryOrCustom(currentInstance, options.customLogCategory, `${target.constructor['name']}.${propertyName}`);
            
            let targetContainsGetLogSettings: boolean = typeof currentInstance["getLogSettings"] == "function";
            if(!containsLogLevel && targetContainsGetLogSettings) {
                const settings = currentInstance["getLogSettings"]();
                if(settings && typeof settings["LogLevel"] == "number") {
                    logLevel = settings["LogLevel"];
                    containsLogLevel = true;
                }
            }
            logFuncUtil(target, logLevel, loggingCategory, logType, ...logData);
        };

        // property value
        let _val: any = (target as any)[propertyName];

        // property getter method
        const getter: any = () => {
            logFunc(target, LogType.Log, `Get: ${propertyName} => ${_val}`);
            return _val;
        };

        // property setter method
        const setter: any = newVal => {
            logFunc(target, LogType.Log, `Set: ${propertyName} => ${newVal}`);
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