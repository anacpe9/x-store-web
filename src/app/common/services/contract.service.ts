import { Injectable } from '@angular/core';
import Web3 from "web3";
import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import { Subject, } from 'rxjs';
// import { uDonate_address, uDonate_abi } from '../abis';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  web3js: any;
  provider: any;
  accounts: string[] = [];
  web3Modal: Web3Modal;

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();

  constructor() {
    const providerOptions = {
      binancechainwallet: {
        package: true
      },
      // walletconnect: {
      //   package: WalletConnectProvider, // required
      //   // options: {
      //   //   infuraId: "INFURA_ID" // required
      //   // }
      // }
    };

    this.web3Modal = new Web3Modal({
      // network: "mainnet", // optional
      network: "binance-testnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
  }

  get currentAccount(): string {
    if(!this.provider || !this.provider.selectedAddress || !Array.isArray(this.accounts) || this.accounts.length === 0) return '';

    if (this.accounts.indexOf(this.provider.selectedAddress.toLowerCase()) > -1) {
      return this.provider.selectedAddress;
    }

    return '';
  }

  private onAccountsChanged(accounts: string[]) {
    console.log(accounts);

    this.accounts = accounts;
  }
  private onChainChanged(chainId: number) {
    console.log(chainId);
  }
  private onConnect(info: { chainId: number }) {
    console.log(info);
  }
  private onDisconnect(error: { code: number; message: string }) {
    console.log(error);
  }

  private onListener(provider: any){
    if(!provider) return;

    provider.on("accountsChanged", this.onAccountsChanged);
    provider.on("chainChanged", this.onChainChanged);
    provider.on("connect", this.onConnect);
    provider.on("disconnect", this.onDisconnect);
  }

  private offListener(provider: any){
    if(!provider) return;

    provider.off("accountsChanged", this.onAccountsChanged);
    provider.off("chainChanged", this.onChainChanged);
    provider.off("connect", this.onConnect);
    provider.off("disconnect", this.onDisconnect);
  }

  async connectAccount() {
    try {
      // this.web3Modal.clearCachedProvider();

      // this.offListener(this.provider);
      this.provider = await this.web3Modal.connect(); // set provider
      this.onListener(this.provider);

      console.log(' cachedProvider: ', this.web3Modal.cachedProvider);

      if (!this.web3Modal.cachedProvider) {
        console.log('modal:');
        await this.web3Modal.toggleModal();
      }

      this.web3js = new Web3(this.provider); // create web3 instance

      const accounts: string[] = await this.web3js.eth.getAccounts();
      this.accounts = accounts.map(a => a.toLocaleLowerCase());

      console.log('  this.accounts: ', this.accounts);
      console.log('selectedAddress: ', this.provider.selectedAddress);
      console.log('     isMetaMask: ', this.provider.isMetaMask);
      console.log('        balance: ', await this.getBalance(this.provider.selectedAddress));

      // if (this.accounts && this.accounts[0]) {
      //   console.log('        balance: ', await this.getBalance(this.accounts[0]));
      // }

      return this.accounts;
    } catch (err) {
      console.log('err:');
      console.log(err);

      alert(err);
    }

    return [];
  }

  async disconnectAccount() {
    if (this.provider && this.provider.close) {
      await this.provider.close;
    }

    await this.web3Modal.clearCachedProvider();

    this.provider = null;
    this.accounts = [];

    return Promise.resolve();
  }

  async getBalance(account: string){
    const result = await this.web3js.eth.getBalance(account);
    return this.web3js.utils.fromWei(result, "ether");
  }

  async sendEth(toAddress: string, amount: string) {
    const params = {
      from: this.accounts[0],
      to: toAddress,
      value: this.web3js.utils.toHex(this.web3js.utils.toWei(amount, "ether")),
      // gas: 39000,
    };

    await window.ethereum.enable();
    return await this.web3js.eth.sendTransaction(params);
  }
}
