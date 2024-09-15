'use client';

import ButtonDefault from "@/components/button";
import { useEffect, useRef, useState } from "react";
import InputDefault from "@/components/input";

interface Skill {
    name: string;
}

const ProfileComponent = () => {
    const [data, setData] = useState<any>(null);
    const [editing, setEditing] = useState(false);
    const [errorList, setErrorList] = useState<string[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);

    // Get user's data
    useEffect(() => {
        (async () => {
            const res = await fetch('/api/profile');
            const { user } = await res.json();
            setData(user);
            setSkills(user?.profile?.skills || []);
        })();
    }, []);

    /**
     * Update user's profile
     * @returns void
     */
    const updateProfile = async () => {
        if (errorList.length) return;

        setEditing(true);
        const res = await fetch('/api/profile', {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                profile: {
                    ...data.profile,
                    skills: skills
                }
            })
        });

        if (res.ok) setEditing(false);
    }

    return data && (
        <div className="p-2">
            <h2 className="text-3xl py-5">Public profile</h2>
            <hr />
            <div className="mt-2 pb-2">
                <div className="xl:w-2/3">
                    General
                    <hr />
                    <InputDefault
                        type="text"
                        label="Username"
                        onChange={(e) => {
                            const regex = /^[a-zA-Z0-9_]{3,}(?<!_)$/;
                            const username = e.target.value;
                            const error = "Username must be at least 3 characters long and contain only letters, numbers, and underscores.";
                            if (!username) return setErrorList(prev => prev.filter(e => e !== error));

                            if (!regex.test(username)) {
                                if (!errorList.includes(error))
                                    setErrorList(prev => [...prev, error]);
                                return;
                            } else setErrorList(prev => prev.filter(e => e !== error));

                            setData({ ...data, username: username});
                        }}
                        value={data.username}
                    />
                    <div className="my-2 max-w-[425px] flex flex-col">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            name="bio"
                            id="bio"
                            className="w-full min-h-[40px] h-[70px] max-h-[170px] p-2 border border-white rounded bg-black outline-none placeholder:text-sm text-sm"
                            placeholder="Your bio..."
                            onChange={(e) => {
                                const error = "Bio must be at most 200 characters long.";
                                const value = e.target.value.trim();
                                if (value.length > 200) {
                                    if (!errorList.includes(error))
                                        setErrorList(prev => [...prev, error]);
                                    return;
                                } else setErrorList(prev => prev.filter(e => e !== error));

                                setData({
                                    ...data,
                                    profile: {
                                        ...data.profile,
                                        bio: value
                                    }
                                });
                            }}>
                            {data.profile && data.profile.bio}
                        </textarea>
                    </div>
                    Links
                    <hr />
                    <InputDefault
                        label="Portfolio"
                        value={data.profile?.portfolioUrl || ""}
                        placeholder="https://"
                        onChange={(e) => {
                            const link = e.target.value;
                            setData({
                                ...data,
                                profile: {
                                    ...data.profile,
                                    portfolioUrl: link.startsWith("http") ? link : `https://${link}`
                                }
                            });
                        }}
                    />
                    <InputDefault
                        label="Github"
                        value={data.profile?.githubUrl || ""}
                        placeholder="https://github.com/username"
                        onChange={(e) => {
                            const link = e.target.value;
                            const error = "Invalid Github link.";
                            const regex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+(\/)?$/;
                            if (!link) {
                                setErrorList(prev => prev.filter(e => e !== error))
                                return setData({
                                    ...data,
                                    profile: {
                                        ...data.profile,
                                        githubUrl: ""
                                    }
                                });
                            }

                            if (!regex.test(link)) {
                                if (!errorList.includes(error))
                                    setErrorList(prev => [...prev, error]);
                                return;
                            } else setErrorList(prev => prev.filter(e => e !== error));

                            setData({
                                ...data,
                                profile: {
                                    ...data.profile,
                                    githubUrl: link.startsWith("https://") ? link : `https://${link}`
                                }
                            });
                        }}
                    />
                    <InputDefault
                        label="Linkedin"
                        value={data.profile?.linkedinUrl || ""}
                        placeholder="https://www.linkedin.com/in/*****"
                        onChange={(e) => {
                            const link = e.target.value;
                            const error = "Invalid Linkedin link.";
                            const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+(\/)?$/;
                            if (!link) {
                                setErrorList(prev => prev.filter(e => e !== error))
                                return setData({
                                    ...data,
                                    profile: {
                                        ...data.profile,
                                        linkedinUrl: ""
                                    }
                                });
                            }

                            if (!regex.test(link)) {
                                if (!errorList.includes(error))
                                    setErrorList(prev => [...prev, error]);
                                return;
                            } else setErrorList(prev => prev.filter(e => e !== error));

                            setData({
                                ...data,
                                profile: {
                                    ...data.profile,
                                    linkedinUrl: link.startsWith("https://") ? link : `https://${link}`
                                }
                            });
                        }}
                    />
                    <div className="flex max-w-[425px] my-5">
                        <label htmlFor="public">Private</label>
                        <input
                            className="ml-auto w-5 bg-black"
                            type="checkbox"
                            name="public"
                            id="public"
                            defaultChecked={!data.profile?.public}
                            onChange={(e) => {
                                const error = "Username must be set to make profile public.";

                                if (!data.profile?.username) {
                                    if (!errorList.includes(error))
                                        setErrorList(prev => [...prev, error]);
                                    e.target.checked = true
                                    return;
                                } else setErrorList(prev => prev.filter(e => e !== error));

                                setData({
                                    ...data,
                                    profile: {
                                        ...data.profile,
                                        public: !e.target.checked
                                    }
                                });
                            }}
                        />
                    </div>
                    Skills
                    <hr />
                    <div className="flex flex-wrap flex-col">
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <div key={i} 
                                    className="transition-1s bg-black text-white p-1 rounded px-4 border text-[12px] flex-grow text-center hover:bg-[red] cursor-pointer"
                                    style={{ transitionDuration: '250ms' }}
                                    onClick={(_) => {
                                        setSkills(prev => prev.filter(s => s.name !== skill.name));
                                    }}>
                                    {skill.name}
                                </div>
                            ))}
                        </div>

                        <InputDefault
                            label="Add skill (press enter to add)"
                            placeholder="Skill name"
                            onpressEnter={(e) => {
                                const value = e.target.value;
                                if (!value.trim()) return;

                                // Check if skill already exists
                                if (skills.find(s => s.name === value)) return;

                                setSkills(prev => [...prev, { name: value }]);
                                e.target.value = "";
                            }}
                        />
                    </div>
                </div>
            </div>
            {errorList.length ? <p className="text-red-500">Error: <hr className="border-red-500" /> {errorList.map(e => (<>{e} <br /></>))} <br /></p> : ""}
            <ButtonDefault
                className={!errorList.length ? "" : "bg-red-500 border-red-500 hover:bg-red-500"}
                onClick={updateProfile}>
                {!editing ? "Save" : "Saving.."}
            </ButtonDefault>
        </div>
    )
};

export default ProfileComponent;