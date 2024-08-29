'use client';
import Image from "next/image";
import {useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function Home() {

    const router = useRouter();
    const {status: sessionStatus} = useSession();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    console.log(sessionStatus)
    useEffect(() => {
        if (sessionStatus === 'authenticated') {
            router.replace('/dashboard');
        }
    }, [sessionStatus, router]);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9.-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }

    const signInWithEmail = async () => {
        if (!isValidEmail(email)) {
            setError("Invalid email. Please enter a valid email");
            return;
        }
        const res = await signIn("email", {
            email: email,
            callbackUrl: `${window.location.origin}`,
            redirect: false
        });

        if (!res?.ok) {
            setError("An error occured while signing in.");
        }
    }

    return (
        sessionStatus !== 'authenticated' && (
            <div className="flex w-full m-20">
                <div className="flex flex-col w-1/2 p-10">
                    <h1 className="text-4xl font-bold">A social network <i className="text-primary">for
                        developers</i> 🚀
                    </h1>
                    <p className="text-lg mt-4">
                        Join community and start networking
                    </p>
                    <Image src="/code-thinking.svg" alt="" width={600} height={600} className="pt-16"></Image>
                </div>
                <div className="flex flex-col items-center justify-center w-1/2">
                    <div className="flex flex-col w-full mt-4 shadow-md rounded-md p-8">
                        <h1 className="text-5xl font-bold mb-6">Welcome Back 😊</h1>
                        <button
                            className="flex flex-row justify-center text-secondary font-bold py-2 my-4 rounded-md w-full mt-4 border-2 border-gray-300 hover:bg-color-tertiary hover:text-primary"
                            onClick={() => signIn("github")}>
                            <Image src="/github-image.png" width={20} height={20} alt="Github Logo" className="mr-2"/>
                            Sign in with Github
                        </button>
                        <div className="flex flex-row items-center justify-center w-full">
                            <hr className="border-1 w-1/6"/>
                            <span className="mx-3">or use your favourite email</span>
                            <hr className="border-1 w-1/6"/>
                        </div>
                        <div className="relative my-4">
                            <input type="email" id="email"
                                   className="border-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                                   placeholder="Your email address" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <button onClick={signInWithEmail}
                                className="bg-primary text-white hover:text-black font-bold py-3 rounded-md mt-4">Get Started
                        </button>
                        {error && <span className="text-center text-red-700 font-bold my-4">{error}</span>}
                        <div className="text-center text-sm mt-4 px-2">
                            <i>For your safety, 4Devs don&apos;t use passwords. You will receive a connection link via email.</i>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
