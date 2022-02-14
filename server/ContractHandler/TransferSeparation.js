const TransferSeparation = (ctrs) => {
  const mints = ctrs.filter(
    (ctr) => ctr.from === "0x0000000000000000000000000000000000000000"
  );

  const transfers = ctrs.filter(
    (ctr) =>
      ctr.from !== "0x0000000000000000000000000000000000000000" &&
      ctr.to !== "0x0000000000000000000000000000000000000000"
  );

  const burns = ctrs.filter(
    (ctr) => ctr.to === "0x0000000000000000000000000000000000000000"
  );

  return {
    mints,
    transfers,
    burns,
  };
};

module.exports = TransferSeparation;
