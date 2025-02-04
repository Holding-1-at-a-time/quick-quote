"use client"

import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { GenericId } from "convex/values"
import React from "react"
import { useState } from "react"
/**
 * ImageUpload component allows users to upload an image file.
 * 
 * This component manages the state of the selected file and the uploading process.
 * It uses a file input to select an image and a submit button to upload the image.
 * The image is read as a data URL and uploaded using a mutation from the Convex API.
 * 
 * State:
 * - `file`: Stores the selected file object or null if no file is selected.
 * - `uploading`: Boolean indicating whether the upload process is ongoing.
 * 
 * Functions:
 * - `handleFileChange`: Updates the `file` state when a new file is selected.
 * - `handleSubmit`: Handles the form submission, reads the file as a data URL,
 *   and uploads it using the `uploadImage` mutation.
 * 
 * UI Elements:
 * - A file input for selecting an image.
 * - A submit button that triggers the upload process.
 * 
 * The submit button is disabled if no file is selected or if an upload is in progress.
 */
export default function ImageUpload() {
    const { user } = useUser()
    const tenantId = user?.publicMetadata.tenantId as string

    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0]

            // Validate file type and size
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
            const maxSize = 5 * 1024 * 1024 // 5MB

            if (!allowedTypes.includes(selectedFile.type)) {
                setError('Invalid file type. Please upload a JPEG, PNG, or GIF.')
                return
            }

            if (selectedFile.size > maxSize) {
                setError('File is too large. Maximum size is 5MB.')
                return
            }

            setFile(selectedFile)
            setError(null)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!file) {
            setError('Please select a file to upload.')
            return
        }

        if (!tenantId) {
            setError('Tenant ID is required for upload.')
            return
        }

        setUploading(true)
        setError(null)

        try {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = async () => {
                try {
                    const base64Image = reader.result as string
                    const binary = atob(base64Image.split(',')[1])
                    const arrayBuffer = Uint8Array.from(binary, (char) => char.charCodeAt(0)).buffer

                    const response = await api.images.uploadImage({
                        tenantId: Id<"tenants">(tenantId),
                        url: base64Image,
                        name: file.name,
                        image: arrayBuffer,
                    });

                    if (!uploading) {
                        setError('Upload mutation is not available.')
                        setUploading(false)
                        return
                    }

                    try {
                        const response = await ({
                            tenantId: Id<"tenants">(tenantId),
                            url: base64Image,
                            name: file.name,
                            image: arrayBuffer,
                        })

                        if (!response) {
                            setError('No response from server.')
                        } else {
                            console.log(response)
                            // Reset form after successful upload
                            setFile(null)
                            setUploading(false)
                            // Optional: Add a success notification
                            alert('Image uploaded successfully!')
                        }
                    } catch (uploadError) {
                        setError('Failed to upload image. Please try again.')
                        setUploading(false)
                        console.error(uploadError)
                    }

                    console.log(response)

                    // Reset form after successful upload
                    setFile(null)
                    setUploading(false)

                    // Optional: Add a success notification
                    alert('Image uploaded successfully!')
                } catch (uploadError) {
                    setError('Failed to upload image. Please try again.')
                    setUploading(false)
                    console.error(uploadError)
                }
            }
        } catch (error) {
            setError('An unexpected error occurred.')
            setUploading(false)
            console.error(error)
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="image-upload"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!file || uploading}
                    className={`w-full py-2 px-4 rounded-md text-white font-semibold 
                        ${!file || uploading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
            </form>
        </div>
    )
}

function Id<T>(tenantId: string): import("convex/values").GenericId<"tenants"> {
    throw new Error("Function not implemented.")
}

