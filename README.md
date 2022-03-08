##Abstract##
    This is a wallet smart contract that follows conditions below

     
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


##environment##
This is a hardhat project. So in order to try it on your computer, please install npm.
once you have your npm execute
    npm install
to get all the dependencies.

js files in scripts folder can only run if you install and run ganache.

0)Node.js, NPM version
Node : v14.17.3
NPM : 6.14.13

1)Hardhat version
2.8.0

2)Ganache GUI version
2.5.4
port number: 7545

3) .env file
.env file needs to have ganache accounts private keys for reproduction.
Key : PRIVATE_KEY1
Value : wallet address in string
In this example I have 4 keys

##About the contracts##

1_Wallet.sol
The smart contract is protected by Ownable and Accesscontrol library.
 
Fee changing function is protected by Ownable modifier.

Other functions are protected by role. Only USER can use this wallet. Not even the owner of this smart contract.

Wallet contract can 1)receive and sends ETH 2)receive and send ERC20 tokens 3)approve other address to manipulate its ERC20 tokens 3)send comissions to whoever needs to receive whever there is ETH withdrawl from the wallet 4)emit events whenever any function is called 5)change fee by owner.

2)ERC20A.sol & ERC20B.sol
They are just simple vanilla ERC20s deployed for testing.

3)Receiver.sol
Receiver smart contract was also made for testing allowance and to check whether it receives ETH when user withdraws ETH


