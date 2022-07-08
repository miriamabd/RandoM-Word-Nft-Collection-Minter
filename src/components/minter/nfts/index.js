import { useContractKit } from "@celo-tools/use-contractkit";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import AddNfts from "./Add";
import Nft from "./Card";
import Loader from "../../ui/Loader";
import { NotificationSuccess, NotificationError } from "../../ui/Notifications";
import {
  getNfts,
  createNft,
} from "../../../utils/minter";
import { Row, Button } from "react-bootstrap";

const NftList = ({ minterContract, name }) => {
  const { performActions, address } = useContractKit();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onlyMine, setOnlyMine] = useState(false);

  const getAssets = useCallback(async () => {
    try {
      setLoading(true);
      const allNfts = await getNfts(minterContract);
      if (!allNfts) return;
      setNfts(allNfts);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }, [minterContract]);

  const addNft = async () => {
    try {
      setLoading(true);
      await createNft(minterContract, performActions);
      toast(<NotificationSuccess text="Updating Words...." />);
      getAssets();
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create Words. Try Again" />);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    try {
      if (address && minterContract) {
        getAssets();
      }
    } catch (error) {
      console.log({ error });
    }
  }, [minterContract, address, getAssets]);

  if (address) {
    return (
      <>
        {!loading ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Button
                variant="link"
                onClick={() => {
                  setOnlyMine(false);
                }}
              >
                <h1 className="fs-4 fw-bold mb-0 text-brown">{name}</h1>{" "}
              </Button>
              <Button variant="link" onClick={() => setOnlyMine(true)}>
                <h1 className="fs-4 fw-bold mb-0 text-brown">
                  {"My Words collection"}
                </h1>{" "}
              </Button>
              {<AddNfts save={addNft} address={address} />}
            </div>
            <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
              {!onlyMine
                ? nfts.map((_nft) => (
                    <Nft
                      key={_nft.index}
                      nft={{
                        ..._nft,
                      }}
                      client_address={address}
                    />
                  ))
                : nfts
                    .filter((_nft) => _nft.owner === address)
                    .map((_nft) => (
                      <Nft
                        key={_nft.index}
                        nft={{
                          ..._nft,
                        }}
                        client_address={address}
                      />
                    ))}
            </Row>
          </>
        ) : (
          <Loader />
        )}
      </>
    );
  }
  return null;
};

NftList.propTypes = {
  minterContract: PropTypes.instanceOf(Object),
  updateBalance: PropTypes.func.isRequired,
};

NftList.defaultProps = {
  minterContract: null,
};

export default NftList;
