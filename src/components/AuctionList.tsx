// dapp-token-ico\src\components\AuctionList.tsx
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const AuctionList = ({ contract }) => {
  const [orders, setOrders] = useState({ buyOrders: [], sellOrders: [] });

  useEffect(() => {
    const fetchOrders = async () => {
      const buyOrders = await contract.buyOrders();
      const sellOrders = await contract.sellOrders();
      setOrders({
        buyOrders: buyOrders.filter(order => order.isActive),
        sellOrders: sellOrders.filter(order => order.isActive),
      });
    };

    if (contract) {
      fetchOrders();
    }
  }, [contract]);

  return (
    <div>
      <h2>Aktywne zlecenia kupna</h2>
      {/* Iteracja i wyświetlanie zleceń kupna */}
      {orders.buyOrders.map((order, index) => (
        <div key={index}>Cena: {ethers.utils.formatEther(order.price)} ETH, Ilość: {ethers.utils.formatUnits(order.amount, 'ether')} tokens</div>
      ))}

      <h2>Aktywne zlecenia sprzedaży</h2>
      {/* Iteracja i wyświetlanie zleceń sprzedaży */}
      {orders.sellOrders.map((order, index) => (
        <div key={index}>Cena: {ethers.utils.formatEther(order.price)} ETH, Ilość: {ethers.utils.formatUnits(order.amount, 'ether')} tokens</div>
      ))}
    </div>
  );
};

export default AuctionList;
