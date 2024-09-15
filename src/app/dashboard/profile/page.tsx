'use client';
import ButtonDefault from "@/components/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ProfileComponent from "./profile";
import { useState } from "react";
import AccountComponent from "./account";

const Button = (props: { children: string, onclick?: () => void }) => {
    return (
        <button onClick={props.onclick} className="w-full text-start py-1 pl-2 h-[50px] overflow-hidden whitespace-nowrap flex items-center group">
            <div className="w-[8px] bg-white h-full rounded-full"></div>
            <p className="transition-border duration-300 border-l-0 h-[35px] p-1 w-full rounded-e-lg pl-3 border-2 items-center border-black flex group-hover:border-white">{props.children}</p>
        </button>
    );
};

const Page = () => {
    const { data: session }: any = useSession();
    const [selected, setSelected] = useState(<ProfileComponent />);
    if (!session) {
        return null;
    }

    // General informations
    const avatar = session?.user?.image || '/avatar.webp';
    const name = session?.user?.name || '';
    const email = session?.user?.email || '';

    return (
        <div className="p-5 flex flex-col m-auto w-11/12 sm:w-10/12">
            <div className="flex flex-col md:flex-row gap-5 pt-5 pb-5 items-center w-full">
                <Image
                    src={avatar}
                    width={64}
                    height={64}
                    alt="Profile Avatar"
                    className="rounded-full"
                />
                <div className="flex-1 text-center md:text-left">
                    <h1 className="font-semibold text-lg">
                        {name || email.split("@")[0]}{" "}
                        <span className="text-[#9198a1] text-sm">
                            {email && `(${email})`}
                        </span>
                    </h1>
                </div>
                <ButtonDefault className="mt-5 md:mt-0 ml-auto text-[14px] px-4 py-2 bg-red w-full md:w-auto min-w-[160px]">
                    Go to your public profile
                </ButtonDefault>
            </div>
            <div className="flex mt-[25px] ">
                <div className="hidden sm:block w-80 p-1 flex flex-col items-start gap-2">
                    <Button onclick={() => {setSelected(<ProfileComponent/>)}}>Public profile</Button>
                    <Button onclick={() => {setSelected(<AccountComponent/>)}}>Account</Button>
                    <Button onclick={() => setSelected(<>Example</>)} >Example</Button>
                </div>
                <div className="w-full">
                    {selected}
                </div>
            </div>
        </div>
    );
}

export default Page;