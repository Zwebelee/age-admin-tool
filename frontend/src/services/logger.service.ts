export class LoggerService {
    private static instance: LoggerService;

    private constructor() {}

    static getInstance(): LoggerService {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }


    private static readonly LOG_LEVELS = {
        LOG: 'LOG',
        INFO: 'INFO',
        WARN: 'WARN',
        ERROR: 'ERROR'
    };

    private formatMessage(level: string, message: string): string {
        const timestamp = new Date().toLocaleString();
        return `[${timestamp}] [${level}] ${message}`;
    }

    private printLog(method: (message?: unknown, ...optionalParams: unknown[]) => void, level: string, message: string, ...optionalParams: unknown[]): void {
        method(this.formatMessage(level, message), ...optionalParams);
    }

    log(message: string, ...optionalParams: unknown[]): void {
        this.printLog(console.log, LoggerService.LOG_LEVELS.LOG, message, ...optionalParams);
    }

    info(message: string, ...optionalParams: unknown[]): void {
        this.printLog(console.info, LoggerService.LOG_LEVELS.INFO, message, ...optionalParams);
    }

    warn(message: string, ...optionalParams: unknown[]): void {
        this.printLog(console.warn, LoggerService.LOG_LEVELS.WARN, message, ...optionalParams);
    }

    error(message: string, ...optionalParams: unknown[]): void {
        this.printLog(console.error, LoggerService.LOG_LEVELS.ERROR, message, ...optionalParams);
    }
}
