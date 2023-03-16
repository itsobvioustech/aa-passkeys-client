import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'

export class BundlerRPClient {
  readonly userOpJsonRpcProvider: JsonRpcProvider
  initializing: Promise<void>

  constructor (
    readonly bundlerUrl: string,
    readonly chainId: number
  ) {
    this.userOpJsonRpcProvider = new ethers.providers.JsonRpcProvider(this.bundlerUrl, {
      name: 'Connected bundler network',
      chainId
    })
    this.initializing = this.validateChainId()
  }

  async validateChainId (): Promise<void> {
    // validate chainId is in sync with expected chainid
    const chain = await this.userOpJsonRpcProvider.send('eth_chainId', [])
    const bundlerChain = parseInt(chain)
    if (bundlerChain !== this.chainId) {
      throw new Error(`bundler ${this.bundlerUrl} is on chainId ${bundlerChain}, but provider is on chainId ${this.chainId}`)
    }
  }

  /**
   * send a UserOperation to the bundler
   * @param userOp1
   * @return userOpHash the id of this operation, for getUserOperationTransaction
   */
  async getUserOpReceipt(userOpHash: string): Promise<any> {
    await this.initializing
    return await this.userOpJsonRpcProvider
      .send('eth_getUserOperationReceipt', [userOpHash])
  }
}