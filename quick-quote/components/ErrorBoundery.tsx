"use client"

import React, { type ErrorInfo, type ReactNode } from "react"

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <h2 className="text-lg font-semibold mb-2">Oops! Something went wrong.</h2>
                    <p>
                        We&apos;re sorry, but there was an error. Please try refreshing the page or contact support if the problem
                        persists.
                    </p>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary

