
# algobridge
## Hackathon Algorand GreenHouse Hack#1
Create a lite client or bridge which incentives EVM comparable chains to utilize Algorand’s speed, low fees and green transactions with their communities and NFT transactions- be creative, this might mean wrapping NFT or locking an EVM NFT into an algorand smart contract for minting/transactions.

## Solution
algobridge is the proposed implementation of a bridge between Algorand and EVM chains (Ethereum Mainnet, Optimism, Arbitrum or Polygon) to enable the bridging of NFTs between chains.
By leveraging platform native representation of non-fungible tokens as either ERC-721s(EVM) or ASAs(AVM) the bridge would enable composability with other apps. 
![proposed bridge structure diagram](https://i.imgur.com/xzzbi06.png)

## Technical Overview
As seen in the diagram, the proposed initial structure of the bridge would consist of a trusted setup so that using a multisig-like structure assets can be sent to addresses on each network and subsequently minted and transferred to the user on the other. Time limitations precluded us from delving deeper into the implementation of other more secure possibilities like an optimistic-like implementation of the bridge. 
The different authorized actors of the multisig would constantly poll the blockchains data or in the case of Ethereum and other compatible chains use The Graph to react to the transfer of assets accordingly. 
As in EVM compatible chains, there is a tradeoff in dependability and decentralization when it comes to the use of Algorand Standard Assets as we have not yet been able to use a smart contract to mint these assets using a smart contract while simultaneously ensuring [compatibility](https://developer.algorand.org/articles/building-nfts-on-algorand/) with wallets in the ecosystem. This creates another trusted agent in the setup, that is the EOA that would end up minting the asset on Algorand. In the future it would be worth looking into the possibility of replicating the [mint of ASAs using a multisig](https://developer.algorand.org/tutorials/hybrid-online-offline-shared-management-community-asa-through-multisig-account/) in a programatic manner to ensure a proper degree of decentralization.

## Current state of the project
Due to time constraints currently the bridge is not ready for deployment as some elements of the JS client for the multisig members is still not implemented as well as adding multisig capabilities to the Ethereum contract. 
With this finished it would be possible to start testing the bridge in testnets after deploying a basic frontend. Another question that looks worth investigating is whether it is possible to query the state of the blockchains in a more reliable way. 

## The dream team
![dev team](https://i.imgur.com/Hctq5dc.png)
## Clarifications
This is no possible way a finished implementation and we are not claiming it is but it was certainly a very interesting project that enabled us to explore Algorand and dive deeper into asset bridging as a subject. 
