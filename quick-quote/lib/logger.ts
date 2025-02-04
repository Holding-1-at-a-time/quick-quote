type LogLevel = "info" | "warn" | "error"

export const logger = {
    log: (level: LogLevel, message: string, meta?: unknown) => {
        const timestamp = new Date().toISOString()
        const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`

        switch (level) {
            case "info":
                console.log(logMessage, meta)
                break
            case "warn":
                console.warn(logMessage, meta)
                break
            case "error":
                console.error(logMessage, meta)
                break
        }

        // In a production environment, you might want to send logs to a service like Sentry or Loggly
        // sendToLogService(level, message, meta);
    },
    info: (message: string, meta?: any) => logger.log("info", message, meta),
    warn: (message: string, meta?: any) => logger.log("warn", message, meta),
    error: (message: string, meta?: any) => logger.log("error", message, meta),
}

