// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Diasosi is
    ERC721,
    // ERC721Enumerable,
    // ERC721URIStorage,
    Pausable,
    Ownable
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    using Strings for uint256;

    string baseURI;

    event onMint(
        uint256 id,
        address indexed owner,
        string indexed tokenURI,
        uint256 timestamp
    );

    struct mintSale {
        string title;
        uint256 id;
        address owner;
        string imageURL;
        uint256 timestamp;
    }

    mintSale[] public mintedNFT;
    uint256[] private tokenNumId;

    mapping(uint256 => mintSale) public Minted;

    string public baseImage = ".webp";
    string public baseExtension = ".json";
    uint256 MAX_SUPPLY = 99;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function clickMint(string memory _imageURL, string memory _title) public {
        require(_tokenIdCounter.current() <= MAX_SUPPLY, "Max. supply reached");
        require(!paused(), "maintenance ongoing");
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();

        _safeMint(msg.sender, tokenId);

        mintSale storage mt = Minted[tokenId];
        mt.title = _title;
        mt.id = tokenId;
        mt.owner = msg.sender;
        mt.imageURL = _imageURL;
        mt.timestamp = block.timestamp;
        // mintedNFT.push(mt);
        tokenNumId.push(tokenId);
        mintedNFT.push(mt);
        emit onMint(tokenId, msg.sender, _imageURL, block.timestamp);
    }

    function getNFTs() public view returns (mintSale[] memory) {
        mintSale[] memory result = new mintSale[](tokenNumId.length);

        for (uint256 i = 0; i < tokenNumId.length; i++) {
            result[i] = Minted[tokenNumId[i]];
        }

        // Return the result array
        return result;
    }

    function getAllNFTs() public view returns (mintSale[] memory) {
        return mintedNFT;
    }
}
