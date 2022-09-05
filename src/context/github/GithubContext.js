import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"


const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {}, // by default: a empty object -> fill it after fetching the data from server
        
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // Get search results
    const searchUser = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        const { items } = await response.json()
        console.log(items)
        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }


    // Get single user 
    const getUser = async (login) => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        if (response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json()
            console.log(data)
            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }
    }

    // Get user repo
    const getUserRepos = async (login) => {
        setLoading()

        
        const response = await fetch(`${GITHUB_URL}/users/${login}/repos`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        const data = await response.json()
        console.log(data)
        dispatch({
            type: 'GET_REPOS',
            payload: data
        })
    }
    

    // Clear result 
    const clearSearchResult = () => {

        console.log("clear")
        dispatch({
            type: 'CLEAR_RESULT'
        })
    }

    // Set Loading
    const setLoading = () => dispatch({
        type:
            'SET_LOADING'
    })

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        clearSearchResult,
        searchUser,
        getUser,
        getUserRepos
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext