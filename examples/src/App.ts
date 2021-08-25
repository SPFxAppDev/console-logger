import { Logger, ILoggerSettings, log } from '@spfxappdev/logger';
import { ILogger } from '@spfxappdev/logger/lib/library/ILogger';
// import { Logger, ILoggerSettings } from '../../src/index';
// import { log } from '../../src/library/decorators/logFactory.decorators';
// import { LoggerBase } from '../../src/library/LoggerBase';
// import { ILogger } from '../../src/library/ILogger';

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
    LoggingEnabled: {
        EnableAll: false,
        EnableError: true,
        EnableInfo: false,
        EnableLog: false,
        EnableTable: false,
        EnableWarn: true
    }
}

Logger.DefaultSettings = myLoggerSettings;

const t: TestApp = new TestApp();
t.doThings();
t.doThingsWithParam("Hello console logger number", 1);
t.examples();

//For Intellisense with the @classLogger(), use this:
interface TestAppWithDecorators extends ILogger { }
     

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
            LoggingEnabled: {
                EnableAll: false,
                EnableError: true,
                EnableInfo: false,
                EnableLog: true,
                EnableTable: false,
                EnableWarn: true
            }
        };
    }
}

const t2: TestAppWithDecorators = new TestAppWithDecorators();
t2.doThings();
t2.doThingsWithParam("Hello console logger number", 1);
t2.examples();
console.log(t2 instanceof TestAppWithDecorators);
