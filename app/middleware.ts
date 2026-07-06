import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/services/users";

export function middleware(request: NextRequest){
    try {
        const token = request.cookies.get("token");
        
        if(!token?.value){
            return NextResponse.redirect(new URL("/admin/login", request.url))
        }

        const result = verifyAuth(token.value);

        if(result.success){
            
        }

    } catch (error) {
        
    }
}