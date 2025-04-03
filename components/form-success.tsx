import { BsCheckCircle } from "react-icons/bs";


interface FormSuccessProps {
    message?: string
}

const FormSuccess = ({ message }: FormSuccessProps) => {

    if (!message) return null

    return (
        <div className="bg-emerald-500/20 p-2 rounded-sm gap-x-2 flex items-center text-sm text-emerald-500">
            <BsCheckCircle className='w-6 h-6 text-emerald-500' />
            <p>{message}</p>
        </div>
    )


}

export default FormSuccess