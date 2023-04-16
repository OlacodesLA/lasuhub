import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Google from "../../helpers/svgs/Google"
import Twitter from "../../helpers/svgs/Twitter"



const SignIn: FC = () => {
  const { data:session, status } = useSession();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] =useState(false)
  const [loginError, setLoginError] = useState(false)
  const router = useRouter();
  const handleSubmitSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signIn('email', {
        redirect: true,
        email
      });
      await router.push("/")
    } catch (error) {
      setLoginError(true)
    }
  };

const user = session?.user

useEffect(()=>{
    if (session) {
      router.push('/')
    }
},[router,session])


  if (status === "loading") {
    return <p>Loading...</p>
  }

return(
  <>  
  <div className="">
  <section className="bg-gray-50 min-h-screen flex items-center justify-center">
<div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
<div className="md:w-1/2 px-8 md:px-16">
  <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
  <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>

  <form onSubmit={handleSubmitSignIn} action="" className="flex flex-col gap-4">
    <input className="p-2 mt-8 rounded-xl border" onChange={e => setEmail(e.target.value)} type="email" name="email" value={email} placeholder="Email"/>
    <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
  </form>

  <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
    <hr className="border-gray-400"/>
    <p className="text-center text-sm">OR</p>
    <hr className="border-gray-400"/>
  </div>
  <button onClick={() => signIn('google')} className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
   <div className="mr-3"><Google/></div>
    Login with Google
  </button>
  <button onClick={() => signIn('twitter')} className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
    <div className="mr-3"><Twitter/></div>
    Login with Twitter
  </button>
  <button onClick={() => signIn('facebook')} className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
    <div className="mr-3"><Twitter/></div>
    Login with Facebook
  </button>

  <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
    <a href="#">Forgot your password?</a>
  </div>

  <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
    <p>Don&apos;t have an account?</p>
    <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
  </div>
</div>

{/* <!-- image --> */}
<div className="md:block hidden w-1/2">
  <img className="rounded-2xl w-full"  
alt="" src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"/>
</div>
</div>
</section>
</div>
  </>
)
};

export default SignIn;



