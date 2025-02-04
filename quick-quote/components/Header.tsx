import Link from "next/link"
import { UserButton, SignInButton, useUser, useAuth } from "@clerk/nextjs"

export default function Header() {
    const { isSignedIn, userId } = useAuth()

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    QuickQuote
                </Link>
                <div className="flex items-center space-x-4">
                    {isSignedIn ? (
                        <>
                            <Link href="/admin" className="text-gray-600 hover:text-blue-600">
                                Admin Portal
                            </Link>
                            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
                                Dashboard
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                        </>
                    ) : (
                        <SignInButton mode="modal">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign In</button>
                        </SignInButton>
                    )}
                </div>
            </nav>
        </header>
    )
}

