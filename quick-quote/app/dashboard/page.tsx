"use client"

import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { useState } from "react"

export default function DashboardPage() {
    const [tenantName, setTenantName] = useState("")
    const createTenant = useMutation(api.tenants.createTenant)
    const tenants = useQuery(api.tenants.getTenants)

    const handleCreateTenant = async () => {
        if (tenantName.trim()) {
            await createTenant({ name: tenantName })
            setTenantName("")
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={tenantName}
                    onChange={(e) => setTenantName(e.target.value)}
                    placeholder="Enter tenant name"
                    className="border p-2 mr-2"
                />
                <button
                    onClick={handleCreateTenant}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Create Tenant
                </button>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Tenants</h2>
                {tenants?.map((tenant: Doc<"tenants">) => (
                    <div key={tenant._id} className="mb-2">
                        {tenant.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
