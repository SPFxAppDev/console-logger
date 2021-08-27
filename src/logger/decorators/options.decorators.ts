import { LogLevel } from '../Logger';

export interface ILoggerDecoratorOptions {
    customLogCategory?: string;
    logLevel?: LogLevel;
}

export interface IClassLoggerDecoratorOptions extends ILoggerDecoratorOptions {
    override?: boolean;
}

export interface IMethodLoggerDecoratorOptions extends ILoggerDecoratorOptions {
}

export interface IPropertyLoggerDecoratorOptions extends ILoggerDecoratorOptions {
}