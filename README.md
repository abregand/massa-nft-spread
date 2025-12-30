# NFT Smart-contract

## Install

```shell
npm install
```

## Build

```shell
npm run build
```

## Deploy smart contract

Prerequisites :

- You must add a `.env` file at the root of the repository with the following keys set to valid values :
  - PRIVATE_KEY=wallet_secret_key
  - MAINNET=true/false

These keys will be the ones used by the deployer script to interact with the blockchain

The following command will build contract in `assembly/contracts` directory and execute the deployment script
`src/deploy.ts`. This script will deploy on the node specified in the `.env` file

```shell
npm run deploy
```

You can modify `src/deploy.ts` to change the smart contract being deployed, and to pass arguments to the constructor
function:

- line 22: create the `Args` object to pass to the constructor of the contract you want to deploy

## Interact with smart contract

Prerequisites :

- You must add a `.env` file at the root of the repository with the following keys set to valid values :
  - PRIVATE_KEY=wallet_secret_key
  - MAINNET=true/false
  - MAINNET_CONTRACT_ADDRESS=mainnet_sc_address
  - BUILDNET_CONTRACT_ADDRESS=buildnet_sc_address

These keys will be the ones used by scripts to interact with the smart contract (mainnet or buildnet depending on MAINNET key value (true or false))

### Get smart contract datas
```shell
npm run getdata
```

### Mint NFT
You can modify `interact/mint.ts` to change the recipient address
```shell
npm run mint
```

### Tranfer NFT
You can modify `interact/transferFrom.ts` to change the NFT id and recipient address
```shell
npm run tranfer
```

### Withdraw MAS from smart contract
You can modify `interact/withdraw.ts` to change amount and recipient address
```shell
npm run withdraw
```

### Change base Uri
You can modify `interact/setBaseUri.ts` to change new base uri
```shell
npm run setbaseuri
```

### Change mint price
You can modify `interact/setMintPrice.ts` to change new mint price
```shell
npm run setmintprice
```

### Change owner address
You can modify `interact/setOwner.ts` to change new owner address
```shell
npm run setowner
```

### Mintable ?
You can modify `interact/setMintable.ts` to change mintable value
```shell
npm run setmintable
```

### Tranferable ?
You can modify `interact/setTransferable.ts` to change transferable value
```shell
npm run settransferable
```