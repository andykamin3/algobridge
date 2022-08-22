const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContracts() {
   // Contracts are deployed using the first signer/account by default
   const [owner, otherAccount] = await ethers.getSigners();

   //const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
   const Minter = await ethers.getContractFactory("NFTMinter");
   const minter = await Minter.deploy();

   const Bridge = await ethers.getContractFactory("BridgeContract");
   const bridge = await Bridge.deploy();

   return { minter, bridge, owner, otherAccount };
  }

  describe("Deployment", function () {
    
    it("Should change the minter contract.", async function () {
      const { minter,bridge, owner } = await loadFixture(deployContracts);
      let signerBridge = bridge.connect(owner);
      let tx = signerBridge.setERC721ContractAddress(minter.address);
      console.log();
      expect(minter.address == await signerBridge.getERC721ContractAddress());
    });

    it("Should mint some test NFTs.", async function(){
      const { minter,bridge, owner } = await loadFixture(deployContracts);
      let minterSigner = minter.connect(owner);
      for (let index = 0; index < 5; index++) {
        const tx = minterSigner.safeMint(owner.address);
        console.log(await tx);
      }
      const balance = await minter.balanceOf(owner.address) 
      expect(balance == 5);
    });

    it("Should mint an NFT with an URI", async function(){
      const URI = "https://gateway.pinata.cloud/ipfs/QmWeUuJQxmdFabvxfeWX6kZx9c9gT6fYGwb3GH1fHGEPGk"
      const { minter,bridge, owner } = await loadFixture(deployContracts);
      let minterSigner = minter.connect(owner);
      let tx = await minterSigner.mintFromBridge(owner.address, URI)
      let tx1 = await minterSigner.mintFromBridge(owner.address, URI)
      let tx2 = await minterSigner.mintFromBridge(owner.address, URI)
      console.log("TOKEN URI IS ", await minterSigner.tokenURI(1))
      expect(await minterSigner.ownerOf(1) == owner.address)
      expect(await minterSigner.tokenURI(1) == URI)
    });
  });
});
