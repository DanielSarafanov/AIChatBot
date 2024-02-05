'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

function Header() {

  const router = useRouter();
  const auth = useAuth();

  console.log(auth?.isLoggedIn)

  return (
    <header className='sticky flex top-0 p-5 text-white justify-between items-start w-full mx-auto z-20'>
      <div> 
          {/* Placeholder or logo can go here */}
      </div>
      <div className='flex flex-row space-x-10 right-10 font-semibold'> 
        {auth?.isLoggedIn ? (
          <>
            <h1 className='cursor-pointer' onClick={() => router.push('/chat')}>Chat</h1>
            <h1 className='cursor-pointer' onClick={async () => {
                auth?.logout;
                router.push('/');
            }}>Logout</h1>
          </>
        ) : (
          <>
            <h1 className='cursor-pointer' onClick={() => router.push('/login')}>Login</h1>
            <h1 className='cursor-pointer' onClick={() => router.push('/signUp')}>Sign Up</h1>
          </>
        )}
      </div>
    </header>
  )
}

export default Header;