import { SignedIn, SignedOut, UserButton, SignUpButton, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
    return (
        <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b drop-shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center">
            <Link href="/" className="flex items-center gap-x-4 text-4xl font-medium text-white ">
                {/* <Image
                    src={"/logo.jpeg"}
                    alt=".."
                    height={30}
                    width={30} /> */}
                    ‟Quotify„
            </Link>
            <div className="ml-auto flex items-center gap-x-2">
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 30,
                                width: 30,
                            }
                        }
                    }}
                />

                <SignedIn>
                    <div className="flex gap-x-1 items-center">
                        <Link href="/profile">
                            <Button size={"sm"}>Profile</Button>
                        </Link>

                        <Link href="/topics">
                            <Button variant="secondary" size="sm">Topics</Button>
                        </Link>
                    </div>

                </SignedIn>

                <SignedOut>
                    <SignInButton mode="modal">
                        <Button size={"sm"} variant={"outline"}>Sign In</Button>
                    </SignInButton>

                    <SignUpButton mode="modal">
                        <Button size={"sm"}>Get Started</Button>
                    </SignUpButton>
                </SignedOut>
            </div>
        </nav>
    );
};