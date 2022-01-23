/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { AngbandLike, AngbandLikeInterface } from "../AngbandLike";

const _abi = [
  {
    inputs: [],
    name: "POWERREGISTRY",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32",
      },
    ],
    name: "getAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "behodler",
        type: "address",
      },
      {
        internalType: "address",
        name: "lachesis",
        type: "address",
      },
    ],
    name: "setBehodler",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class AngbandLike__factory {
  static readonly abi = _abi;
  static createInterface(): AngbandLikeInterface {
    return new utils.Interface(_abi) as AngbandLikeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AngbandLike {
    return new Contract(address, _abi, signerOrProvider) as AngbandLike;
  }
}
