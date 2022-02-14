const ethers = require("ethers");

const { subject } = require("../endpoints");
const NFT_ABI = require("../erc721-abi");

const SingleEventSaver = require("./Fetcher/SingleEventSaver");

const MineContractTransferEvents = async (
  contractAddress,
  startingBlock,
  endingBlock,
  cb
) => {
  const provider = new ethers.providers.WebSocketProvider(subject.socket);

  const NFTContract = new ethers.Contract(contractAddress, NFT_ABI, provider);

  const filters = NFTContract.filters.Transfer(null, null, null);

  console.log(contractAddress, startingBlock, endingBlock);

  const queryBatch = async (from, to, skip, attempt = 1) => {
    const sleep = (timeout) =>
      new Promise((resolve, reject) => {
        setTimeout(() => resolve(), timeout);
      });

    if (skip === 0) {
      console.log("already fetched all blocks");
      return;
    }

    try {
      console.log(`fetching from block ${from} to ${from + skip - 1} ...`);
      const fileteredEvents = await NFTContract.queryFilter(
        filters,
        from,
        from + skip - 1
      );

      cb(fileteredEvents);

      const nextFrom = from + skip;
      const nextTo = from + 2 * skip;
      const lastBlock =
        (await provider.getBlockNumber()) > to
          ? to
          : await provider.getBlockNumber();
      if (nextFrom > lastBlock) {
        queryBatch(lastBlock, to, 0);
      } else if (nextTo > lastBlock) {
        queryBatch(nextFrom, to, lastBlock - nextFrom);
      } else {
        queryBatch(nextFrom, to, skip);
      }
    } catch (err) {
      const waitTime = 1000 * attempt;
      console.log(`some error happened, will retry in ${waitTime} sec`, err);
      await sleep(waitTime);
      return queryBatch(from, skip, attempt + 1);
    }
  };

  queryBatch(startingBlock, endingBlock, 2000);
};

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

//runner();

module.exports = MineContractTransferEvents;
