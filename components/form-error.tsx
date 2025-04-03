import { BsExclamationTriangle } from "react-icons/bs";


interface FormErrorProps {
    message?: string
}

const FormError = ({ message }: FormErrorProps) => {

    if (!message) return null

    return (
        <div className="bg-destructive/15 p-2 rounded-sm gap-x-2 flex items-center text-sm text-destructive">
            <BsExclamationTriangle className='w-6 h-6 text-red-500' />
            <p>{message}</p>
        </div>
    )


}

export default FormError