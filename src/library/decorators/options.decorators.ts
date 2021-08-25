import { IConsoleLoggingEnabled } from '../Logger';

export interface ILoggerDecoratorOptions {
    customLogCategory?: string;
    enableConsoleLogging?: IConsoleLoggingEnabled;
}

export interface IClassLoggerDecoratorOptions extends ILoggerDecoratorOptions {
    override?: boolean;
}

export interface IMethodLoggerDecoratorOptions extends ILoggerDecoratorOptions {
}

export interface IPropertyLoggerDecoratorOptions extends ILoggerDecoratorOptions {
}