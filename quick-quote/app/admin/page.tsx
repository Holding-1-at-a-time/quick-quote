import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import AdminDashboard from "../components/AdminDashboard"
import ErrorBoundary from "../components/ErrorBoundary"

export default function AdminPortal() {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    return (
        <ErrorBoundary>
            <div className="space-y-8">
                <h1 className="text-3xl font-bold">Admin Portal</h1>
                <AdminDashboard />
            </div>
        </ErrorBoundary>
    )
}

