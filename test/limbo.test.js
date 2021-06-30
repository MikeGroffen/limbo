const { expect, assert } = require("chai");
const { ethers, network } = require("hardhat");
const web3 = require("web3");

describe("Limbo", function () {
  let owner, secondPerson, feeSetter, dai, eye, link, sushi;
  let daiEYESLP, linkEYESLP, sushiEYESLP, daiSushiSLP;
  let daiEYEULP, linkEYEULP, sushiEYEULP, daiSushiULP;
  let dao, proposalFactory, updateProposalConfigProposal;
  const zero = "0x0000000000000000000000000000000000000000";

  beforeEach(async function () {
    [owner, secondPerson, proposalFactory] = await ethers.getSigners();

    const MockAngband = await ethers.getContractFactory("MockAngband");
    this.mockAngband = await MockAngband.deploy();

    const addTokenPowerFactory = await ethers.getContractFactory(
      "MockAddTokenPower"
    );
    this.addTokenPower = await addTokenPowerFactory.deploy();

    const MockBehodlerFactory = await ethers.getContractFactory("MockBehodler");
    this.mockBehodler = await MockBehodlerFactory.deploy(
      "Scarcity",
      "SCX",
      this.addTokenPower.address
    );

    const TransferHelperFactory = await ethers.getContractFactory(
      "TransferHelper"
    );
    const LimboDAOFactory = await ethers.getContractFactory("LimboDAO", {
      libraries: {
        TransferHelper: (await TransferHelperFactory.deploy()).address,
      },
    });

    this.limboDAO = await LimboDAOFactory.deploy();

    this.TokenFactory = await ethers.getContractFactory("MockToken");
    this.eye = await this.TokenFactory.deploy("eye", "eye", [], []);

    this.aave = await this.TokenFactory.deploy("aave", "aave", [], []);

    const flashGovernanceFactory = await ethers.getContractFactory(
      "FlashGovernanceArbiter"
    );
    this.flashGovernance = await flashGovernanceFactory.deploy(
      this.limboDAO.address
    );

    await this.flashGovernance.configureSecurityParameters(10, 100, 30);
    // await this.eye.approve(this.limbo.address, 2000);
    await this.flashGovernance.configureFlashGovernance(
      this.eye.address,
      1000,
      10,
      true
    );

    const FlanFactory = await ethers.getContractFactory("Flan");
    this.flan = await FlanFactory.deploy(this.limboDAO.address);

    const LimboFactory = await ethers.getContractFactory("Limbo");
    this.limbo = await LimboFactory.deploy(
      this.flan.address,
      10000000,
      this.limboDAO.address
    );

    await this.flan.whiteListMinting(this.limbo.address, true);
    await this.flan.endConfiguration();

    await this.addTokenPower.seed(
      this.mockBehodler.address,
      this.limbo.address
    );

    const UniswapFactoryFactory = await ethers.getContractFactory(
      "UniswapFactory"
    );

    const sushiSwapFactory = await UniswapFactoryFactory.deploy();
    const uniswapFactory = await UniswapFactoryFactory.deploy();

    const ProposalFactoryFactory = await ethers.getContractFactory(
      "ProposalFactory"
    );
    this.proposalFactory = await ProposalFactoryFactory.deploy();
    await this.proposalFactory.seed(this.limboDAO.address);

    await this.limboDAO.seed(
      this.limbo.address,
      this.flan.address,
      this.eye.address,
      this.proposalFactory.address,
      sushiSwapFactory.address,
      uniswapFactory.address,
      this.flashGovernance.address,
      [],
      []
    );

    await this.limbo.setDAO(this.limboDAO.address);

    await this.limboDAO.makeLive();

    const SoulReaderFactory = await ethers.getContractFactory("SoulReader");
    this.soulReader = await SoulReaderFactory.deploy(this.limboDAO.address);

    const UniswapHelperFactory = await ethers.getContractFactory(
      "UniswapHelper"
    );
    this.uniswapHelper = await UniswapHelperFactory.deploy(
      this.limbo.address,
      this.limboDAO.address
    );

    const migratorFactory = await ethers.getContractFactory("Migrator");
    this.migrator = await migratorFactory.deploy(
      this.limbo.address,
      this.mockAngband.address,
      this.uniswapHelper.address,
      this.mockBehodler.address,
      this.addTokenPower.address
    );

    await this.limbo.configureCrossingParameters(
      this.aave.address,
      1,
      1,
      true,
      10000010
    );

    await this.limbo.configureCrossingConfig(
      this.mockBehodler.address,
      this.migrator.address,
      10000000,
      10000
    );
  });

  const advanceTime = async (seconds) => {
    await network.provider.send("evm_increaseTime", [seconds]); //6 hours
    await network.provider.send("evm_mine");
  };

  const stringifyBigNumber = (b) => b.map((i) => i.toString());

  it("governance actions free to be invoked until configured set to true", async function () {
    //first invoke all of these successfully, then set config true and try again

    //onlySuccessfulProposal:
    //configureSoul
    await this.limbo.configureSoul(
      this.aave.address,
      100,
      10000000,
      0,
      0,
      0,
      0
    );
    await this.aave.transfer(this.limbo.address, 1000);
    //enableProtocol
    await this.limbo.enableProtocol();
    //governanceShutdown
    await this.limbo.governanceShutdown(this.aave.address);
    //withdrawERC20
    console.log(`secondPerson: ${secondPerson.address}`);
    await this.limbo.withdrawERC20(this.aave.address, secondPerson.address);
    expect(await this.aave.balanceOf(secondPerson.address)).to.equal(1000);
    //configureCrossingConfig

    await this.limbo.configureCrossingConfig(
      this.mockBehodler.address,
      this.migrator.address,
      10000000,
      10000
    );

    //governanceApproved:
    //disableProtocol
    await this.limbo.disableProtocol();
    await this.limbo.enableProtocol();
    //adjustSoul
    await this.limbo.adjustSoul(this.aave.address, 100, 1, 0, 1);
    //configureCrossingParameters

    await this.limbo.configureCrossingParameters(
      this.aave.address,
      1,
      1,
      true,
      10000010
    );

    await this.limbo.endConfiguration();

    await expect(
      this.limbo.configureSoul(this.aave.address, 100, 10000000, 0, 0, 0, 0)
    ).to.be.revertedWith("Limbo: governance action failed.");
    // await this.aave.transfer(this.limbo.address, 1000);
    // enableProtocol
    await expect(this.limbo.enableProtocol()).to.be.revertedWith(
      "Limbo: governance action failed."
    );
    //governanceShutdown

    //withdrawERC20

    await expect(
      this.limbo.withdrawERC20(this.aave.address, secondPerson.address)
    ).to.be.revertedWith("Limbo: governance action failed.");

    //configureCrossingConfig
    await expect(
      this.limbo.configureCrossingConfig(
        this.mockBehodler.address,
        this.migrator.address,
        10000000,
        10000
      )
    ).to.be.revertedWith("Limbo: governance action failed.");

    //governanceApproved:
    //disableProtocol
    await expect(this.limbo.disableProtocol()).to.be.revertedWith(
      "ERC20: transfer amount exceeds allowance"
    );
    await expect(this.limbo.enableProtocol()).to.be.revertedWith(
      "Limbo: governance action failed."
    );
    //adjustSoul
    await expect(
      this.limbo.adjustSoul(this.aave.address, 100, 1, 0, 1)
    ).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
    //configureCrossingParameters

    await expect(
      this.limbo.configureCrossingParameters(
        this.aave.address,
        1,
        1,
        true,
        10000010
      )
    ).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
  });

  it("old souls can be claimed from", async function () {
    //make a threshold pool.
    await this.limbo.configureSoul(
      this.aave.address,
      100,
      10000000,
      1,
      0,
      1,
      0
    );
    await this.limbo.endConfiguration();

    const flanBalanceBefore = await this.flan.balanceOf(owner.address);

    console.log((await this.flan.balanceOf(owner.address)).toString());
    //stake tokens
    await this.aave.approve(this.limbo.address, "10000001");
    await this.limbo.stake(this.aave.address, "10000");
    console.log((await this.flan.balanceOf(owner.address)).toString());
    //fast forward time
    await advanceTime(90000); //just over a day

    //stake enough tokens to cross threshold
    await this.limbo.stake(this.aave.address, "9990001");
    console.log((await this.flan.balanceOf(owner.address)).toString());
    //assert soul state change
    const stats = await this.soulReader.SoulStats(this.aave.address);
    expect(stats[0].toString()).to.equal("2");
    expect(stats[1].toString()).to.equal("10000001");
    //claim

    await this.limbo.claimReward(this.aave.address, 0);
    const flanBalanceAfter = await this.flan.balanceOf(owner.address);
    console.log((await this.flan.balanceOf(owner.address)).toString());
    expect(flanBalanceAfter.sub(flanBalanceBefore).toString()).to.equal(
      "9999999"
    );
  });

  it("old souls can be bonus claimed from (DELTA = 0)", async function () {
    //make a threshold pool.
    await this.limbo.configureSoul(
      this.aave.address,
      100,
      10000000,
      1,
      0,
      1,
      0
    );

    await this.limbo.configureCrossingParameters(
      this.aave.address,
      21000000,
      0,
      true,
      10000000
    );

    await this.limbo.endConfiguration();

    const flanBalanceBefore = await this.flan.balanceOf(owner.address);

    console.log((await this.flan.balanceOf(owner.address)).toString());
    //stake tokens
    await this.aave.approve(this.limbo.address, "10000001");
    await this.limbo.stake(this.aave.address, "10000");
    console.log((await this.flan.balanceOf(owner.address)).toString());
    //fast forward time
    await advanceTime(90000); //just over a day

    //stake enough tokens to cross threshold
    await this.limbo.stake(this.aave.address, "9990001");
    console.log((await this.flan.balanceOf(owner.address)).toString());
    //assert soul state change
    const stats = await this.soulReader.SoulStats(this.aave.address);
    expect(stats[0].toString()).to.equal("2");
    expect(stats[1].toString()).to.equal("10000001");
    //claim

    await this.limbo.claimBonus(this.aave.address, 0);

    const flanBalanceAfter = await this.flan.balanceOf(owner.address);
    console.log((await this.flan.balanceOf(owner.address)).toString());
    expect(flanBalanceAfter.sub(flanBalanceBefore).toString()).to.equal(
      "210" //crossing bonus * staked tokens.
    );
  });

  it("old souls can be bonus claimed from (DELTA > 0)", async function () {
    //make a threshold pool.
    await this.limbo.configureSoul(
      this.aave.address,
      100,
      10000000,
      1,
      0,
      1,
      0
    );

    await this.limbo.configureCrossingParameters(
      this.aave.address,
      21000000,
      10000000,
      true,
      10000000
    );

    await this.limbo.endConfiguration();

    const flanBalanceBefore = await this.flan.balanceOf(owner.address);

    console.log((await this.flan.balanceOf(owner.address)).toString());
    //stake tokens
    await this.aave.approve(this.limbo.address, "10000001");
    await this.limbo.stake(this.aave.address, "10000");
    console.log((await this.flan.balanceOf(owner.address)).toString());
    //fast forward time
    await advanceTime(90000); //just over a day

    //stake enough tokens to cross threshold
    await this.limbo.stake(this.aave.address, "9990001");
    console.log((await this.flan.balanceOf(owner.address)).toString());
    //assert soul state change
    const stats = await this.soulReader.SoulStats(this.aave.address);
    expect(stats[0].toString()).to.equal("2");
    expect(stats[1].toString()).to.equal("10000001");

    await this.limbo.claimBonus(this.aave.address, 0);

    const flanBalanceAfter = await this.flan.balanceOf(owner.address);
    console.log((await this.flan.balanceOf(owner.address)).toString());
    expect(flanBalanceAfter.sub(flanBalanceBefore).toString()).to.equal(
      "9000710" //crossing bonus * staked tokens.
    );
  });

  it("old souls can be bonus claimed from (DELTA < 0)", async function () {
    //make a threshold pool.
    await this.limbo.configureSoul(
      this.aave.address,
      100,

      10000000,
      1,
      0,
      1,
      0
    );

    await this.limbo.configureCrossingParameters(
      this.aave.address,
      20000000000,
      "-1000",
      true,
      10000000
    );

    await this.limbo.endConfiguration();

    const flanBalanceBefore = await this.flan.balanceOf(owner.address);

    console.log((await this.flan.balanceOf(owner.address)).toString());
    //stake tokens
    await this.aave.approve(this.limbo.address, "10000001");
    await this.limbo.stake(this.aave.address, "10000");
    console.log((await this.flan.balanceOf(owner.address)).toString());
    //fast forward time
    await advanceTime(44000); //half a day

    //stake enough tokens to cross threshold
    await this.limbo.stake(this.aave.address, "9990001");
    console.log((await this.flan.balanceOf(owner.address)).toString());
    //assert soul state change
    const stats = await this.soulReader.SoulStats(this.aave.address);
    expect(stats[0].toString()).to.equal("2");
    expect(stats[1].toString()).to.equal("10000001");

    await this.limbo.claimBonus(this.aave.address, 0);

    const flanBalanceAfter = await this.flan.balanceOf(owner.address);
    console.log((await this.flan.balanceOf(owner.address)).toString());
    expect(flanBalanceAfter.sub(flanBalanceBefore).toString()).to.equal(
      "199559" //crossing bonus * staked tokens.
    );
  });

  it("perpetual pools have no upper limit", async function () {
    //make a threshold pool.
    await this.limbo.configureSoul(
      this.aave.address,
      100,
      10000000,
      2,
      0,
      1,
      0
    );

    await this.limbo.configureCrossingParameters(
      this.aave.address,
      20000000000,
      "-1000",
      true,
      10000000
    );

    await this.limbo.endConfiguration();

    await this.aave.approve(this.limbo.address, "10000001");
    await this.limbo.stake(this.aave.address, "10000001");

    const stats = await this.soulReader.SoulStats(this.aave.address);
    expect(stats[0].toNumber()).to.equal(1);
  });

  it("use flashGovernance to adjustSoul", async function () {
    //configure soul
    await this.limbo.configureSoul(
      this.aave.address,
      100,
      10000000,
      2,
      0,
      1,
      0
    );

    await this.limbo.configureCrossingParameters(
      this.aave.address,
      20000000000,
      "-1000",
      true,
      10000000
    );

    //set flash loan params
    await this.flashGovernance.configureFlashGovernance(
      this.eye.address,
      21000000, //amount to stake
      604800, //lock duration = 1 week,
      true // asset is burnable
    );
    await this.flashGovernance.endConfiguration();
    //end configuration
    await this.limbo.endConfiguration();

    //try to adjust soul and fail
    await expect(
      this.limbo.adjustSoul(this.aave.address, 100, 1, 10, 1)
    ).to.be.revertedWith("ERC20: transfer amount exceeds allowance");

    //stake requisite tokens, try again and succeed.
    await this.eye.approve(this.flashGovernance.address, 21000000);
    await this.limbo.adjustSoul(this.aave.address, 100, 1, 20000000001, -1001);

    const newStates = await this.soulReader.CrossingParameters(
      this.aave.address
    );

    //assert newStates
    const stringNewStates = stringifyBigNumber(newStates);
    expect(stringNewStates[0]).to.equal("100");
    expect(stringNewStates[1]).to.equal("1");
    expect(stringNewStates[2]).to.equal("20000000001");
    expect(stringNewStates[3]).to.equal("-1001");
  });

  it("flashGovernance adjust configureCrossingParameters", async function () {
    //set flash loan params
    await this.flashGovernance.configureFlashGovernance(
      this.eye.address,
      21000000, //amount to stake
      604800, //lock duration = 1 week,
      true // asset is burnable
    );
    await this.flashGovernance.endConfiguration();
    //end configuration
    await this.limbo.endConfiguration();
    await this.eye.approve(this.flashGovernance.address, 21000000);
    await this.limbo.configureCrossingParameters(
      this.aave.address,
      1,
      1,
      true,
      10000010
    );

    await expect(
      this.flashGovernance.withdrawGovernanceAsset(
        this.limbo.address,
        this.eye.address
      )
    ).to.be.revertedWith("Limbo: Flashgovernance decision pending.");

    await advanceTime(604801);

    const eyeBalanceBefore = await this.eye.balanceOf(owner.address);
    await this.flashGovernance.withdrawGovernanceAsset(
      this.limbo.address,
      this.eye.address
    );
    const eyeBalanceAfter = await this.eye.balanceOf(owner.address);

    expect(eyeBalanceAfter.sub(eyeBalanceBefore).toString()).to.equal(
      "21000000"
    );
  });

  it("burn asset for flashGov decision", async function () {
    //set flash loan params
    await this.flashGovernance.configureFlashGovernance(
      this.eye.address,
      21000000, //amount to stake
      604800, //lock duration = 1 week,
      true // asset is burnable
    );
    await this.flashGovernance.endConfiguration();
    //end configuration
    await this.limbo.endConfiguration();

    //make flashgovernance decision.
    await this.eye.approve(this.flashGovernance.address, 21000000);
    await this.limbo.configureCrossingParameters(
      this.aave.address,
      1,
      1,
      true,
      10000010
    );

    // //we need fate to lodge proposal.
    const requiredFate = (await this.limboDAO.proposalConfig())[1];
    const eyeToBurn = requiredFate.mul(2).div(10).add(1);
    console.log("EYE to burn " + eyeToBurn.toString());
    await this.eye.approve(this.limboDAO.address, eyeToBurn.mul(100));
    await this.limboDAO.burnAsset(this.eye.address, eyeToBurn);

    //configure and lodge proposal
    const burnFlashStakeProposalFactory = await ethers.getContractFactory(
      "BurnFlashStakeDeposit"
    );
    const burnFlashStakeProposal = await burnFlashStakeProposalFactory.deploy(
      this.limboDAO.address,
      "burnFlash"
    );
    await burnFlashStakeProposal.parameterize(
      owner.address,
      this.eye.address,
      "21000000",
      this.flashGovernance.address,
      this.limbo.address
    );
    await this.proposalFactory.toggleWhitelistProposal(
      burnFlashStakeProposal.address
    );
    await this.proposalFactory.lodgeProposal(burnFlashStakeProposal.address);
    let currentProposal = await this.limboDAO.currentProposal();
    console.log("proposal: " + currentProposal);
    expect(
      currentProposal.toString() !==
        "0x0000000000000000000000000000000000000000"
    ).to.be.true;

    //get more fate to vote
    await this.limboDAO.burnAsset(this.eye.address, "10000");

    //vote on proposal
    await this.limboDAO.vote(burnFlashStakeProposal.address, "10000");

    const flashGovConfig = await this.flashGovernance.flashGovernanceConfig();
    const advancement = flashGovConfig[2].sub(1000);
    console.log("advancement: " + advancement.toString());
    //fast forward time to after voting round finishes but before flash asset unlocked
    await advanceTime(advancement.toNumber()); //more time

    //assert eye locked for user
    const pendingBeforeAttempt =
      await this.flashGovernance.pendingFlashDecision(
        this.limbo.address,
        owner.address
      );
    expect(pendingBeforeAttempt[1].toString()).to.equal("21000000");

    //try to withdraw flash gov asset and fail. Assert money still there
    await expect(
      this.flashGovernance.withdrawGovernanceAsset(
        this.limbo.address,
        this.eye.address
      )
    ).to.be.revertedWith("Limbo: Flashgovernance decision pending.");

    //execute burn proposal

    const eyeTotalsupplyBefore = await this.eye.totalSupply();
    const eyeInFlashGovBefore = await this.eye.balanceOf(
      this.flashGovernance.address
    );

    await this.limboDAO.executeCurrentProposal();

    const eyeInFlashGovAfter = await this.eye.balanceOf(
      this.flashGovernance.address
    );
    const eyeTotalsupplyAfter = await this.eye.totalSupply();
    const pendingAfterAttempt = await this.flashGovernance.pendingFlashDecision(
      this.limbo.address,
      owner.address
    );

    expect(pendingAfterAttempt[1].toString()).to.equal("21000000");
    //assert eye has declined by 21000000
    expect(eyeInFlashGovBefore.sub(eyeInFlashGovAfter).toString()).to.equal(
      "21000000"
    );
    expect(eyeTotalsupplyBefore.sub(eyeTotalsupplyAfter).toString()).to.equal(
      "21000000"
    );
  });

  it("unstaking rewards user correctly and sets unclaimed to zero", async function () {
    //make a threshold pool.
    await this.limbo.configureSoul(
      this.aave.address,
      100, //alloc
      10000000, //crossingThreshold
      1, //soulType
      0, //exitPenalty
      1, //state
      0
    );
    await this.limbo.endConfiguration();

    //stake tokens
    await this.aave.approve(this.limbo.address, "10000001");
    await this.limbo.stake(this.aave.address, "10000");

    await advanceTime(400000);

    const userInfoBeforeUntake = await this.limbo.userInfo(
      this.aave.address,
      owner.address,
      0
    );
    expect(userInfoBeforeUntake[0].toNumber()).to.equal(10000);

    const flanPerSecond = await this.limbo.flanPerSecond();
    const expectedFlan = flanPerSecond.mul(400001).toString(); // only staker, 1 second extra
    const userFlanBalanceBefore = await this.flan.balanceOf(owner.address);

    await this.limbo.unstake(this.aave.address, 0, 4000);
    const userFlanBalanceAfter = await this.flan.balanceOf(owner.address);

    const userInfoAfterUnstake = await this.limbo.userInfo(
      this.aave.address,
      owner.address,
      0
    );

    expect(userFlanBalanceAfter.sub(userFlanBalanceBefore).toString()).to.equal(
      expectedFlan
    );
    expect(userInfoAfterUnstake[0].toNumber()).to.equal(6000);
  });

  it("staking and claim for multiple stakers divides reward correctly", async function () {
    //make a threshold pool.
    await this.limbo.configureSoul(
      this.aave.address,
      100, //alloc
      10000000, //crossingThreshold
      1, //soulType
      0, //exitPenalty
      1, //state
      0
    );
    await this.limbo.endConfiguration();

    const flanPerSecond = await this.limbo.flanPerSecond();

    //stake tokens
    await this.aave.approve(this.limbo.address, "10000001");
    await this.limbo.stake(this.aave.address, "10000");
    await this.aave.transfer(secondPerson.address, 2000);
    await this.aave
      .connect(secondPerson)
      .approve(this.limbo.address, "10000001");
    await this.limbo.connect(secondPerson).stake(this.aave.address, 2000);

    await advanceTime(400000);
    const expectedFlan = flanPerSecond.mul(400001);

    const userFlanBalanceBefore = await this.flan.balanceOf(owner.address);

    await this.limbo.unstake(this.aave.address, 0, 4000);
    const userFlanBalanceAfter = await this.flan.balanceOf(owner.address);

    const userInfoAfterUnstake = await this.limbo.userInfo(
      this.aave.address,
      owner.address,
      0
    );

    expect(userFlanBalanceAfter.sub(userFlanBalanceBefore).toString()).to.equal(
      "3333371666666" // 83%
    );
    expect(userInfoAfterUnstake[0].toNumber()).to.equal(6000);
  });

  it("staking and claim for mutilple souls divides rewards according to allocpoints", async function () {
    //make another token
    this.whacked = await this.TokenFactory.deploy(
      "mcaffee",
      "epsteined",
      [],
      []
    );

    //configure another token to stake
    await this.limbo.configureSoul(
      this.whacked.address,
      300, //alloc
      10000000, //crossingThreshold
      1, //soulType
      0, //exitPenalty
      1, //state
      0
    );

    //make a threshold pool.
    await this.limbo.configureSoul(
      this.aave.address,
      100, //alloc
      10000000, //crossingThreshold
      1, //soulType
      0, //exitPenalty
      1, //state
      0
    );
    await this.limbo.endConfiguration();

    //stake tokens
    await this.aave.approve(this.limbo.address, "10000001");
    await this.limbo.stake(this.aave.address, "10000");

    await advanceTime(400000);

    const userInfoBeforeUntake = await this.limbo.userInfo(
      this.aave.address,
      owner.address,
      0
    );
    expect(userInfoBeforeUntake[0].toNumber()).to.equal(10000);

    const flanPerSecond = await this.limbo.flanPerSecond();
    const expectedFlan = flanPerSecond.mul(400001).div(4).toString(); // quarter rewards because sharing with other token
    const userFlanBalanceBefore = await this.flan.balanceOf(owner.address);

    await this.limbo.unstake(this.aave.address, 0, 4000);
    const userFlanBalanceAfter = await this.flan.balanceOf(owner.address);

    const userInfoAfterUnstake = await this.limbo.userInfo(
      this.aave.address,
      owner.address,
      0
    );

    expect(userFlanBalanceAfter.sub(userFlanBalanceBefore).toString()).to.equal(
      expectedFlan
    );
    expect(userInfoAfterUnstake[0].toNumber()).to.equal(6000);
  });

  it("staking/unstaking only possible in staking state", async function () {
    await this.limbo.configureSoul(
      this.aave.address,
      100, //alloc
      10000000, //crossingThreshold
      1, //soulType
      0, //exitPenalty
      1, //state
      0
    );
    await this.limbo.endConfiguration();

    //stake tokens
    await this.aave.approve(this.limbo.address, "10000001");
    await this.limbo.stake(this.aave.address, "10000");

    const updateSoulConfigProposalFactory = await ethers.getContractFactory(
      "UpdateSoulConfigProposal"
    );
    const updateSoulConfigProposal =
      await updateSoulConfigProposalFactory.deploy(
        this.limboDAO.address,
        "change state",
        this.limbo.address
      );

    await updateSoulConfigProposal.parameterize(
      this.aave.address,
      100,
      10000000,
      1,
      0,
      2,
      0
    );

    const proposalConfig = await this.limboDAO.proposalConfig();
    const requiredFate = proposalConfig[1].mul(2);
    await this.eye.approve(this.limboDAO.address, requiredFate);
    await this.eye.mint(requiredFate);
    await this.limboDAO.burnAsset(this.eye.address, requiredFate);

    await this.proposalFactory.toggleWhitelistProposal(
      updateSoulConfigProposal.address
    );
    await this.proposalFactory.lodgeProposal(updateSoulConfigProposal.address);

    await this.limboDAO.vote(updateSoulConfigProposal.address, 1000);

    await advanceTime(6048010);
    await this.limboDAO.executeCurrentProposal();

    await expect(
      this.limbo.stake(this.aave.address, "10000")
    ).to.be.revertedWith("E2");

    await expect(
      this.limbo.unstake(this.aave.address, 0, "10000")
    ).to.be.revertedWith("E2");
  });

  it("staking an invalid token fails", async function () {});

  it("aggregate rewards per token per second aligns with configuration and adds up to flan per second.", async function () {});
  it("unstaking with exitPenalty > 1000 reverts with E3", async function () {});
  it("unstaking amount larger than balance reverts with E4", async function () {});
  it("unstaking with exitPenalty > 0 incurs penalty on claims  ", async function () {});
  it("claims disabled on exitPenalty>0", async function () {});
  it("claiming staked reward resets unclaimed to zero", async function () {});
  it("claim bonus ", async function () {});
  it("claim bonus disabled during staking", async function () {});
  it("claiming negative bonus fails", async function () {});
  it("withdrawERC20 fails on souls", async function () {});
  it("withdrawERC20 fails on souls", async function () {});
  it("withdrawERC20 succeeds on non listed tokens or previously listed tokens.", async function () {});
  it("migration fails on not waitingToCross", async function () {});
  it("stamping reserves requires wait to pass before migration", async function () {});
  it("too much reserve drift between stamping and execution fails (divergenceTolerance)", async function () {});
  it("only threshold souls can migrate", async function () {});
  it("SCX burnt leaves rectangle of fairness.", async function () {});
  it("Flan price and liquidity higher post migration.", async function () {});
  it("soul changed to crossedOver post migration", async function () {});
  it("token tradeable on Behodler post migration.", async function () {});
  it("any whitelisted contract can mint flan", async function () {});
  it("flash governance max tolerance respected", async function () {});
  it("flan burn fee on transfer proposal", async function () {});
});
