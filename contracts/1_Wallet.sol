//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


// owner here will be the service provider
// 220303 19:09 KST I should probably make a different role for users

contract Wallet is Ownable {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");
    //@Dev deployer of this contract will be the Owner and fee taker of this contract.

    address serviceProvider;

    constructor(address user) {
        serviceProvider=msg.sender;
        _setupRole(USER_ROLE, user);
    }
 
    //@Dev Owner of this contract and change fee
    uint fee = 100000;

    event ChangedFee(uint newFee);
    function changeFee(uint _new) external onlyOwner {
        fee = _new;
        emit ChangedFee(fee);
    }



    //@Dev to receiv ETH
    event Deposit(address indexed sender, uint amount);

    fallback() external payable{
        emit Deposit(msg.sender, msg.value);
    }
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // send ETH
    event WithdrawETH(address indexed receiver, uint amount);
    function sendETH(address _to, uint _valueInWei) external returns(bool) {
        require(hasRole(USER_ROLE, msg.sender), "Caller is not our user");
        require(address(this).balance >= _valueInWei, "balance ain't enough");
        (bool success1, ) = serviceProvider.call{value: fee}("");
        require(success1, "fee payment failed");
        uint rest = _valueInWei.sub(fee);
        (bool success2, ) = _to.call{value: rest}("");
        return success2;
        emit WithdrawETH(_to, rest);
    }

    //event that emits when token is sent
    //I think I need safetransfer
    event WithdrawERC20(address indexed receiver, uint amount);

    function sendToken(IERC20 _token, address _to, uint _amount) external {
        require(hasRole(USER_ROLE, msg.sender), "Caller is not our user");
        require(_token.balanceOf(address(this)) >= _amount, "Not enough tokens");
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
    function approve(IERC20 _token, address _spender, uint _amount) external {
        require(hasRole(USER_ROLE, msg.sender), "Caller is not our user");
        _token.safeApprove(_spender, _amount);
        emit Allowance(_spender, _amount);
    }

    function allowanceIncrease(IERC20 _token, address _spender, uint _amount) external {
        require(hasRole(USER_ROLE, msg.sender), "Caller is not our user");
        _token.safeIncreaseAllowance(_spender, _amount);
        emit Allowance(_spender, _amount);
    }

    function allowanceDecrease(IERC20 _token, address _spender, uint _amount) external {
        require(hasRole(USER_ROLE, msg.sender), "Caller is not our user");
        _token.safeDecreaseAllowance(_spender, _amount);
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
