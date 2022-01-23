/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { UniswapPair, UniswapPairInterface } from "../UniswapPair";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
    name: "owner",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
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
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "transferAndCall",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620027fe380380620027fe83398181016040528101906200003791906200045c565b8181818181600390805190602001906200005392919062000323565b5080600490805190602001906200006c92919062000323565b5050506200008f620000836200010460201b60201c565b6200010c60201b60201c565b505082600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000fb620000e66200010460201b60201c565b678ac7230489e80000620001d260201b60201c565b505050620007e9565b600033905090565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141562000245576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200023c906200051c565b60405180910390fd5b8060026000828254620002599190620005cb565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254620002b09190620005cb565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516200031791906200053e565b60405180910390a35050565b82805462000331906200069c565b90600052602060002090601f016020900481019282620003555760008555620003a1565b82601f106200037057805160ff1916838001178555620003a1565b82800160010185558215620003a1579182015b82811115620003a057825182559160200191906001019062000383565b5b509050620003b09190620003b4565b5090565b5b80821115620003cf576000816000905550600101620003b5565b5090565b6000620003ea620003e48462000584565b6200055b565b9050828152602081018484840111156200040357600080fd5b6200041084828562000666565b509392505050565b6000815190506200042981620007cf565b92915050565b600082601f8301126200044157600080fd5b815162000453848260208601620003d3565b91505092915050565b6000806000606084860312156200047257600080fd5b6000620004828682870162000418565b935050602084015167ffffffffffffffff811115620004a057600080fd5b620004ae868287016200042f565b925050604084015167ffffffffffffffff811115620004cc57600080fd5b620004da868287016200042f565b9150509250925092565b6000620004f3601f83620005ba565b91506200050082620007a6565b602082019050919050565b62000516816200065c565b82525050565b600060208201905081810360008301526200053781620004e4565b9050919050565b60006020820190506200055560008301846200050b565b92915050565b6000620005676200057a565b9050620005758282620006d2565b919050565b6000604051905090565b600067ffffffffffffffff821115620005a257620005a162000766565b5b620005ad8262000795565b9050602081019050919050565b600082825260208201905092915050565b6000620005d8826200065c565b9150620005e5836200065c565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156200061d576200061c62000708565b5b828201905092915050565b600062000635826200063c565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b838110156200068657808201518184015260208101905062000669565b8381111562000696576000848401525b50505050565b60006002820490506001821680620006b557607f821691505b60208210811415620006cc57620006cb62000737565b5b50919050565b620006dd8262000795565b810181811067ffffffffffffffff82111715620006ff57620006fe62000766565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b620007da8162000628565b8114620007e657600080fd5b50565b61200580620007f96000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c8063715018a6116100a2578063a457c2d711610071578063a457c2d7146102f7578063a9059cbb14610327578063c45a015514610357578063dd62ed3e14610375578063f2fde38b146103a557610116565b8063715018a61461029557806379cc67901461029f5780638da5cb5b146102bb57806395d89b41146102d957610116565b8063313ce567116100e9578063313ce567146101b757806339509351146101d55780634000aea01461020557806342966c681461023557806370a082311461026557610116565b806306fdde031461011b578063095ea7b31461013957806318160ddd1461016957806323b872dd14610187575b600080fd5b6101236103c1565b604051610130919061178b565b60405180910390f35b610153600480360381019061014e91906113f9565b610453565b6040516101609190611770565b60405180910390f35b610171610471565b60405161017e919061192d565b60405180910390f35b6101a1600480360381019061019c91906113aa565b61047b565b6040516101ae9190611770565b60405180910390f35b6101bf61057c565b6040516101cc9190611948565b60405180910390f35b6101ef60048036038101906101ea91906113f9565b610585565b6040516101fc9190611770565b60405180910390f35b61021f600480360381019061021a9190611435565b610631565b60405161022c9190611770565b60405180910390f35b61024f600480360381019061024a919061149c565b61066e565b60405161025c9190611770565b60405180910390f35b61027f600480360381019061027a9190611345565b61068a565b60405161028c919061192d565b60405180910390f35b61029d6106d2565b005b6102b960048036038101906102b491906113f9565b61075a565b005b6102c36107de565b6040516102d09190611717565b60405180910390f35b6102e1610808565b6040516102ee919061178b565b60405180910390f35b610311600480360381019061030c91906113f9565b61089a565b60405161031e9190611770565b60405180910390f35b610341600480360381019061033c91906113f9565b61098e565b60405161034e9190611770565b60405180910390f35b61035f6109ac565b60405161036c9190611717565b60405180910390f35b61038f600480360381019061038a919061136e565b6109d2565b60405161039c919061192d565b60405180910390f35b6103bf60048036038101906103ba9190611345565b610a59565b005b6060600380546103d090611b12565b80601f01602080910402602001604051908101604052809291908181526020018280546103fc90611b12565b80156104495780601f1061041e57610100808354040283529160200191610449565b820191906000526020600020905b81548152906001019060200180831161042c57829003601f168201915b5050505050905090565b6000610467610460610b51565b8484610b59565b6001905092915050565b6000600254905090565b6000610488848484610d24565b6000600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006104d3610b51565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610553576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161054a9061184d565b60405180910390fd5b6105708561055f610b51565b858461056b9190611a47565b610b59565b60019150509392505050565b60006012905090565b6000610627610592610b51565b8484600160006105a0610b51565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461062291906119f1565b610b59565b6001905092915050565b600061063d848461098e565b50610649338585610d24565b61065284610f98565b1561066357610662848484610fab565b5b600190509392505050565b600061068161067b610b51565b83611025565b60019050919050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6106da610b51565b73ffffffffffffffffffffffffffffffffffffffff166106f86107de565b73ffffffffffffffffffffffffffffffffffffffff161461074e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107459061186d565b60405180910390fd5b61075860006111ed565b565b600061076d83610768610b51565b6109d2565b9050818110156107b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107a99061188d565b60405180910390fd5b6107cf836107be610b51565b84846107ca9190611a47565b610b59565b6107d98383611025565b505050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606004805461081790611b12565b80601f016020809104026020016040519081016040528092919081815260200182805461084390611b12565b80156108905780601f1061086557610100808354040283529160200191610890565b820191906000526020600020905b81548152906001019060200180831161087357829003601f168201915b5050505050905090565b600080600160006108a9610b51565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610966576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161095d9061190d565b60405180910390fd5b610983610971610b51565b85858461097e9190611a47565b610b59565b600191505092915050565b60006109a261099b610b51565b8484610d24565b6001905092915050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b610a61610b51565b73ffffffffffffffffffffffffffffffffffffffff16610a7f6107de565b73ffffffffffffffffffffffffffffffffffffffff1614610ad5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610acc9061186d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610b45576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b3c906117ed565b60405180910390fd5b610b4e816111ed565b50565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610bc9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bc0906118ed565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610c39576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c309061180d565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610d17919061192d565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610d94576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d8b906118cd565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610e04576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dfb906117ad565b60405180910390fd5b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610e8a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e819061182d565b60405180910390fd5b8181610e969190611a47565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f2691906119f1565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610f8a919061192d565b60405180910390a350505050565b600080823b905060008111915050919050565b60008390508073ffffffffffffffffffffffffffffffffffffffff1663a4c0ed363385856040518463ffffffff1660e01b8152600401610fed93929190611732565b600060405180830381600087803b15801561100757600080fd5b505af115801561101b573d6000803e3d6000fd5b5050505050505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611095576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161108c906118ad565b60405180910390fd5b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561111b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611112906117cd565b60405180910390fd5b81816111279190611a47565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816002600082825461117b9190611a47565b92505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516111e0919061192d565b60405180910390a3505050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60006112c66112c184611988565b611963565b9050828152602081018484840111156112de57600080fd5b6112e9848285611ad0565b509392505050565b60008135905061130081611fa1565b92915050565b600082601f83011261131757600080fd5b81356113278482602086016112b3565b91505092915050565b60008135905061133f81611fb8565b92915050565b60006020828403121561135757600080fd5b6000611365848285016112f1565b91505092915050565b6000806040838503121561138157600080fd5b600061138f858286016112f1565b92505060206113a0858286016112f1565b9150509250929050565b6000806000606084860312156113bf57600080fd5b60006113cd868287016112f1565b93505060206113de868287016112f1565b92505060406113ef86828701611330565b9150509250925092565b6000806040838503121561140c57600080fd5b600061141a858286016112f1565b925050602061142b85828601611330565b9150509250929050565b60008060006060848603121561144a57600080fd5b6000611458868287016112f1565b935050602061146986828701611330565b925050604084013567ffffffffffffffff81111561148657600080fd5b61149286828701611306565b9150509250925092565b6000602082840312156114ae57600080fd5b60006114bc84828501611330565b91505092915050565b6114ce81611a7b565b82525050565b6114dd81611a8d565b82525050565b60006114ee826119b9565b6114f881856119cf565b9350611508818560208601611adf565b61151181611c02565b840191505092915050565b6000611527826119c4565b61153181856119e0565b9350611541818560208601611adf565b61154a81611c02565b840191505092915050565b60006115626023836119e0565b915061156d82611c13565b604082019050919050565b60006115856022836119e0565b915061159082611c62565b604082019050919050565b60006115a86026836119e0565b91506115b382611cb1565b604082019050919050565b60006115cb6022836119e0565b91506115d682611d00565b604082019050919050565b60006115ee6026836119e0565b91506115f982611d4f565b604082019050919050565b60006116116028836119e0565b915061161c82611d9e565b604082019050919050565b60006116346020836119e0565b915061163f82611ded565b602082019050919050565b60006116576024836119e0565b915061166282611e16565b604082019050919050565b600061167a6021836119e0565b915061168582611e65565b604082019050919050565b600061169d6025836119e0565b91506116a882611eb4565b604082019050919050565b60006116c06024836119e0565b91506116cb82611f03565b604082019050919050565b60006116e36025836119e0565b91506116ee82611f52565b604082019050919050565b61170281611ab9565b82525050565b61171181611ac3565b82525050565b600060208201905061172c60008301846114c5565b92915050565b600060608201905061174760008301866114c5565b61175460208301856116f9565b818103604083015261176681846114e3565b9050949350505050565b600060208201905061178560008301846114d4565b92915050565b600060208201905081810360008301526117a5818461151c565b905092915050565b600060208201905081810360008301526117c681611555565b9050919050565b600060208201905081810360008301526117e681611578565b9050919050565b600060208201905081810360008301526118068161159b565b9050919050565b60006020820190508181036000830152611826816115be565b9050919050565b60006020820190508181036000830152611846816115e1565b9050919050565b6000602082019050818103600083015261186681611604565b9050919050565b6000602082019050818103600083015261188681611627565b9050919050565b600060208201905081810360008301526118a68161164a565b9050919050565b600060208201905081810360008301526118c68161166d565b9050919050565b600060208201905081810360008301526118e681611690565b9050919050565b60006020820190508181036000830152611906816116b3565b9050919050565b60006020820190508181036000830152611926816116d6565b9050919050565b600060208201905061194260008301846116f9565b92915050565b600060208201905061195d6000830184611708565b92915050565b600061196d61197e565b90506119798282611b44565b919050565b6000604051905090565b600067ffffffffffffffff8211156119a3576119a2611bd3565b5b6119ac82611c02565b9050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b60006119fc82611ab9565b9150611a0783611ab9565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611a3c57611a3b611b75565b5b828201905092915050565b6000611a5282611ab9565b9150611a5d83611ab9565b925082821015611a7057611a6f611b75565b5b828203905092915050565b6000611a8682611a99565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b82818337600083830152505050565b60005b83811015611afd578082015181840152602081019050611ae2565b83811115611b0c576000848401525b50505050565b60006002820490506001821680611b2a57607f821691505b60208210811415611b3e57611b3d611ba4565b5b50919050565b611b4d82611c02565b810181811067ffffffffffffffff82111715611b6c57611b6b611bd3565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206160008201527f6c6c6f77616e6365000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f7760008201527f616e636500000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b611faa81611a7b565b8114611fb557600080fd5b50565b611fc181611ab9565b8114611fcc57600080fd5b5056fea2646970667358221220d599f36d347faf8c74e28ba6b1b91c60235ef506b0bce4207e3942b2c537c6d864736f6c63430008040033";

export class UniswapPair__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _factory: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<UniswapPair> {
    return super.deploy(
      _factory,
      name,
      symbol,
      overrides || {}
    ) as Promise<UniswapPair>;
  }
  getDeployTransaction(
    _factory: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_factory, name, symbol, overrides || {});
  }
  attach(address: string): UniswapPair {
    return super.attach(address) as UniswapPair;
  }
  connect(signer: Signer): UniswapPair__factory {
    return super.connect(signer) as UniswapPair__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UniswapPairInterface {
    return new utils.Interface(_abi) as UniswapPairInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniswapPair {
    return new Contract(address, _abi, signerOrProvider) as UniswapPair;
  }
}
