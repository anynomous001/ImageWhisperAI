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
import { LoginSchema } from '@/schemas'
import * as z from 'zod'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { login } from '@/actions/login'





const LoginForm = () => {

    const [pending, setTransition] = useTransition()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')


    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })


    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setTransition(() => {
            login(values)
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
            headerLabel='Welcome back!'
            backButtonLabel={`Don't have an account?`}
            backButtonhref='/auth/register'
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
                        {error && <FormError message={message} />}
                        {success && <FormSuccess message={message} />}

                        <Button
                            className='w-full'
                            type='submit'
                            size='lg'
                            disabled={pending}
                        >
                            Login

                        </Button>

                    </div>

                </form>
            </Form>
        </CardWrapper >
    )
}

export default LoginForm