const { expect } = require("chai");
const { ethers } = require("hardhat");

const boredApeData = [
  "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
  "BoredApe Yacht Club",
  "BAYC",
  "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/",
];

describe("Manager", async function () {
  let manager;

  it("Manager should be able to add new mappings", async function () {
    const Manager = await ethers.getContractFactory("Manager");
    const Mapper = await ethers.getContractFactory("ERC721Mapping");
    manager = await Manager.deploy();

    await manager.deployed();

    const mapping = await manager.addMapping(...boredApeData);

    const mappingAddress = await manager.getMappingAddress(boredApeData[0]);

    expect(mappingAddress).to.be.an("string");
    expect(mappingAddress).to.not.equal(
      "0x0000000000000000000000000000000000000000"
    );

    const managerAddress = manager.address;
    const mapper = Mapper.attach(mappingAddress);

    expect((await mapper.mainAddress()).toLowerCase()).to.equal(
      boredApeData[0]
    );
    expect(await mapper.name()).to.equal(boredApeData[1]);
    expect(await mapper.symbol()).to.equal(boredApeData[2]);
    expect(await mapper.baseURI()).to.equal(boredApeData[3]);
    expect((await mapper.manager()).toLowerCase()).to.equal(
      managerAddress.toLowerCase()
    );
    expect(await mapper.syncedBlock()).to.equal(0);

    const owner = await manager.owner();

    const mints = [
      {
        to: owner,
        tokenId: 0,
      },
      {
        to: owner,
        tokenId: 1,
      },
      {
        to: owner,
        tokenId: 2,
      },
      {
        to: owner,
        tokenId: 3,
      },
    ];

    await expect(mapper.mintBunch(mints)).to.not.be.reverted;
    await expect(mapper.mintBunch(mints)).to.be.reverted;
    expect((await mapper.ownerOf(0)).toLowerCase()).to.be.equal(
      owner.toLowerCase()
    );

    const dumbAddress = "0x6731d78ee337e9d11fdb60a33af5a1e6d9f018e5";

    const transfers = [
      {
        from: owner,
        to: dumbAddress,
        tokenId: 0,
      },
    ];

    await expect(mapper.transferBunch(transfers)).to.not.be.reverted;

    expect((await mapper.ownerOf(0)).toLowerCase()).to.be.equal(
      dumbAddress.toLowerCase()
    );

    expect((await mapper.ownerOf(1)).toLowerCase()).to.be.equal(
      owner.toLowerCase()
    );

    await expect(mapper.burnBunch([2, 3])).to.not.be.reverted;

    await expect(mapper.ownerOf(2)).to.be.reverted;
    await expect(mapper.ownerOf(3)).to.be.reverted;

    await expect(mapper.setSyncedBlock(100)).to.not.be.reverted;
    expect(await mapper.syncedBlock()).to.equal(100);

    await expect(mapper.transferFrom(owner, dumbAddress, 1)).to.be.reverted;

    await expect((await manager.getMappers()).length).to.equal(1);

    const secondManager = await Manager.deploy();

    await manager.changeManager(secondManager.address);

    expect((await mapper.manager()).toLowerCase()).to.not.equal(
      managerAddress.toLowerCase()
    );

    expect((await mapper.manager()).toLowerCase()).to.equal(
      secondManager.address.toLowerCase()
    );
  });
});
