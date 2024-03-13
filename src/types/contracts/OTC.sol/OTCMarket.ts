/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export declare namespace OTCMarket {
  export type OrderStruct = {
    issuer: string;
    amount: BigNumberish;
    totalPrice: BigNumberish;
    isBuyOrder: boolean;
    isActive: boolean;
  };

  export type OrderStructOutput = [
    string,
    BigNumber,
    BigNumber,
    boolean,
    boolean
  ] & {
    issuer: string;
    amount: BigNumber;
    totalPrice: BigNumber;
    isBuyOrder: boolean;
    isActive: boolean;
  };
}

export interface OTCMarketInterface extends utils.Interface {
  functions: {
    "cancelOrder(uint256)": FunctionFragment;
    "confirmOrderExecution(uint256)": FunctionFragment;
    "executeOrder(uint256)": FunctionFragment;
    "fee()": FunctionFragment;
    "feeRecipient()": FunctionFragment;
    "getActiveBuyOrders()": FunctionFragment;
    "getActiveSellOrders()": FunctionFragment;
    "orders(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "placeOrder(uint256,uint256,bool)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setFee(uint256)": FunctionFragment;
    "setFeeRecipient(address)": FunctionFragment;
    "token()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawFees()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "cancelOrder"
      | "confirmOrderExecution"
      | "executeOrder"
      | "fee"
      | "feeRecipient"
      | "getActiveBuyOrders"
      | "getActiveSellOrders"
      | "orders"
      | "owner"
      | "placeOrder"
      | "renounceOwnership"
      | "setFee"
      | "setFeeRecipient"
      | "token"
      | "transferOwnership"
      | "withdrawFees"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "cancelOrder",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "confirmOrderExecution",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "executeOrder",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "fee", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "feeRecipient",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getActiveBuyOrders",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getActiveSellOrders",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "orders",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "placeOrder",
    values: [BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setFeeRecipient",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFees",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "cancelOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "confirmOrderExecution",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "feeRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActiveBuyOrders",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActiveSellOrders",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "orders", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "placeOrder", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setFeeRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFees",
    data: BytesLike
  ): Result;

  events: {
    "OrderCancelled(uint256)": EventFragment;
    "OrderConfirmed(uint256,address)": EventFragment;
    "OrderExecuted(uint256,address,uint256)": EventFragment;
    "OrderPlaced(uint256,bool,address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OrderCancelled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderConfirmed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderPlaced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface OrderCancelledEventObject {
  orderId: BigNumber;
}
export type OrderCancelledEvent = TypedEvent<
  [BigNumber],
  OrderCancelledEventObject
>;

export type OrderCancelledEventFilter = TypedEventFilter<OrderCancelledEvent>;

export interface OrderConfirmedEventObject {
  orderId: BigNumber;
  issuer: string;
}
export type OrderConfirmedEvent = TypedEvent<
  [BigNumber, string],
  OrderConfirmedEventObject
>;

export type OrderConfirmedEventFilter = TypedEventFilter<OrderConfirmedEvent>;

export interface OrderExecutedEventObject {
  orderId: BigNumber;
  buyer: string;
  amount: BigNumber;
}
export type OrderExecutedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  OrderExecutedEventObject
>;

export type OrderExecutedEventFilter = TypedEventFilter<OrderExecutedEvent>;

export interface OrderPlacedEventObject {
  orderId: BigNumber;
  isBuyOrder: boolean;
  issuer: string;
  amount: BigNumber;
  totalPrice: BigNumber;
}
export type OrderPlacedEvent = TypedEvent<
  [BigNumber, boolean, string, BigNumber, BigNumber],
  OrderPlacedEventObject
>;

export type OrderPlacedEventFilter = TypedEventFilter<OrderPlacedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface OTCMarket extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: OTCMarketInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    cancelOrder(
      orderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    confirmOrderExecution(
      orderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    executeOrder(
      orderId: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    fee(overrides?: CallOverrides): Promise<[BigNumber]>;

    feeRecipient(overrides?: CallOverrides): Promise<[string]>;

    getActiveBuyOrders(
      overrides?: CallOverrides
    ): Promise<[OTCMarket.OrderStructOutput[]]>;

    getActiveSellOrders(
      overrides?: CallOverrides
    ): Promise<[OTCMarket.OrderStructOutput[]]>;

    orders(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, boolean, boolean] & {
        issuer: string;
        amount: BigNumber;
        totalPrice: BigNumber;
        isBuyOrder: boolean;
        isActive: boolean;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    placeOrder(
      amount: BigNumberish,
      totalPrice: BigNumberish,
      isBuyOrder: boolean,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setFee(
      _newFee: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setFeeRecipient(
      _newFeeRecipient: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    token(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    withdrawFees(
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  cancelOrder(
    orderId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  confirmOrderExecution(
    orderId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  executeOrder(
    orderId: BigNumberish,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  fee(overrides?: CallOverrides): Promise<BigNumber>;

  feeRecipient(overrides?: CallOverrides): Promise<string>;

  getActiveBuyOrders(
    overrides?: CallOverrides
  ): Promise<OTCMarket.OrderStructOutput[]>;

  getActiveSellOrders(
    overrides?: CallOverrides
  ): Promise<OTCMarket.OrderStructOutput[]>;

  orders(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber, boolean, boolean] & {
      issuer: string;
      amount: BigNumber;
      totalPrice: BigNumber;
      isBuyOrder: boolean;
      isActive: boolean;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  placeOrder(
    amount: BigNumberish,
    totalPrice: BigNumberish,
    isBuyOrder: boolean,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setFee(
    _newFee: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setFeeRecipient(
    _newFeeRecipient: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  token(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  withdrawFees(
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    cancelOrder(
      orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    confirmOrderExecution(
      orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    executeOrder(
      orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    fee(overrides?: CallOverrides): Promise<BigNumber>;

    feeRecipient(overrides?: CallOverrides): Promise<string>;

    getActiveBuyOrders(
      overrides?: CallOverrides
    ): Promise<OTCMarket.OrderStructOutput[]>;

    getActiveSellOrders(
      overrides?: CallOverrides
    ): Promise<OTCMarket.OrderStructOutput[]>;

    orders(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, boolean, boolean] & {
        issuer: string;
        amount: BigNumber;
        totalPrice: BigNumber;
        isBuyOrder: boolean;
        isActive: boolean;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    placeOrder(
      amount: BigNumberish,
      totalPrice: BigNumberish,
      isBuyOrder: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setFee(_newFee: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setFeeRecipient(
      _newFeeRecipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    token(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawFees(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "OrderCancelled(uint256)"(
      orderId?: BigNumberish | null
    ): OrderCancelledEventFilter;
    OrderCancelled(orderId?: BigNumberish | null): OrderCancelledEventFilter;

    "OrderConfirmed(uint256,address)"(
      orderId?: BigNumberish | null,
      issuer?: string | null
    ): OrderConfirmedEventFilter;
    OrderConfirmed(
      orderId?: BigNumberish | null,
      issuer?: string | null
    ): OrderConfirmedEventFilter;

    "OrderExecuted(uint256,address,uint256)"(
      orderId?: BigNumberish | null,
      buyer?: string | null,
      amount?: null
    ): OrderExecutedEventFilter;
    OrderExecuted(
      orderId?: BigNumberish | null,
      buyer?: string | null,
      amount?: null
    ): OrderExecutedEventFilter;

    "OrderPlaced(uint256,bool,address,uint256,uint256)"(
      orderId?: BigNumberish | null,
      isBuyOrder?: null,
      issuer?: string | null,
      amount?: null,
      totalPrice?: null
    ): OrderPlacedEventFilter;
    OrderPlaced(
      orderId?: BigNumberish | null,
      isBuyOrder?: null,
      issuer?: string | null,
      amount?: null,
      totalPrice?: null
    ): OrderPlacedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    cancelOrder(
      orderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    confirmOrderExecution(
      orderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    executeOrder(
      orderId: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    fee(overrides?: CallOverrides): Promise<BigNumber>;

    feeRecipient(overrides?: CallOverrides): Promise<BigNumber>;

    getActiveBuyOrders(overrides?: CallOverrides): Promise<BigNumber>;

    getActiveSellOrders(overrides?: CallOverrides): Promise<BigNumber>;

    orders(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    placeOrder(
      amount: BigNumberish,
      totalPrice: BigNumberish,
      isBuyOrder: boolean,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setFee(
      _newFee: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setFeeRecipient(
      _newFeeRecipient: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    withdrawFees(overrides?: Overrides & { from?: string }): Promise<BigNumber>;
  };

  populateTransaction: {
    cancelOrder(
      orderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    confirmOrderExecution(
      orderId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    executeOrder(
      orderId: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    fee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feeRecipient(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getActiveBuyOrders(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getActiveSellOrders(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    orders(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    placeOrder(
      amount: BigNumberish,
      totalPrice: BigNumberish,
      isBuyOrder: boolean,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setFee(
      _newFee: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setFeeRecipient(
      _newFeeRecipient: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    withdrawFees(
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
