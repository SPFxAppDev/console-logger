import { classLogger } from './class.decorators';
import { methodLogger } from './method.decorators';
import { IClassLoggerDecoratorOptions, IMethodLoggerDecoratorOptions, IPropertyLoggerDecoratorOptions } from './options.decorators';
import { propertyLogger } from './property.decorators';

// decorator factory - which calls the corresponding decorators based on arguments passed
export const log: (options?: IMethodLoggerDecoratorOptions|IClassLoggerDecoratorOptions|IPropertyLoggerDecoratorOptions) => any = (options: IMethodLoggerDecoratorOptions|IClassLoggerDecoratorOptions|IPropertyLoggerDecoratorOptions = null): any => {

    const factoryFunction: (...args: any[]) => any = (...args: any[]): any => {
        switch (args.length) {
            case 3: // can be method or property decorator
                if (typeof args[2] === 'number' || typeof args[2] === 'undefined') {
                    return propertyLogger(options).apply(this, args);
                }
                return methodLogger(options).apply(this, args);
            case 2: // parameter decorator
                return propertyLogger(options).apply(this, args);
            case 1: // class decorator
                // return classLogger.apply(this, args);
                return classLogger(options).apply(this, args);
            default: // invalid size of arguments
                throw new Error('Not a valid decorator');
        }
    };

    return factoryFunction;
};