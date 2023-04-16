import type { FC } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Verify: FC = () => {
  const { data: session, status } = useSession();

return(
  <>
  <div className="">
    <h1>Check your Email Address</h1>
    <p>A Sign In Link has been Sent to your Email Address</p>
    <Link href="/">Go back to homepage</Link>
  </div>

  </>
)
};

export default Verify;

