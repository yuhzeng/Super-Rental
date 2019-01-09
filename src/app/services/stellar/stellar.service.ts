// TODO: Delete all references to local | session storage

import { Injectable } from '@angular/core';
import * as StellarSdk from 'stellar-sdk/dist/stellar-sdk.min.js';
import { environment } from 'environments/environment';

declare const StellarSdk: any;

@Injectable({
  providedIn: 'root'
})
export class StellarService {

    /////////// CLIENT KEYS //////////////////////
    // GBT7DUXFTBW6CLYHB4UKLLIX3IENABCXLXAZASJF4I6J73NAV4TR4ZTQ
    // SAV6VEIM2477EYBVOM2SXY3JG6JFKL734KKQRICCAQVMV57PC2KUMYH7

    private server: any;

    constructor() {
        // this.server = new StellarSdk.Server('https://horizon.stellar.org');
        // StellarSdk.Network.usePublicNetwork();
        StellarSdk.Network.useTestNetwork();
        this.server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    }

    validateSecretKey(secretKey: string) {
      const pubKey = this.getPublicKey(secretKey);
      return (secretKey !== null &&
              secretKey !== undefined &&
              secretKey !== '' &&
              typeof pubKey === 'string' &&
              pubKey !== null &&
              pubKey !== undefined &&
              pubKey !== '');
    }

    getPublicKey(secretKey: string) {
      return StellarSdk.Keypair.fromSecret(secretKey).publicKey();
    }

    cacheKeys(secretKey: string) {
      if (this.validateSecretKey(secretKey)) {
        sessionStorage.setItem('seed_key', secretKey);
        sessionStorage.setItem('public_key', this.getPublicKey(secretKey));
      } else {
          throw Error('invalid secret key');
        }
    }

    clearKeyCache() {
        sessionStorage.removeItem('seed_key');
        sessionStorage.removeItem('public_key');
      }

    loadBalances(publicKey: string) {
      return this.server.loadAccount(publicKey)
        .catch(StellarSdk.NotFoundError, function (error) {
            throw new Error(error);
        })
        .then(account => account)
        .then((account: any) => <Array<AssetBalance>> account.balances);
    }

    validateNewBalance(publicKey: string, paymentAmount: string): Promise<boolean> {
        return this.loadBalances(publicKey)
          .then((balances: any) => {
              console.log(balances);
              const { balance } = balances[0];
              console.log(balance);
              const newAmount = (parseFloat(balance) - parseFloat(paymentAmount));
              console.log(newAmount);
              return newAmount >= 0;
          });
      }

    sendPayment (amount: string | number, memo: string): Promise<any> {
      const secretKey = sessionStorage.getItem('seed_key');
      const pubKey = sessionStorage.getItem('public_key');
      console.log(secretKey);
      if (!secretKey) { return; }
      const _server = this.server;
      const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
      return this.server.loadAccount(pubKey)
          .then(function(sourceAccount) {
              const transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                .addOperation(StellarSdk.Operation.payment({
                    destination: environment.ADMIN_PUBLIC_KEY,
                    asset: StellarSdk.Asset.native(),
                    memo: memo || 'Rent Payment',
                    amount: amount
                }))
                .build();
              transaction.sign(sourceKeys);
              return _server.submitTransaction(transaction);
          })
          .catch(function(error) {
              console.log(error);
              throw error;
          })
          .then(result => result)
          .catch(function(error) {
              console.log(error);
              throw error;
          });
  }

}

declare interface AssetBalance {
    balance: string;
    asset_type: string;
}
