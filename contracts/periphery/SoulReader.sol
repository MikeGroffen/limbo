// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
import "../facades/LimboLike.sol";
import "../facades/LimboDAOLike.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SoulReader {
  struct Soul {
    uint256 lastRewardTimestamp; //I know masterchef counts by block but this is less reliable than timestamp.
    uint256 accumulatedFlanPerShare;
    uint256 crossingThreshold; //the value at which this soul is elligible to cross over to Behodler
    uint256 soulType;
    uint256 state;
    uint256 flanPerSecond;
  }

  function getLimbo(address _limbo) internal pure returns (LimboLike) {
    return LimboLike(_limbo);
  }

  function SoulStats(address token, address _limbo)
    public
    view
    returns (
      uint256, //state
      uint256, //staked balance
      uint256 //fps
    )
  {
    LimboLike limbo = getLimbo(_limbo);
    uint256 latestIndex = limbo.latestIndex(token);
    (, , , , uint256 state, uint256 fps) = limbo.souls(token, latestIndex);
    uint256 stakeBalance = IERC20(token).balanceOf(address(limbo));
    return (state, stakeBalance, fps);
  }

  function CrossingParameters(address token, address _limbo)
    public
    view
    returns (
      uint256, //initialCrossingbonus
      int256, //bonusDelta,
      uint256 //fps
    )
  {
    LimboLike limbo = getLimbo(_limbo);
    uint256 latestIndex = limbo.latestIndex(token);
    (, , , , , uint256 flanPerSecond) = limbo.souls(token, latestIndex);

    (, , int256 crossingBonusDelta, uint256 initialCrossingBonus, ) = limbo.tokenCrossingParameters(token, latestIndex);
    return (initialCrossingBonus, crossingBonusDelta, flanPerSecond);
  }

  function GetPendingReward(
    address account,
    address token,
    address _limbo
  ) external view returns (uint256) {
    LimboLike limbo = getLimbo(_limbo);
    uint256 latestIndex = limbo.latestIndex(token);
    Soul memory soul; //stack too deep avoidance
    (soul.lastRewardTimestamp, soul.accumulatedFlanPerShare, , , soul.state, soul.flanPerSecond) = limbo.souls(
      token,
      latestIndex
    );

    (, uint256 stakingEndTimestamp, , , ) = limbo.tokenCrossingParameters(token, latestIndex);
    uint256 finalTimeStamp = soul.state != 1 ? stakingEndTimestamp : block.timestamp;
    uint256 limboBalance = IERC20(token).balanceOf(address(limbo));

    (uint256 stakedAmount, uint256 rewardDebt, ) = limbo.userInfo(token, account, latestIndex);
    if (limboBalance > 0) {
      soul.accumulatedFlanPerShare =
        soul.accumulatedFlanPerShare +
        (((finalTimeStamp - soul.lastRewardTimestamp) * soul.flanPerSecond * (1e12)) / limboBalance);
    }
    uint256 accumulated = ((stakedAmount * soul.accumulatedFlanPerShare) / (1e12));
    if (accumulated >= rewardDebt) return accumulated - rewardDebt;
    return 0;
  }
}
