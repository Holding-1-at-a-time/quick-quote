"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { useUser } from "@clerk/nextjs"
import LoadingSpinner from "../LoadingSpinner"

export default function ImageUpload() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const uploadImage = useMutation(api.images.upload)
    const { user } = useUser()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file || !user) return

        setUploading(true)
        try {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = async () => {
                const base64 = reader.result as string
                await uploadImage({ tenantId: user.publicMetadata.tenantId as string, image: base64 })
                setFile(null)
                setUploading(false)
            }
        } catch (error) {
            console.error("Error uploading image:", error)
            setUploading(false)
        }
    }

    return (
        <div>
        <form onSubmit= {handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Upload Vehicle Image
                </label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
                />
            </div>
            <button
                type="submit"
                disabled={!file || uploading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {uploading ? <LoadingSpinner /> : "Upload Image"}
            </button>
        </form>
        </div>
    )
}

