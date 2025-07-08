import { Button } from 'ui/src'
import { useConnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export function WalletConnectTestButton() {
  const { connect, connectors } = useConnect()
  // connect() : 지갑 연결 메서드 -> 호출 시 지갑 연결 팝업 표시
  // connectors : 사용 가능한 모든 커넥터 목록
  // injected() : 브라우저에 설치된 지갑 확장 프로그램(MetaMask, Coinbase Wallet, etc) 감지

  return <Button onPress={() => connect({ connector: injected() })}>WalletConnectTestButton</Button>
}