

const format_data = (uri) =>
  JSON.parse(atob(uri.split("base64,")[1]).replaceAll("'", '"'));

export const createNft = async (minterContract, performActions) => {
  await performActions(async (kit) => {
    const { defaultAccount } = kit;

    try {
      // mint the NFT
      let transaction = await minterContract.methods
        .mint()
        .send({ from: defaultAccount });

      return transaction;
    } catch (error) {
      throw error;
    }
  });
};

export const getNfts = async (minterContract) => {
  try {
    const nfts = [];
    const nftsLength = await minterContract.methods.totalSupply().call();

    for (let i = 0; i < Number(nftsLength); i++) {
      const nft = new Promise(async (resolve) => {
        let meta = await minterContract.methods.tokenURI(i).call();
        meta = format_data(meta);
        const owner = await fetchNftOwner(minterContract, i);
        resolve({
          index: i,
          owner,
          name: meta.name,
          image: meta.image,
        });
      });
      nfts.push(nft);
    }
    return Promise.all(nfts);
  } catch (e) {
    throw e;
  }
};

export const fetchNftOwner = async (minterContract, index) => {
  try {
    return await minterContract.methods.ownerOf(index).call();
  } catch (e) {
    throw e;
  }
};



