//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721Mapping.sol";

contract Manager is Ownable {
    mapping(address => ERC721Mapping) private mappers;
    address[] private existedMappers;

    constructor() {}

    modifier _onlyNotExists(address _mainAddress) {
        require(
            address(mappers[_mainAddress]) == address(0),
            "Already existed"
        );
        _;
    }

    function addMapping(
        address _mainAddress,
        string calldata _name,
        string calldata _symbol,
        string calldata _baseURI
    ) external _onlyNotExists(_mainAddress) onlyOwner {
        ERC721Mapping mapper = new ERC721Mapping(
            _mainAddress,
            _name,
            _symbol,
            _baseURI
        );
        mappers[_mainAddress] = mapper;
        existedMappers.push(_mainAddress);
    }

    function changeManager(address _newManager) external onlyOwner {
        // loop over existed mappers
        // get the ERC721Mapping
        //
        for (uint256 i = 0; i < existedMappers.length; i++) {
            ERC721Mapping  mapper = mappers[existedMappers[i]];
            mapper.changeManager(_newManager);
        }
    }

    //`function mapping

    function getMappingAddress(address _mainAddress)
        public
        view
        returns (address)
    {
        return address(mappers[_mainAddress]);
    }

    function getMappers() public view returns (address[] memory) {
        return existedMappers;
    }
}
