"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import QuoteList from "./QuoteList"
import ClientList from "./ClientList"
import Settings from "./Settings"
import UserManagement from "./UserManagement"
import PredictiveAnalytics from "./PredictiveAnalytics"

export default function AdminDashboard() {
    const { user } = useUser()
    const [activeTab, setActiveTab] = useState("quotes")
    const tenantId = user?.publicMetadata.tenantId as string

    const quotes = useQuery(api.quotes.listByTenant, { tenantId })
    const clients = useQuery(api.clients.listByTenant, { tenantId })

    const tabs = [
        { id: "quotes", label: "Quotes" },
        { id: "clients", label: "Clients" },
        { id: "users", label: "User Management" },
        { id: "analytics", label: "Analytics" },
        { id: "settings", label: "Settings" },
    ]

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${activeTab === tab.id
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-6">
                {activeTab === "quotes" && <QuoteList quotes={quotes || []} />}
                {activeTab === "clients" && <ClientList clients={clients || []} />}
                {activeTab === "users" && <UserManagement />}
                {activeTab === "analytics" && <PredictiveAnalytics />}
                {activeTab === "settings" && <Settings tenantId={tenantId} />}
            </div>
        </div>
    )
}

