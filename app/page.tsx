import axios from "axios";

//data fetching in nextjs we do data fetching at the top of the compoenents by defining the fetch fuctionoutside the compoenent and then fetch it inside the compoennt on the top of the div
//and also defining the component async which is one nextJs supports and note only in server components of nextjs

async function getUsersDetails() { //this is an asynchronous operation
  await new Promise((r) => setTimeout(r  , 5000)); // for loaders if we know some page is gonna take time then we can add a loading.tsx file in the root app folder then nextjs will automatically provide a loading screen 
  const response = await axios.get("http://localhost:3000/api/user"); //wrong pattern we will fix that later
  return response.data;
}

//async component where on the top we can do async operations and yes next supports async components
export default async function Home() {

  const userdetails = await getUsersDetails(); //this can be done only in server components . details are getting fetched on the server that is rendering is happening in the server
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

