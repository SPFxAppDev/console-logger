# @spfxappdev/logger

With this small and simple library, you can better manage your console logging. console.log() is a very often used method that also helps you a lot in the development. But there is one problem with it. It gets easily confusing and when the application goes live, you only want to output the important messages (e.g. console.warn() or console.error()). So what can be done to clean it up? Search for console.log in the code and delete it or comment it out? That doesn't have to be the case. With this library, you have your logging better under control, like a pro.

## Installation

`npm i @spfxappdev/logger`

## Usage

1. import the logger class into your project

```typescript
import { Logger } from '@spfxappdev/logger';
```

2. You can now create an instance. The first parameter is the category of the logger instance. It will be appended to all log outputs.

```typescript
const logger = new Logger("spfxAppDev");
```

3. Log to console

```typescript
logger.log("Welcome to @spfxappdev/logger");
logger.warn("Welcome to @spfxappdev/logger");
logger.info("Welcome to @spfxappdev/logger");
logger.error("Welcome to @spfxappdev/logger");
logger.table(["Welcome to @spfxappdev/logger"]);
```

4. Output in the Dev-Console
 

