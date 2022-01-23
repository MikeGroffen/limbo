/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  AdjustFlanFeeOnTransferProposal,
  AdjustFlanFeeOnTransferProposalInterface,
} from "../AdjustFlanFeeOnTransferProposal";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "dao",
        type: "address",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "orchestrateExecute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "flan",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "fee",
        type: "uint8",
      },
    ],
    name: "parameterize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "params",
    outputs: [
      {
        internalType: "address",
        name: "flan",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "fee",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000ea838038062000ea8833981810160405281019062000037919062000268565b816000805462000047906200038b565b80601f016020809104026020016040519081016040528092919081815260200182805462000075906200038b565b8015620000c65780601f106200009a57610100808354040283529160200191620000c6565b820191906000526020600020905b815481529060010190602001808311620000a857829003601f168201915b505050505081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060009080519060200190620001249291906200012f565b505050505062000480565b8280546200013d906200038b565b90600052602060002090601f016020900481019282620001615760008555620001ad565b82601f106200017c57805160ff1916838001178555620001ad565b82800160010185558215620001ad579182015b82811115620001ac5782518255916020019190600101906200018f565b5b509050620001bc9190620001c0565b5090565b5b80821115620001db576000816000905550600101620001c1565b5090565b6000620001f6620001f084620002eb565b620002c2565b9050828152602081018484840111156200020f57600080fd5b6200021c84828562000355565b509392505050565b600081519050620002358162000466565b92915050565b600082601f8301126200024d57600080fd5b81516200025f848260208601620001df565b91505092915050565b600080604083850312156200027c57600080fd5b60006200028c8582860162000224565b925050602083015167ffffffffffffffff811115620002aa57600080fd5b620002b8858286016200023b565b9150509250929050565b6000620002ce620002e1565b9050620002dc8282620003c1565b919050565b6000604051905090565b600067ffffffffffffffff82111562000309576200030862000426565b5b620003148262000455565b9050602081019050919050565b60006200032e8262000335565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60005b838110156200037557808201518184015260208101905062000358565b8381111562000385576000848401525b50505050565b60006002820490506001821680620003a457607f821691505b60208210811415620003bb57620003ba620003f7565b5b50919050565b620003cc8262000455565b810181811067ffffffffffffffff82111715620003ee57620003ed62000426565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b620004718162000321565b81146200047d57600080fd5b50565b610a1880620004906000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80633e7f6c64146100515780635f674f4a1461005b5780637284e41614610077578063cff0ab9614610095575b600080fd5b6100596100b4565b005b6100756004803603810190610070919061054d565b610203565b005b61007f610381565b60405161008c919061070c565b60405180910390f35b61009d61040f565b6040516100ab9291906106e3565b60405180910390f35b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561014b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101429061076e565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101b09061072e565b60405180910390fd5b6101c161044e565b610200576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f79061078e565b60405180910390fd5b50565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166364c5ce866040518163ffffffff1660e01b815260040160a06040518083038186803b15801561026d57600080fd5b505afa158015610281573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102a59190610589565b9450505050503073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561031a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103119061074e565b60405180910390fd5b82600260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260000160146101000a81548160ff021916908360ff160217905550505050565b6000805461038e90610861565b80601f01602080910402602001604051908101604052809291908181526020018280546103ba90610861565b80156104075780601f106103dc57610100808354040283529160200191610407565b820191906000526020600020905b8154815290600101906020018083116103ea57829003601f168201915b505050505081565b60028060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060000160149054906101000a900460ff16905082565b6000600260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166304a3692d600260000160149054906101000a900460ff166040518263ffffffff1660e01b81526004016104c091906107ae565b600060405180830381600087803b1580156104da57600080fd5b505af11580156104ee573d6000803e3d6000fd5b505050506001905090565b6000813590506105088161099d565b92915050565b60008151905061051d8161099d565b92915050565b600081519050610532816109b4565b92915050565b600081359050610547816109cb565b92915050565b6000806040838503121561056057600080fd5b600061056e858286016104f9565b925050602061057f85828601610538565b9150509250929050565b600080600080600060a086880312156105a157600080fd5b60006105af88828901610523565b95505060206105c088828901610523565b94505060406105d18882890161050e565b93505060606105e288828901610523565b92505060806105f38882890161050e565b9150509295509295909350565b610609816107e5565b82525050565b600061061a826107c9565b61062481856107d4565b935061063481856020860161082e565b61063d816108c2565b840191505092915050565b6000610655601d836107d4565b9150610660826108d3565b602082019050919050565b60006106786019836107d4565b9150610683826108fc565b602082019050919050565b600061069b6015836107d4565b91506106a682610925565b602082019050919050565b60006106be6026836107d4565b91506106c98261094e565b604082019050919050565b6106dd81610821565b82525050565b60006040820190506106f86000830185610600565b61070560208301846106d4565b9392505050565b60006020820190508181036000830152610726818461060f565b905092915050565b6000602082019050818103600083015261074781610648565b9050919050565b600060208201905081810360008301526107678161066b565b9050919050565b600060208201905081810360008301526107878161068e565b9050919050565b600060208201905081810360008301526107a7816106b1565b9050919050565b60006020820190506107c360008301846106d4565b92915050565b600081519050919050565b600082825260208201905092915050565b60006107f0826107f7565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b8381101561084c578082015181840152602081019050610831565b8381111561085b576000848401525b50505050565b6000600282049050600182168061087957607f821691505b6020821081141561088d5761088c610893565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b7f50524f504f53414c3a206f6e6c792044414f2063616e20696e766f6b65000000600082015250565b7f4c696d626f44414f3a2070726f706f73616c206c6f636b656400000000000000600082015250565b7f50524f504f53414c3a2044414f206e6f74207365740000000000000000000000600082015250565b7f4c696d626f44414f3a20657865637574696f6e206f662070726f706f73616c2060008201527f6661696c65640000000000000000000000000000000000000000000000000000602082015250565b6109a6816107e5565b81146109b157600080fd5b50565b6109bd81610817565b81146109c857600080fd5b50565b6109d481610821565b81146109df57600080fd5b5056fea26469706673582212203d2ccf2673fc178af655d5dba4c30f3e4d3f6e22455f97eb76f3bbccc773b42f64736f6c63430008040033";

export class AdjustFlanFeeOnTransferProposal__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    dao: string,
    _description: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AdjustFlanFeeOnTransferProposal> {
    return super.deploy(
      dao,
      _description,
      overrides || {}
    ) as Promise<AdjustFlanFeeOnTransferProposal>;
  }
  getDeployTransaction(
    dao: string,
    _description: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(dao, _description, overrides || {});
  }
  attach(address: string): AdjustFlanFeeOnTransferProposal {
    return super.attach(address) as AdjustFlanFeeOnTransferProposal;
  }
  connect(signer: Signer): AdjustFlanFeeOnTransferProposal__factory {
    return super.connect(signer) as AdjustFlanFeeOnTransferProposal__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AdjustFlanFeeOnTransferProposalInterface {
    return new utils.Interface(
      _abi
    ) as AdjustFlanFeeOnTransferProposalInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AdjustFlanFeeOnTransferProposal {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as AdjustFlanFeeOnTransferProposal;
  }
}
