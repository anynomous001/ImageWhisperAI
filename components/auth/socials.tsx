'use client'

import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'


const Socials = () => {
    return (
        <div className='flex justify-center space-x-4'>
            <Button
                size='lg'
                variant='outline'
                className='w-full'
                onClick={() => console.log('Google')}
            >
                <FcGoogle className='w-6 h-6' />
            </Button>
            <Button
                size='lg'
                variant='outline'
                className='w-full'
                onClick={() => console.log('Github')}
            >
                <FaGithub className='w-6 h-6' />
            </Button>

        </div>
    )
}

export default Socials