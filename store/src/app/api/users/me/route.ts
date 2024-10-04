


// import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import UserVal from "@/models/UserModel";
import { Connect } from "@/dbConfig/dbConfig";

Connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await UserVal.findOne({ _id: userId }).select("-password");

        return NextResponse.json({
            message: "User found",
            data: user,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
