import { ConvexError } from "convex/values"

export class AppError extends Error {
    constructor(
        message: string,
        public statusCode = 500,
        public isOperational = true,
    ) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

export function handleError(error: unknown): AppError {
    if (error instanceof AppError) {
        return error
    }

    if (error instanceof ConvexError) {
        return new AppError(error.message, 400)
    }

    if (error instanceof Error) {
        return new AppError(error.message)
    }

    return new AppError("An unexpected error occurred")
}

