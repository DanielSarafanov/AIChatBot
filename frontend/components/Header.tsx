'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

type Props = {}

function Header({}: Props) {

    const router = useRouter();

    return (
        <header className='sticky flex top-0 p-5 text-white justify-between items-start w-full mx-auto z-20'>
            <div> 
                {/* Placeholder or logo can go here */}
            </div>
            <div className='flex flex-row space-x-10 right-10'> 

                <h1 className='cursor-pointer' onClick={() => router.push('/login')}>Login</h1>
                <h1 className='cursor-pointer' onClick={() => router.push('/signUp')}>Sign Up</h1>

            </div>
        </header>
    )
    }

export default Header