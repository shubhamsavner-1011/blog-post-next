import {useSession } from "next-auth/react";
import Image from "next/image";


const Profile = () => {
  const {data: session, status} = useSession();
  const email = session?.user?.email;
  const name = session?.user?.name;
//   const ImgSrc = session?.user?.image;
//   console.log(ImgSrc)
    return (
    <div>
       <h2> User Profile</h2>
       {/* {ImgSrc && <Image src={ImgSrc} width={100} height={100} alt='image'/> } */}
       <h6>UserName: {name}</h6>
       <h6>Email : {email}</h6> 

    </div>
  )
}
export default Profile;