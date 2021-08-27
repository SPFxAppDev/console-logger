
import { toBoolean, isset, isNullOrEmpty, getUrlParameter } from '@spfxappdev/utility';


export const enum LogLevel {
    None = 0,
    Log = 1 << 0,
    Info = 1 << 1,
    Warning = 1 << 2,
    Error = 1 << 3,
    Table = 1 << 4,
    All = ~(~0 << 5)
};

const DefaultLoggerSettings: ILoggerSettings = {
    LogNamespaceUrlParameterName: 'LogOnly',
    LoggingEnabledUrlParameterName: 'EnableConsoleLogging',
    LogLevel: LogLevel.All
};

export interface ILoggerSettings {
    LogNamespaceUrlParameterName?: string;
    LoggingEnabledUrlParameterName?: string;
    LogLevel: LogLevel;
}

export enum LogType {
    Warning,
    Info,
    Error,
    Table,
    Log
}

export class Logger {

    public static DefaultSettings: ILoggerSettings = DefaultLoggerSettings;

    private _loggingEnabledByUrl: boolean = undefined;

    private _namespacesToLog: string[] = undefined;

    private get isLoggingEnabledByUrl(): boolean {
        // URL Parameter already checked, return value from Parameter
        if(isset(this._loggingEnabledByUrl)) {
            return this._loggingEnabledByUrl;
        }

        // URL Parameter is not checked. Check and set Parameter
        let isEnabledValue: string = getUrlParameter(this.settings.LoggingEnabledUrlParameterName);

        if (!isset(isEnabledValue)) {
            this._loggingEnabledByUrl = false;
            return this._loggingEnabledByUrl;
        }

        this._loggingEnabledByUrl = toBoolean(isEnabledValue);

        return this._loggingEnabledByUrl;
    }

    private get isLoggingEnabledBySettings(): boolean {
        return !(LogLevel.None == (this.settings.LogLevel | LogLevel.None))
    }

    private get namespacesToLogFromUrl(): string[] {
        if(isset(this._namespacesToLog)) {
            return this._namespacesToLog;
        }

        const modules: string = getUrlParameter(this.settings.LogNamespaceUrlParameterName);

        if(isNullOrEmpty(modules)) {
            this._namespacesToLog = [];
            return this._namespacesToLog;
        }

        this._namespacesToLog = modules.toLowerCase().split(',');
        return this._namespacesToLog;
    }

    constructor(private logNamespace: string, private settings: ILoggerSettings = null) {
        if(!isset(settings)) {
            settings = {...{}, ...Logger.DefaultSettings};
        }

        this.settings = {...DefaultLoggerSettings, ...Logger.DefaultSettings, ...settings}
    }

    public getCurrentSettings(): ILoggerSettings {
        return {...{}, ...this.settings};
    }

    public logToConsole(logType: LogType, ...data: any[]): void {
        if (!isset(console)) {
            return;
        }

        if (!this.isLoggingEnabledBySettings && !this.isLoggingEnabledByUrl) {
            return;
        }

        //If namespaces are filtered by URL and the current namespace is NOT one of it
        if(!isNullOrEmpty(this.namespacesToLogFromUrl) && 
        this.namespacesToLogFromUrl.indexOf(this.logNamespace.toLowerCase()) < 0) {
            return;
        }

        const valuesToLog: any[] = [...data, this.logNamespace];
        const logEnabled: boolean = this.isLoggingEnabledByUrl;
        const currentLogLevel = this.settings.LogLevel;
        switch (logType) {
            case LogType.Warning:
                if (logEnabled || LogLevel.Warning == (currentLogLevel & LogLevel.Warning)) {
                    console.warn(...valuesToLog);
                }
                break;
            case LogType.Info:
                if (logEnabled || LogLevel.Info == (currentLogLevel & LogLevel.Info)) {
                    /* tslint:disable:no-console */
                    console.info(...valuesToLog);
                }
                break;
            case LogType.Error:
                if (logEnabled || LogLevel.Info == (currentLogLevel & LogLevel.Info)) {
                    console.error(...valuesToLog);
                }
                break;
            case LogType.Table:
                if (!(logEnabled || LogLevel.Table == (currentLogLevel & LogLevel.Table))) {
                    break;
                }

                if (typeof console.table !== 'function') {
                    /* tslint:disable:no-console */
                    console.info('Your browser does not support console.table, console.log was used instead', this.logNamespace);
                    console.log(...valuesToLog);
                    break;
                }

                data.forEach((d: any) => {
                    const valueType: string = typeof d;

                    if (valueType !== 'array' && valueType !== 'object') {
                    /* tslint:disable:no-console */
                        console.info('It is not possible to log table if logValue is not an array or object, console.log was used instead', this.logNamespace);
                        console.log(d, this.logNamespace);
                        return;
                    }

                    console.table(d, [this.logNamespace]);

                });
                break;
            case LogType.Log:
            default:
                if (logEnabled || LogLevel.Log == (currentLogLevel & LogLevel.Log)) {
                    console.log(...valuesToLog);
                }
                break;
        }
    }

    public log(...data: any[]): void {
        this.logToConsole(LogType.Log, ...data);
    }

    public warn(...data: any[]): void {
        this.logToConsole(LogType.Warning, ...data);
    }

    public info(...data: any[]): void {
        this.logToConsole(LogType.Info, ...data);
    }

    public error(...data: any[]): void {
        this.logToConsole(LogType.Error, ...data);
    }

    public table(...data: any[]): void {
        this.logToConsole(LogType.Table, ...data);
    }

    public static Log(logNamespace: string, logType: LogType, ...data: any[]): void {
        const logger: Logger = new Logger(logNamespace);
        switch (logType) {
            case LogType.Error:
                logger.error(...data);
                break;
            case LogType.Info:
                logger.info(...data);
                break;
            case LogType.Table:
                logger.table(...data);
                break;
            case LogType.Warning:
                logger.warn(...data);
                break;
            case LogType.Log:
            default:
                logger.log(...data);
                break;
        }
    }
}