//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract Wallet is Ownable {
//  * Ability to send/receive ETH
// -> fallback, receive functions
// send function with low-level call function in it. send(_value) { address(this).call{value: _value}();}
// let's just put reentrancy modifier from openzeppelin just to be safer.
    
    using SafeERC20 for IERC20;

    // receive ETH
    event Deposit(address indexed sender, uint amount);

    fallback() external payable{
        emit Deposit(msg.sender, msg.value);
    }
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // send ETH
    event WithdrawETH(address indexed receiver, uint amount);
    function sendETH(address _to, uint _valueInWei) external onlyOwner returns(bool) {
        require(address(this).balance >= _valueInWei, "balance ain't enough");
        (bool success, ) = _to.call{value: _valueInWei}("");
        return success;
        emit WithdrawETH(_to, _valueInWei);
    }

    //event that emits when token is sent
    //I think I need safetransfer
    event WithdrawERC20(address indexed receiver, uint amount);

    function sendToken(IERC20 _token, address _to, uint _amount) external onlyOwner {
        _token.safeTransfer(_to, _amount);
        emit WithdrawERC20(_to, _amount);
    }
        
//  * Ability to send/receive tokens
// -> gotta USE IERC20, SafeERC20 to interact with tokens
// -> just use safeTransfer lib from openzeppelin.



//  * Ability to make allowance for tokens
// -> gotta inherit IERC20 to this wallet.
// -> I have never tried making a smart contract calling allowance function, gotta try.

// @Dev Please use this function for setting initial value of allowance, not for increasing
// or decreasing the allowance value
    event Allowance(address indexed spender, uint value);
    function approve(IERC20 _token, address _spender, uint _amount) external onlyOwner {
        _token.safeApprove(_to, _amount);
        emit Allowance(_spender, _amount);
    }

    event Allowance(address indexed spender, uint value);
    function allowanceIncrease(IERC20 _token, address _spender, uint _amount) external onlyOwner {
        _token.safeIncreaseAllowance(_to, _amount);
        emit Allowance(_spender, _amount);
    }

    event Allowance(address indexed spender, uint value);
    function allowanceDecrease(IERC20 _token, address _spender, uint _amount) external onlyOwner {
        _token.safeDecreaseAllowance(_to, _amount);
        emit Allowance(_spender, _amount);
    }

//  * There must be a method that changes the value of this fee
// -> I can just make the fee state variable with  a function that changes it. Onlyowner needed.

//  * Commission - is a certain number of the transferred amount
// -> for this I need to look at the original text from Russian... so do I need to
// make the fee absolute? or relative? I don't know yet.

//  * The transfer of this commission must be made along with the regular transfer
// I can just make this low-level call work twice. once for actual transfer, the other for comission.

//  * The address for the transfer is hardcoded into the contract
// -> okay. receiver addresse hardcoded.

}
