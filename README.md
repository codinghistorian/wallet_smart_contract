 Write a smart contract like "wallet".
 A smart contract must have the necessary and sufficient functionality so that the contract can be used as a regular address on the Ethereum network:
 * Ability to send/receive ETH
 * Ability to send/receive tokens
 * Ability to make allowance for tokens

 The smart contract must have a method or functionality that allows you to set a commission for transfers of ether:
 * There must be a method that changes the value of this fee
 * Commission - is a certain number of the transferred amount
 * The transfer of this commission must be made along with the regular transfer
 * The address for the transfer is hardcoded into the contract

 //220302 19:18 so it's basically making a smart contract that works like Metamask
 //I would have to write test scripts as well. No problem.
 //fallback, receive and some reentry protection with modifier and state change before
 //low-level call should do the job. Make it ERC20 acceptible