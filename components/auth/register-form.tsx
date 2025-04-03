'use client'

import React, { useTransition, useState } from 'react'
import CardWrapper from '@/components/auth/card-wrapper'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormField,
    FormLabel,
    FormControl,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { RegisterSchema } from '@/schemas'
import * as z from 'zod'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { register } from '@/actions/register'





const RegisterForm = () => {

    const [pending, setTransition] = useTransition()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')


    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: ''
        }
    })


    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setTransition(() => {
            register(values)
                .then((data) => {
                    console.log(data)
                    if (data.success) {
                        setError(false)
                        setSuccess(true)
                        setMessage(data.message)
                    } else {
                        setSuccess(false)
                        setError(true)
                        setMessage(data.message)
                    }
                })
        })
    }

    return (
        <CardWrapper
            headerLabel='Create an account!'
            backButtonLabel={`Already have an account?`}
            backButtonhref='/auth/login'
            socials
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((data) => onSubmit(data))}
                    className='space-y-4'
                >
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={pending}
                                            type='text'
                                            placeholder='Enter your name'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />




                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={pending}
                                            type='email'
                                            placeholder='Enter your email'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={pending}
                                            type='password'
                                            placeholder='Enter your password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    {error && <FormError message={message} />}
                    {success && <FormSuccess message={message} />}

                    <Button
                        className='w-full'
                        type='submit'
                        size='lg'
                        disabled={pending}
                    >
                        Register

                    </Button>

                </form>
            </Form >
        </CardWrapper >
    )
}

export default RegisterForm 