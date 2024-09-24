import { PrismaClient } from "@prisma/client";

//data fetching in nextjs we do data fetching at the top of the compoenents by defining the fetch fuctionoutside the compoenent and then fetch it inside the compoennt on the top of the div
//and also defining the component async which is one nextJs supports and note only in server components of nextjs

/* before moving the backend logic to here
async function getUsersDetails() { //this is an asynchronous operation
  await new Promise((r) => setTimeout(r  , 5000)); // for loaders if we know some page is gonna take time then we can add a loading.tsx file in the root app folder then nextjs will automatically provide a loading screen 
  const response = await axios.get("http://localhost:3000/api/user"); //wrong pattern we will fix that later
  return response.data;
}
  */

//moving the backend logic of getting the user details here coz otherwise the nextjs server was calling itslef that is the localhost url which is nothing but the same thing that resides on the same repo itself so it is better to move the backend logic and make the server side rendering better
const client  = new PrismaClient(); //not single ton prisma client if we keep saving and saving out code then eventually an erorr will come saying that the prisma client already has 10 instances saved so to overcome that we use singleton prisma clinets which is a better practice to do in nextjs
//so we can just move the singleton prisma client to our db.ts file globall in the root app folder 
//move the client thing from the above and add import client from "@/db"

async function fetchData() {
  const user = await client.user.findFirst(); //get the first data from the users table , simple understanding logic from now otherwise for a real app we woild use where and all of that syntax

  return {
    email : user?.username,
    name : "srinjoy" //name dosent exist thats why here we are hardcoding the name here for practicing purposes
  }
}

//async component where on the top we can do async operations and yes next supports async components
export default async function Home() {

  const userdetails = await fetchData(); //this can be done only in server components . details are getting fetched on the server that is rendering is happening in the server
  // and now if we see the networks tab we will see the html file that comes back is nothing but it conatains all the email and name of the user that is nothing but server side rendering 
  //it is not like react that first it returns an html file then it gets the js file then it runs then it gives the final html file. in next all happens in one file that is called server side rendeing the waterfall method of react is excluded here

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded bg-slate-500">
          <div className="font-bold">
            Name : {userdetails.name}
          </div>
          <div className="font-bold">
            {userdetails?.email}
          </div>
        </div>
      </div>
    </div>
  );
}

