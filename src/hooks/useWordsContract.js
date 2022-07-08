import { useContract } from "./useContract";
import Words from "../contracts/Words.json";
import WordsAddress from "../contracts/WordsAddress.json";

// export interface for smart contract
export const useWordsContract = () =>
  useContract(Words.abi, WordsAddress.Words);
