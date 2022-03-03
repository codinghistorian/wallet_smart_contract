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

220302 20:41 KST note.

 //  * Ability to send/receive ETH
// -> fallback, receive functions
// send function with low-level call function in it. send(_value) { address(this).call{value: _value}();}
// reentrancy modifier from openzeppelin needed.

//  * Ability to send/receive tokens
// -> gotta inherit IERC20 to this wallet.
// -> just use safeTransfer lib from openzeppelin.

//  * Ability to make allowance for tokens
// -> gotta inherit IERC20 to this wallet.
// -> I have never tried making a smart contract calling allowance function, gotta try.

//  * There must be a method that changes the value of this fee
// -> I can just make the fee state variable with  a function that changes it. Onlyowner needed.

//  * Commission - is a certain number of the transferred amount
// -> fuck it. I will just make the comission a constant value in wei

//  * The transfer of this commission must be made along with the regular transfer
// I can just make this low-level call work twice. once for actual transfer, the other for comission.

//  * The address for the transfer is hardcoded into the contract
// -> okay. receiver addresse hardcoded. No constructor.