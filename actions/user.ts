//user actions >>
"use server" //when evr we are creating server action we have to specify use sever
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

//post endpoint into a server action

//we can delete the api/user/route.ts and expose it over here

//import { NextRequest } from "next/server"
//import { PrismaClient } from "@prisma/client";

//const client  = new PrismaClient(); // after doing the db.ts file remove this and add import clinet from '@/db"

//so basically it gives you the same url where you can hit the frontend and backend both
/* for better fetching we will move the backend logic to the page.tsx file in the root folder nhi toh the nextjs server is calling itself so that is pretty ugly or a good coder
export function GET() {

    return Response.json({
        email : "srinjoydas@gmail.com",
        name : "Srinjoy Das"
    })

}
    */

/*
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
*/

//same backend route in express >>
/* 
app.get('/api/user' , (req,res) => {
    res.json({
        email : "asdasda",
        name : "asdasdasdasd"
    });
})
*/

//server actions >>

/*
here as we can see before we did that in the signup end point after thhe button is clicked 
it is sending it in the nextjs server that is the nextjs server is calling itself.... which is kindof an inconvinience
before we hit the post end point from the signup client side that is from the browser to the post endpoint in route.ts
but if we want to run this endpoint from the backend that is basically calling the nextjs server from the nextjs server which is sort of inconvinience
so we basically get rid of the http endpoint and make a server action that the server component can also call and also the browser can sort of call
*/ 

//server action changes the way it takes inputs but the browser will still make an http call
const client  = new PrismaClient();
//so in the server action it takes normal function parameters as inputs as we can see
export async function signupserver(username : string , password : string) {
    
    try{
        await client.user.create({
            data : {
                username : username,
                password : password
            }
        });
        return true //returns true if the user is created 
        
    } catch(e) {
        console.log(e);
        return false //returns false if the user is not created 
    }
}

//now we can go the clint signup component and call this above function and no need to call the axios.post or anything like that 
