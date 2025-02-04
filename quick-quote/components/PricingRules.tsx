"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
export default function PricingRules() {
    const { user } = useUser()
    const tenantId = user?.publicMetadata.tenantId as string
    const pricingRules = useQuery(api.pricingRules.getByTenant, { tenantId }) || {}
    const updatePricingRules = useMutation(api.pricingRules.update)

    const [rules, setRules] = useState(pricingRules.data || {}) //Fixed: Initialize with data from pricingRules

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setRules((prevRules: Record<string, number>) => {
            // Ensure prevRules is an object, default to empty object if not
            const currentRules = prevRules || {}
            return { ...currentRules, [name]: Number.parseFloat(value) }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updatePricingRules({ tenantId, rules })
            alert("Pricing rules updated successfully")
        } catch (error) {
            console.error("Error updating pricing rules:", error)
            alert("Failed to update pricing rules")
        }
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Pricing Rules</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="laborRate" className="block text-sm font-medium text-gray-700">
                        Labor Rate ($/hour)
                    </label>
                    <input
                        type="number"
                        id="laborRate"
                        name="laborRate"
                        value={rules.laborRate || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="partMarkup" className="block text-sm font-medium text-gray-700">
                        Part Markup (%)
                    </label>
                    <input
                        type="number"
                        id="partMarkup"
                        name="partMarkup"
                        value={rules.partMarkup || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Update Pricing Rules
                </button>
            </form>
        </div>
    )
}
