import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { stat } from "fs";

const prisma = new PrismaClient();

/**
 * This function retrieves the user's profile information.
 * @param request 
 * @returns @type {NextResponse}
 * @example GET /api/profile
 */
export async function GET(request: Request) {
    /**
     * Get the user's session.
     * If the user is not authenticated, return a 401 error. (Should not happen)
     */
    const session = await getServerSession(authOptions);
    if (!session)
        return new NextResponse(null, { status: 401 });

    try {
        /**
         * Retrieve the user's information from the database.
         * Included the user's profile, projects, badges and certificates.
         * @type {User}
         */
        const user = await prisma.user.findUnique({
            where: {
                id: session.user?.id || "",
            },
            include: {
                profile: {
                    include: {
                        skills: true,
                    },
                },
                projects: true,
                badges: true,
                certificates: true,
            },
        });

        if (!user)
            return new NextResponse(null, { status: 404 });

        const { id, ...data } = user;
        return NextResponse.json({ user: data });
    } catch (error) {
        console.error(error);
        return new NextResponse(null, { status: 500 });
    }
}

/**
 * This function updates the user's profile information.
 * The request should contain the user's updated informations in the User prisma schema.
 * Including: profile, projects, badges and certificates.
 * @param request 
 * @returns 
 */
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse(null, { status: 401 });

    try {
        const body = await request.json();

        // Validate profile
        if (body.profile) {
            const urlRegex = /^(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.\w{2,}\/?$/;
            const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[\w\d-]+\/?$/;
            const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w\d-]+\/?$/;

            if (body.profile.bio && body.profile.bio.length > 200) 
                return new NextResponse(null, { status: 400 });
            if (body.profile.portfolioUrl && !urlRegex.test(body.profile.portfolioUrl)) 
                return new NextResponse(null, { status: 400 });
            if (body.profile.githubUrl && !githubRegex.test(body.profile.githubUrl)) 
                return new NextResponse(null, { status: 400 });
            if (body.profile.linkedinUrl && !linkedinRegex.test(body.profile.linkedinUrl)) 
                return new NextResponse(null, { status: 400 });

            // Upsert profile
            const profile = await prisma.profile.upsert({
                where: { userId: session.user?.id || "" },
                update: {
                    bio: body.profile.bio,
                    profilePicture: body.profile.profilePicture,
                    githubUrl: body.profile.githubUrl,
                    linkedinUrl: body.profile.linkedinUrl,
                    portfolioUrl: body.profile.portfolioUrl,
                    public: body.profile.public,
                },
                create: {
                    userId: session.user?.id || "",
                    bio: body.profile.bio,
                    profilePicture: body.profile.profilePicture,
                    githubUrl: body.profile.githubUrl,
                    linkedinUrl: body.profile.linkedinUrl,
                    portfolioUrl: body.profile.portfolioUrl,
                    public: body.profile.public,
                },
            });

            // Update skills
            if (body.profile.skills && Array.isArray(body.profile.skills)) {
                await prisma.skill.deleteMany({ where: { profileId: profile.id } });
                await prisma.skill.createMany({
                    data: body.profile.skills.map((skill: any) => ({
                        name: skill.name,
                        profileId: profile.id,
                    })),
                });
            }
        }

        const usernameRegex = /^[a-zA-Z0-9_]{3,}(?<!_)$/;
        // Update other user fields
        await prisma.user.update({
            where: { id: session.user?.id || "" },
            data: {
                name: body.name,
                username: usernameRegex.test(body.username) ? body.username : "",
                email: body.email,
                image: body.image,
            },
        });

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse(null, { status: 500 });
    }
}