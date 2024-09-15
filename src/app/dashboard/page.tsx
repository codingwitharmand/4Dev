'use client';
import Image from "next/image";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react"
import {redirect} from "next/navigation";
import ButtonDefault from "@/components/button";

export default function Page() {
    const {data: session}: any = useSession();

    if (!session) {
        redirect('/')
    }
    const avatar = session?.user?.image || '/avatar.webp';
    const greetName = session?.user?.name || '';

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center w-full my-4">
                <Image src={avatar} width={100} height={100} alt="Welcome" className="rounded-full"/>
            </div>
            <div className="flex flex-col items-center">
                <h1>Welcome {greetName}</h1>
                <ButtonDefault redirect="/dashboard/profile">
                    Settings
                </ButtonDefault>
                <ButtonDefault onClick={(e) => {
                    e.preventDefault();
                    signOut();
                }}>Logout</ButtonDefault>
            </div>
        </div>
    )
}