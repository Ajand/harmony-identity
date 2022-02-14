const ethers = require("ethers");
const config = require("../endpoints");
const CollectionModel = require("./CollectionModel");

const ManagerAbi = require("../../data/abi/Manager.json");

const contractObj = {
  mainAddress: "0x22c08c358f62f35b742d023bf2faf67e30e5376e",
  name: "0xApes Trilogy",
  symbol: "0xApe",
  baseURI:
    "https://ipfs.io/ipfs/QmPyYXzqU7tsTxQ7WFN32iUKRy78T6ZiFGxYiJiv1TcoKE",
};

const AddMapping = () => {
  const provider = new ethers.providers.JsonRpcProvider(config.harmony);

  const ManagerContract = new ethers.Contract(
    config.manager,
    ManagerAbi,
    provider
  );

  const wallet = new ethers.Wallet(config.privateKey, provider);

  const signer = ManagerContract.connect(wallet);

  ManagerContract.getMappingAddress(
    "0x22C08C358f62f35B742D023Bf2fAF67e30e5376E"
  )
    .then((mappers) => console.log(mappers))
    .catch((err) => console.error(err));

  /* const coll = new CollectionModel(contractObj)

  coll.save()
*/

  /*ManagerContract.getMappers()
    .then((mappers) => console.log(mappers))
    .catch((err) => console.error(err)); */

  /* signer
    .addMapping(
      "0x22c08c358f62f35b742d023bf2faf67e30e5376e",
      "0xApes Trilogy",
      "0xApe",
      "https://ipfs.io/ipfs/QmPyYXzqU7tsTxQ7WFN32iUKRy78T6ZiFGxYiJiv1TcoKE"
    )
    .then((r) => console.log(r))
    .catch((err) => console.error(err)); */

  //const provider = ether

  // 0xB8f73F1884Cd31825178C3970A95e465E2c93360
};

module.exports = AddMapping;
