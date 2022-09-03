import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Spinner from '../layout/assets/Spinner'
import UserItem from './UserItem'

function UserResults() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        })
        const data = await response.json()
        setUsers(data)
        setLoading(false)
    }


    if (!loading) {
        return (
            <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md: grid-cols-2'>
                {users.map((user) => (
                    <UserItem key={user.id} user={user}></UserItem>
                ))}
            </div>
        )
    } else {
        return <Spinner></Spinner>
    }
}

export default UserResults