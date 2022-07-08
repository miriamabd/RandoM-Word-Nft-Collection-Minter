import React from "react";

import { Container, Nav} from "react-bootstrap";
import { useContractKit } from "@celo-tools/use-contractkit";
import { Notification } from "./components/ui/Notifications";
import Wallet from "./components/Wallet";
import Cover from "./components/minter/Cover";
import Nfts from "./components/minter/nfts";
import { useBalance, useWordsContract } from "./hooks";

import "./App.css";

const App = function AppWrapper() {
  const { address, destroy, connect } = useContractKit();
  const { balance, getBalance } = useBalance();
  const minterContract = useWordsContract();

  return (
    <> 
      <Notification />
      {address ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              {/*display user wallet*/}
              <Wallet
                address={address}
                amount={balance.CELO}
                symbol="CELO"
                destroy={destroy}
              />
            </Nav.Item>

          </Nav>
          
          <main>
            <Nfts
              name="Words Collections"
              updateBalance={getBalance}
              minterContract={minterContract}
            />
          </main>
        </Container>
      ) : (
        <Cover name="Random Words Collections" coverImg="https://media.istockphoto.com/photos/magnetic-words-collection-picture-id177299085?k=20&m=177299085&s=612x612&w=0&h=11Hvc2hrj93--LZ4GqxHrwcliNLzTA916my75Em58bI=" connect={connect} />
      )}
    </>
  );
};

export default App;