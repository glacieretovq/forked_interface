import { CurrencyAmount } from '@uniswap/sdk-core'
import { ETH_LOGO } from 'ui/src/assets'
import { USDC_KAIATESTNET } from 'uniswap/src/constants/tokens'
import { Chain as BackendChainId } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import { DEFAULT_NATIVE_ADDRESS_LEGACY } from 'uniswap/src/features/chains/evm/rpc'
import {
  GqlChainId,
  NetworkLayer,
  RPCType,
  UniverseChainId,
  UniverseChainInfo,
} from 'uniswap/src/features/chains/types'
import { ElementName } from 'uniswap/src/features/telemetry/constants'

export const KAIA_CHAIN_INFO = {
  name: 'Kaia Testnet',
  id: UniverseChainId.KaiaTestnet,
  assetRepoNetworkName: 'kaia-testnet',
  backendChain: {
    chain: BackendChainId.Ethereum as GqlChainId, // 임시로 Ethereum으로 설정
    backendSupported: false, // 백엔드 지원 안됨
    nativeTokenBackendAddress: undefined,
  },
  blockPerMainnetEpochForChainId: 1,
  blockWaitMsBeforeWarning: undefined,
  bridge: undefined,
  docs: 'https://docs.kaia.network/',
  elementName: ElementName.ChainKaiaTestnet,
  explorer: {
    name: 'Kaia Explorer',
    url: 'https://explorer.kaia.network/',
  },
  interfaceName: 'kaia-testnet',
  label: 'Kaia Testnet',
  logo: ETH_LOGO, // 임시로 ETH 로고 사용
  nativeCurrency: {
    name: 'Kaia ETH',
    symbol: 'ETH',
    decimals: 18,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY,
    logo: ETH_LOGO,
  },
  networkLayer: NetworkLayer.L2,
  pendingTransactionsRetryOptions: undefined,
  rpcUrls: {
    [RPCType.Default]: { http: ['https://public-en-kairos.node.kaia.io'] },
    [RPCType.Interface]: { http: ['https://public-en-kairos.node.kaia.io'] },
  },
  spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_KAIATESTNET, 10_000e6),
  stablecoins: [USDC_KAIATESTNET],
  statusPage: undefined,
  supportsV4: false,
  urlParam: 'kaia-testnet',
  wrappedNativeCurrency: {
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    address: '0xa1CC7e921eD511c057f34D4EA7760f8aE6A4a42D',
  },
} as const satisfies UniverseChainInfo 