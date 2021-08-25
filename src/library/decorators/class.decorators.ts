import { LogType, IConsoleLoggingEnabled, Logger, ILoggerSettings } from '../Logger';
import { IClassLoggerDecoratorOptions } from './options.decorators';
import { getLogCategoryOrCustom, logFunc as logFuncUtil, getLogSettings } from './decorators.utility';

const defaultOptions: IClassLoggerDecoratorOptions = {
    customLogCategory: null,
    enableConsoleLogging: null,
    override: true
};

//TODO: Check for generic classes MyClass<T>...

/**
* A Class logger dexorator
* For Intellisense with the @classLogger(), use this:
* @example export interface MyClass extends LoggerBase {}; export class MyClass;
*/
export const classLogger: (options: IClassLoggerDecoratorOptions) => any = (options: IClassLoggerDecoratorOptions = null): any => {

    options = {...defaultOptions, ...options};

    const classLoggerFunc: <T extends { new(...args: any[]) }>(Base: T) => any = <T extends { new(...args: any[]) }>(Base: T): any => {
        // save a reference to the original constructor
        const original: T = Base;
        const fallbackName: string = (original as any) && (original as any).name ? (original as any).name : '';

        const enableConsoleLogging: IConsoleLoggingEnabled = options.enableConsoleLogging || Logger.DefaultSettings.LoggingEnabled;
        const loggingCategory: string = getLogCategoryOrCustom(original, options.customLogCategory, fallbackName);

        const getLogCategoryFunc: () => string = (): string => {
            return getLogCategoryOrCustom(original, options.customLogCategory, fallbackName);
        };

        const logFunc: (logType: LogType, ...logData: any[]) => void = (logType: LogType, ...logData: any[]): void => {
            logFuncUtil(original, enableConsoleLogging, loggingCategory, logType, ...logData);
        };

        const logSettingsFunc: () => ILoggerSettings = (): ILoggerSettings => {
            return getLogSettings();
        };

        if (options.override) {
            original.prototype.getLogCategory = getLogCategoryFunc;
            original.prototype.log = logFunc;
            original.prototype.getLogSettings = logSettingsFunc;
        } else {
            original.prototype.getLogCategory = original.prototype.getLogCategory || getLogCategoryFunc;
            original.prototype.log = original.prototype.log || logFunc;
            original.prototype.getLogSettings = original.prototype.getLogSettings || logSettingsFunc;
        }

        // a utility function to generate instances of a class
        function construct(classConstructor: any, args: any[]): any {
            const c: any = function (): any {
                return classConstructor.apply(this, args);
            };
            c.prototype = classConstructor.prototype;
            let instanceObj = new c();
            instanceObj.logger = new Logger(instanceObj.getLogCategory(), instanceObj.getLogSettings());
            return instanceObj;
        }

        // the new constructor behaviour
        const f: any = (...args: any[]): any => {
            return construct(original, args);
        };

        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;

        // return new constructor (will override original)
        return f;
    };

    return classLoggerFunc;
};