const ethers = require("ethers");
const { subject, object } = require("./endpoints");
const NFT_ABI = require("./erc721-abi");

const initialContracts = require("./initialContracts");

const SubjectHTTPProvider = new ethers.providers.JsonRpcProvider(subject.http);
const SubjectWebSocketProvider = new ethers.providers.WebSocketProvider(
  subject.socket
);

const BoredApeAddress = initialContracts[0];

const main = async () => {
  const provider = SubjectWebSocketProvider;

  const signer = provider.getSigner();

  const BoredApeContract = new ethers.Contract(
    BoredApeAddress,
    NFT_ABI,
    provider
  );

  console.log(await BoredApeContract.name());

  const { formatEther } = ethers.utils;

  //  event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

  //console.log(await BoredApeContract.deployed());

  const filters = BoredApeContract.filters.Transfer(null, null, null);

  const sleep = (timeout) =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(), timeout);
    });

  const queryBatch = async (from, skip, attempt = 1) => {
    if (skip === 0) {
      console.log("already fetched all blocks");
      return;
    }

    try {
      console.log(`fetching from block ${from} to ${from + skip - 1} ...`);
      const fileteredEvents = await BoredApeContract.queryFilter(
        filters,
        from,
        from + skip - 1
      );

      console.log(`found ${fileteredEvents.length} events.`);

      //await sleep(attempt < 50 ? 20 * attempt : 1000);
      const nextFrom = from + skip;
      const nextTo = from + 2 * skip;
      const lastBlock = await provider.getBlockNumber();
      if (nextFrom > lastBlock) {
        queryBatch(lastBlock, 0);
      } else if (nextTo > lastBlock) {
        queryBatch(nextFrom, lastBlock - nextFrom);
      } else {
        queryBatch(nextFrom, skip);
      }
    } catch (err) {
      const waitTime = 1000 * attempt;
      console.log(`some error happened, will retry in ${waitTime} sec`, err);
      await sleep(waitTime);
      return queryBatch(from, skip, attempt + 1);
    }
  };

  queryBatch(14005785, 2000);

  //BoredApeContract.on("Transfer", (from, to, amount, ev) => {
  //  console.log(`${from} sent ${formatEther(amount)} to ${to}`, ev);
  //});
};

main();


const ethers = require("ethers");
const TransferEventModel = require("./TransferEventModel");
const NFT_ABI = require("../../erc721-abi");

const subject = {
  http: "https://eth-mainnet.alchemyapi.io/v2/2MoNnUBVx3bh7_jgjEaHxu7hNVY1MWAJ",
  socket: "wss://eth-mainnet.alchemyapi.io/v2/2MoNnUBVx3bh7_jgjEaHxu7hNVY1MWAJ",
};

const SubjectWebSocketProvider = new ethers.providers.WebSocketProvider(
  subject.socket
);

const runner = async () => {
  const provider = SubjectWebSocketProvider;

  const signer = provider.getSigner();

  const targetBlock = 14187331;
  const contractAddress = "0xDf3407636bBF3a015a8E48A079ef7bA49E687fD3";
  const BoredApeAddress = contractAddress;

  const BoredApeContract = new ethers.Contract(
    BoredApeAddress,
    NFT_ABI,
    provider
  );

  const filters = BoredApeContract.filters.Transfer(null, null, null);

  const fileteredEvents = await BoredApeContract.queryFilter(
    filters,
    14187331,
    14187332
  );

  const TransferEvent = fileteredEvents[0];

  console.log(await SingleEventSaver(TransferEvent));
};

/*

MineContractEvents Runner

const runner = async () => {
  const SubjectWebSocketProvider = new ethers.providers.WebSocketProvider(
    subject.socket
  );

  const provider = SubjectWebSocketProvider;

  const startinBlock = 14007628; //12588780;
  const lastBlock = await provider.getBlockNumber();

  console.log(lastBlock);

  const contractAddress = "0x22c08c358f62f35b742d023bf2faf67e30e5376e";

  MineContractTransferEvents(contractAddress, startinBlock, lastBlock, (r) => {
    r.forEach((event) =>
      SingleEventSaver(event)
        .then((r) => console.log("event saved"))
        .catch((err) => console.log(err))
    );
  });
};

runner();

*/

runner();