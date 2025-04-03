import { db } from "@/lib/db"

/**
 * Get a user by their email address
 * @param email - The email address of the user to get
 * @returns The user with the given email address, or null if no user is found
 */
export const getUserByEmail = async (email: string) => {

    try {
        const user = await db.user.findUnique({
            where: { email }
        })
        return user
    } catch (error) {
        console.log(error)
        return null
    }

}

/**
 * Get a user by their ID
 * @param id - The ID of the user to get
 * @returns The user with the given ID, or null if no user is found
 */
export const getUserById = async (id: string) => {

    try {
        const user = await db.user.findUnique({
            where: { id }
        })
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}