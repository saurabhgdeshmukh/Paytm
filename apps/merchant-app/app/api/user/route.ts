import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const GET = async () => {
    try {
        await client.user.create({
            data: {
                email: "asd@example.com", 
                name: "adsads"
            }
        });

        return NextResponse.json({
            message: "User created successfully"
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({
            message: "Error creating user",
        }, { status: 500 });
    } finally {
        await client.$disconnect();
    }
};
