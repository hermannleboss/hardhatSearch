// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Box {
    uint256 private value;
    uint256 private version;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);
    event VersionChanged(uint256 newVersion);

    // Stores a new value in the contract
    function store(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }

    function setVersion(uint256 newVersion) public {
        version = newVersion;
        emit VersionChanged(newVersion);
    }

    function getVersion() public view returns (uint256) {
        return version;
    }
}
