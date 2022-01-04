import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { ALL_SUPPORTED_CHAIN_IDS } from '~utils/enums'
import { sendGet, sendPost } from '~utils/api'

declare const window: any

export type UserType = {
  address: string
  name?: string
  profileImg?: string
  coverImg?: string
}

type LogInContextType = {
  isLoading: boolean
  isLoggedIn: boolean
  user?: UserType
  connect: () => Promise<any>
  register: (params: any, callback?: Function) => any
  disconnect: () => void
}

const AuthContext = createContext<LogInContextType>({
  isLoading: false,
  isLoggedIn: false,
  user: undefined,
  // @ts-ignore
  connect: () => {},
  register: () => {},
  disconnect: () => {},
})

const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
})

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<UserType>()
  const { active, error, activate, deactivate, account, chainId, library } =
    useWeb3React()

  const connect = () =>
    new Promise((resolve, reject) => {
      activate(injected, () => {
        if (window.ethereum) {
          try {
            window.ethereum
              .send('wallet_switchEthereumChain', [{ chainId: '0x1' }, account])
              .then(() => {
                console.log('wallet_switchEthereumChain')
                connect()
              })
          } catch (err: any) {
            // User rejected request
            console.log('wallet_switchEthereumChain-error')
            deactivate()
          }
        } else {
          reject()
        }
      })
        .then((res) => resolve(res))
        .catch((e) => reject(e))
    })

  const disconnect = async () => {
    try {
      deactivate()
    } catch (e) {
      console.log(e)
    }
  }

  const connectUser = async () => {
    try {
      setIsLoading(true)
      const { data: ret } = await sendPost('user/connect', { address: account })
      localStorage.setItem('token', ret.token)
      // @ts-ignore
      setUser({ address: account })
      setIsLoggedIn(true)
      const { data } = await sendGet('user/profile')
      setUser(data)
    } catch (e) {
      console.log('Failed to connect user', e)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (params: any) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        setIsLoading(true)

        const { data: ret } = await sendPost('user/register', params)
        localStorage.setItem('token', ret.token)

        const { data } = await sendGet('user/profile')

        setUser(data)
        setIsLoggedIn(true)
        setIsLoading(false)

        // eslint-disable-next-line no-promise-executor-return
        return resolve(data)
      } catch (e) {
        console.log('Failed to register user', e)
        setIsLoading(false)

        // eslint-disable-next-line no-promise-executor-return
        return reject(e)
      }
    })
  }

  useEffect(() => {
    setIsLoading(true)
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        if (isAuthorized && !active && !error) {
          connect()
        }
      })
      .catch(() => setIsLoggedIn(false))
      .finally(() => setIsLoading(false))
  }, [activate, active, error])

  useEffect(() => {
    if (active) {
      connectUser()
    } else {
      localStorage.removeItem('token')
      setIsLoggedIn(false)
      setUser(undefined)
    }
  }, [active, account])

  useEffect(() => {
    if (chainId !== 1 && library) {
      library.send('wallet_switchEthereumChain', [{ chainId: '0x1' }, account])
    }
  }, [chainId, library])

  const memoedValue = useMemo(
    () => ({
      isLoggedIn,
      user,
      connect,
      register,
      disconnect,
      isLoading,
    }),
    [isLoggedIn, user, connect, register, disconnect, isLoading]
  )

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
