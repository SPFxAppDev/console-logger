// import { Logger, ILoggerSettings, LogLevel, IClassLogger, log } from '@spfxappdev/logger';
import { Logger, ILoggerSettings, LogLevel, IClassLogger, log, LogType } from '../../src/index';


class TestApp {
    private logger: Logger;

    constructor() {
        this.logger = new Logger("spfxAppDev");
    }

    public doThings(): void {
        this.logger.log("doThings START");
        this.logger.log("Hello World");
        this.logger.log("doThings END");
    }

    public doThingsWithParam(a: string, b: number): void {
        this.logger.log("doThingsWithParam START", a, b);
        this.logger.log("Hello World");
        this.logger.log("doThingsWithParam END", a, b);
    }

    public examples(): void {
        this.logger.log("Welcome to @spfxappdev/logger");
        this.logger.warn("Welcome to @spfxappdev/logger");
        this.logger.info("Welcome to @spfxappdev/logger");
        this.logger.error("Welcome to @spfxappdev/logger");
        this.logger.table(["Welcome to @spfxappdev/logger"]);
    }
}

const myLoggerSettings: ILoggerSettings = {
    LogNamespaceUrlParameterName: 'LogOnlyMy',
    LoggingEnabledUrlParameterName: 'EnableLogging',
    LogLevel: LogLevel.Log
}

Logger.DefaultSettings = myLoggerSettings;

const t: TestApp = new TestApp();
t.doThings();
t.doThingsWithParam("Hello console logger number", 1);
t.examples();

//For Intellisense with the @classLogger(), use this:
interface TestAppWithDecorators extends IClassLogger { }
     

@log({
    customLogCategory: "myCustomLoggingCategory",
    override: false
})
class TestAppWithDecorators {

    @log()
    public myProp: string = "";

    @log()
    public doThings(): void {
        this.logger.log("Hello World");
    }

    @log()
    public doThingsWithParam(a: string, b: number): void {
        this.logger.log("doThingsWithParam START", a, b);
        this.logger.log("Hello World");
        this.logger.log("doThingsWithParam END", a, b);
    }

    @log()
    public examples(): void {
        this.myProp = "Welcome to @spfxappdev/logger";
        this.logger.log(this.myProp);
        this.logger.warn(this.myProp);
        this.logger.info(this.myProp);
        this.logger.error(this.myProp);
        this.logger.table([this.myProp]);
    }

    public getLogSettings(): ILoggerSettings {
        return {
            LogNamespaceUrlParameterName: 'LogOnly',
            LoggingEnabledUrlParameterName: 'EnableConsoleLogging',
            LogLevel: LogLevel.Log,
        };
    }
}

const t2: TestAppWithDecorators = new TestAppWithDecorators();
t2.doThings();
t2.doThingsWithParam("Hello console logger number", 1);
t2.examples();
console.log({...{
    LogNamespaceUrlParameterName: 'LogOnly',
    LoggingEnabledUrlParameterName: 'EnableConsoleLogging',
    LogLevel: LogLevel.None
}, ...Logger.DefaultSettings, ...{ LogLevel: LogLevel.Error, LogNamespaceUrlParameterName: "L" }});
console.log(Logger.DefaultSettings);

//console.log(t2 instanceof TestAppWithDecorators);

// console.log(isset((undefined)));
// const arr = [{a: 1, b: 2}, {a: 2, b: 1}];
// console.log(isset((arr)));
// console.log(arr.FirstOrDefault(i => i.a == 1));
// console.log("a".Equals("A"));

// const myLogLevel: LogLevel = LogLevel.Error | LogLevel.Log;

// console.log("GeneralEnabled", !(LogLevel.None == (myLogLevel | LogLevel.None)), myLogLevel);
// console.log("Enabled by Level", LogLevel.Table == (myLogLevel & LogLevel.Table), myLogLevel);
// console.log(typeof myLogLevel);