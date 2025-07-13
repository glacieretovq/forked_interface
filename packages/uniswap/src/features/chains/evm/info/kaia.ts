import { CurrencyAmount } from '@uniswap/sdk-core'
import { KAIA_LOGO } from 'ui/src/assets'
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
import { kairos } from 'viem/chains'

export const KAIA_CHAIN_INFO = {
  ...kairos,
  id: UniverseChainId.KaiaTestnet, // 체인의 고유 식별자
  assetRepoNetworkName: 'kaia-testnet', // asset repo(https://github.com/Uniswap/assets) 상에서 에셋을 가져올 때 사용할 네트워크 이름
  backendChain: {
    chain: BackendChainId.Ethereum as GqlChainId, // 백엔드 GraphQL에서 사용하는 체인 ID (임시로 Ethereum으로 설정)
    backendSupported: false, // 백엔드 지원 여부 (현재 지원 안됨)
    nativeTokenBackendAddress: undefined, // 백엔드에서 사용하는 네이티브 토큰 주소
  },
  blockPerMainnetEpochForChainId: 1, // 메인넷 에포크당 블록 수
  blockWaitMsBeforeWarning: undefined, // 블록 대기 시간 경고 임계값 (밀리초)
  bridge: undefined, // 브리지 서비스 URL
  docs: 'https://docs.kaia.io/', // 체인 문서 URL
  elementName: ElementName.ChainKaiaTestnet, // 텔레메트리 목적으로 사용하는 체인 이름
  explorer: {
    name: 'Kaia Explorer', // 블록 익스플로러 이름
    url: 'https://kairos.kaiascan.io/', // 블록 익스플로러 URL
  },
  interfaceName: 'kaia-testnet', // 인터페이스에서 사용하는 체인 이름(시스템 식별자)
  label: 'Kaia Testnet', // 사용자에게 표시되는 체인 라벨
  logo: KAIA_LOGO, // 체인 로고
  nativeCurrency: {
    ...kairos.nativeCurrency,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY, // 네이티브 토큰 주소 (기본값 사용)
    logo: KAIA_LOGO, // 네이티브 토큰 로고
  },
  networkLayer: NetworkLayer.L2, // 네트워크 레이어 (L1/L2)
  pendingTransactionsRetryOptions: undefined, // 대기 중인 트랜잭션 재시도 옵션
  rpcUrls: {
    [RPCType.Default]: { http: ['https://public-en-kairos.node.kaia.io'] }, // 기본 RPC URL
    [RPCType.Interface]: { http: ['https://public-en-kairos.node.kaia.io'] }, // 인터페이스용 RPC URL
  },
  spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_KAIATESTNET, 10_000e6), // 스팟 가격 계산용 스테이블코인 수량
  stablecoins: [USDC_KAIATESTNET], // 지원하는 스테이블코인 목록
  statusPage: undefined, // 사용자가 이 네트워크의 공식 상태를 확인할 수 있는 공식 상태 페이지 URL
  supportsV4: false, // Uniswap V4 지원 여부
  urlParam: 'kaia-testnet', // URL 파라미터에서 사용하는 체인 이름
  wrappedNativeCurrency: {
    name: 'Wrapped KAIA',
    symbol: 'WKAIA',
    decimals: 18,
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  },
} as const satisfies UniverseChainInfo 