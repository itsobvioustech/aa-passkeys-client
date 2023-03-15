import { ERC4337EthersProvider, ClientConfig, HttpRpcClient } from '@account-abstraction/sdk'
import { EntryPoint } from '@account-abstraction/contracts'
import { Signer } from 'ethers'
import { BaseProvider } from '@ethersproject/providers'
import { PassKeysAccountApi } from './PassKeysAccountAPI'

export class PassKeysProvider extends ERC4337EthersProvider {
    constructor(
        readonly chainId: number,
        readonly config: ClientConfig,
        readonly originalSigner: Signer,
        readonly originalProvider: BaseProvider,
        readonly httpRpcClient: HttpRpcClient,
        readonly entryPoint: EntryPoint,
        readonly smartAccountAPI: PassKeysAccountApi,
        readonly accountAddress?: string,
    ) {
        super(chainId, config, originalSigner, originalProvider, httpRpcClient, entryPoint, smartAccountAPI)
        if (accountAddress) this.accountAddress = accountAddress
    }
}