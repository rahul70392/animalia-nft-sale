import { Web3Provider } from '@ethersproject/providers'
import ms from 'ms.macro'
import { SupportedChainId } from './enums'

const NETWORK_POLLING_INTERVALS: { [chainId: number]: number } = {
  [SupportedChainId.ARBITRUM_ONE]: ms`1s`,
  [SupportedChainId.ARBITRUM_RINKEBY]: ms`1s`,
  [SupportedChainId.OPTIMISM]: ms`1s`,
  [SupportedChainId.OPTIMISTIC_KOVAN]: ms`1s`,
  [SupportedChainId.OPTIMISTIC_KOVAN]: ms`1s`,
  [SupportedChainId.BSC_MAINNET]: ms`1s`,
}

export default function getLibrary(provider: any): Web3Provider {
  console.log('fsWeb3ProviderNetwork', provider.chainId)
  const library = new Web3Provider(
    provider,
    // eslint-disable-next-line no-nested-ternary
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? 56
      : // ? parseInt(provider.chainId, 10)
        'any'
  )
  console.log('fsWeb3ProviderNetwork', library)
  library.pollingInterval = 15_000
  library.detectNetwork().then((network) => {
    const networkPollingInterval = NETWORK_POLLING_INTERVALS[network.chainId]
    if (networkPollingInterval) {
      console.debug('Setting polling interval', networkPollingInterval)
      library.pollingInterval = networkPollingInterval
    }
  })
  return library
}
