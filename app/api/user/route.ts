import { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client";

const client  = new PrismaClient();

//so basically it gives you the same url where you can hit the frontend and backend both
export function GET() {

    return Response.json({
        email : "srinjoydas@gmail.com",
        name : "Srinjoy Das"
    })

}

export async function POST(req : NextRequest) {
        
    //extract the body and store the body in the database

    const body = await req.json();
    await client.user.create({
        data : {
            username : body.username,
            password : body.password
        }
    });

    return Response.json({
        message : "You are logged in"
    })
    
}


//same backend route in express >>
/* 
app.get('/api/user' , (req,res) => {
    res.json({
        email : "asdasda",
        name : "asdasdasdasd"
    });
})
*/