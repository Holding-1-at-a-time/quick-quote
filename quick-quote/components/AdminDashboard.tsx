"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import QuoteList from "./QuoteList"
import ClientList from "./ClientList"
import ImageUpload from "./ImageUpload"
import PricingRules from "./PricingRules"
import NotificationSettings from "./NotificationSettings"
import { api } from "@/convex/_generated/api"

export default function AdminDashboard() {
    const { user } = useUser()
    const [activeTab, setActiveTab] = useState("quotes")
    const tenantId = user?.publicMetadata.tenantId as string

    const quotes = useQuery(api.quotes.listByTenant, { tenantId })
    const clients = useQuery(api.clients.listByTenant, { tenantId })

    const tabs = [
        { id: "quotes", label: "Quotes" },
        { id: "clients", label: "Clients" },
        { id: "upload", label: "Upload Image" },
        { id: "pricing", label: "Pricing Rules" },
        { id: "notifications", label: "Notifications" },
        { id: "language", label: "Language Settings" },
    ]

    return (
        <div className="space-y-6">
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
                {activeTab === "upload" && <ImageUpload tenantId={tenantId} />}
                {activeTab === "pricing" && <PricingRules tenantId={tenantId} />}
                {activeTab === "notifications" && <NotificationSettings tenantId={tenantId} />}
            </div>
        </div>
    )
}

