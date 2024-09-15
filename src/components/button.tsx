'use client';

import { useRouter } from "next/navigation";

const ButtonDefault = (props: { children: string; onClick?: (e: any) => void; redirect?: string, className?: string }) => {
    const router = useRouter();

    return (
        <button
            className={`rounded-[5px] border-2 border-white px-12 py-2 w-full hover:bg-primary hover:border-black ${props.className || ""}`}
            style={{ transitionDuration: '250ms' }}
            onClick={props.onClick ? props.onClick : () => {
                if (props.redirect) {
                    router.push(props.redirect);
                }
            }}
        >
            {props.children}
        </button>
    );
};

export default ButtonDefault;