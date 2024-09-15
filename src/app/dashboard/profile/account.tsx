'use client';

import ButtonDefault from "@/components/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import InputDefault from "@/components/input";

const AccountComponent = () => {
    const [data, setData] = useState<any>(null);
    const [edit, setEdit] = useState(true);
    const [errorList, setErrorList] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/profile');
            const { user } = await res.json();
            setData(user);
        })();
    }, []);

    const updateProfile = async () => {
        if (errorList.length) return;

        const res = await fetch('/api/profile', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (res.ok) {
            setEdit(!edit);
        }
    }

    return data && (
        <div className="p-2">
            <h2 className="text-3xl py-5">Account</h2>
            <hr />
            <div className="mt-2 pb-2">
                <div className="xl:w-2/3">
                    General
                    <hr />
                    <InputDefault
                        label="Name"
                        value={data.name}
                        placeholder="Name"
                        onChange={(e) => {
                            const error = "Name must be at least 3 characters long.";
                            if (!e.target.value || e.target.value.length < 3) {
                                if (!errorList.includes(error))
                                    setErrorList(prev => [...prev, error]);
                                return;
                            } else {
                                setErrorList(prev => prev.filter(e => e !== error));
                            }
                            setData({ ...data, name: e.target.value });
                        }}
                    />
                    <InputDefault
                        type="text"
                        label="email"
                        value={data.email}
                        placeholder="Email"
                        onChange={(e) => {
                            const error = "Invalid email.";
                            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                            if (!e.target.value || !emailRegex.test(e.target.value)) {
                                if (!errorList.includes(error))
                                    setErrorList(prev => [...prev, error]);
                                return;
                            } else {
                                setErrorList(prev => prev.filter(e => e !== error));
                            }
                            setData({ ...data, email: e.target.value });
                        }}
                    />
                </div>
            </div>
            {errorList.length ? <p className="text-red-500">Error: <hr className="border-red-500" /> {errorList.map(e => (<>{e} <br /></>))} <br /></p> : ""}
            <ButtonDefault
                className={!errorList.length ? "" : "bg-red-500 border-red-500 hover:bg-red-500"}
                onClick={updateProfile}>
                {edit ? "Edit" : "Update profile"}
            </ButtonDefault>
        </div>
    )
};

export default AccountComponent;