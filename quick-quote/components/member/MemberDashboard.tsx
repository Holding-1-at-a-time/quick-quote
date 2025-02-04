"use client"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import MemberQuotes from "./MemberQuotes"
import ErrorBoundary from "../ErrorBoundary"
import LoadingSpinner from "../LoadingSpinner"

export default function MemberDashboard() {
    const { user } = useUser()
    const tenantId = user?.publicMetadata.tenantId as string

    const quotes = useQuery(api.quotes.listByTenant, { tenantId })

    if (!quotes) {
        return <LoadingSpinner />
    }

    return (
        <ErrorBoundary>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Member Dashboard</h1>
                <MemberQuotes quotes={quotes} />
            </div>
        </ErrorBoundary>
    )
}

