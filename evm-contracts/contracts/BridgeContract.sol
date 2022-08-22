// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./NFTMinter.sol";
contract BridgeContract is AccessControl, IERC721Receiver  {
    
    NFT[] public storedNFTs;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint8 public SIGNER_THRESHOLD = 1;
    address public minterContractAddress = address(0);
    NFTMinter minterContract = NFTMinter(minterContractAddress);
    event NFTReceived(uint256 location);
    event NFTTransfered(address operator, address to, uint256 tokenId);


    struct NFT {
        address _operatorETH;
        string _operatorAlgorand;
        address _from;
        uint256 _tokenId;
    }

    struct Transfer{
        address _operator;
        uint256 _tokenId;
        address _to;
        uint8 _signatures;
    }

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function setERC721ContractAddress(address _addr) public onlyRole(MINTER_ROLE) {
        minterContractAddress = _addr;
        minterContract = NFTMinter(_addr);
    }

    function getERC721ContractAddress() public view returns (address) {
        return minterContractAddress;
    }

    function addMinter(address _addr) public onlyRole(MINTER_ROLE){
        _grantRole(MINTER_ROLE, _addr);
    }


    function transferEthereumERC721(address operator, address to, uint256 tokenId) public onlyRole(MINTER_ROLE){
        require(minterContractAddress!= address(0));
        if(operator == address(0)){
            minterContract.mintFromBridge(to,"");
        } else{
            IERC721Metadata operatorContract = IERC721Metadata(operator); 
            operatorContract.safeTransferFrom(address(this), to, tokenId);
        }

    }

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data ) public override returns (bytes4) {
            // TODO: Add Algorand address to send NFT.
            NFT memory n = NFT(operator, "", from, tokenId);
            storedNFTs.push(n);
            emit NFTReceived(storedNFTs.length-1);
            return this.onERC721Received.selector;
    }
}