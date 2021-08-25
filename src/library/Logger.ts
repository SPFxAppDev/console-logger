
import { toBoolean, isset, isNullOrEmpty, getUrlParameter } from '../functions';

const logsEnabled: IConsoleLoggingEnabled = {
    EnableAll: true,
    EnableError: true,
    EnableInfo: true,
    EnableLog: true,
    EnableTable: true,
    EnableWarn: true
};

const DefaultLoggerSettings: ILoggerSettings = {
    LogNamespaceUrlParameterName: 'LogOnly',
    LoggingEnabledUrlParameterName: 'EnableConsoleLogging',
    LoggingEnabled: logsEnabled
};

export interface ILoggerSettings {
    LogNamespaceUrlParameterName: string;
    LoggingEnabledUrlParameterName: string;
    LoggingEnabled: IConsoleLoggingEnabled;
}

export enum LogType {
    Warning,
    Info,
    Error,
    Table,
    Log
}

export interface IConsoleLoggingEnabled {
    EnableAll: boolean;
    EnableLog: boolean;
    EnableInfo: boolean;
    EnableWarn: boolean;
    EnableError: boolean;
    EnableTable: boolean;
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
        const enableLog: IConsoleLoggingEnabled = this.settings.LoggingEnabled;

        return (enableLog.EnableAll || 
            enableLog.EnableError || 
            enableLog.EnableInfo || 
            enableLog.EnableLog || 
            enableLog.EnableTable || 
            enableLog.EnableWarn);
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
            this.settings = Logger.DefaultSettings;
        }
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
        const logEnabled: boolean = this.isLoggingEnabledByUrl || this.settings.LoggingEnabled.EnableAll;

        switch (logType) {
            case LogType.Warning:
                if (logEnabled || this.settings.LoggingEnabled.EnableWarn) {
                    console.warn(...valuesToLog);
                }
                break;
            case LogType.Info:
                if (logEnabled || this.settings.LoggingEnabled.EnableInfo) {
                    /* tslint:disable:no-console */
                    console.info(...valuesToLog);
                }
                break;
            case LogType.Error:
                if (logEnabled || this.settings.LoggingEnabled.EnableError) {
                    console.error(...valuesToLog);
                }
                break;
            case LogType.Table:
                if (!(logEnabled || this.settings.LoggingEnabled.EnableTable)) {
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
                if (logEnabled || this.settings.LoggingEnabled.EnableLog) {
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