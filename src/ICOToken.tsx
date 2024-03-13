import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import OTCMarketArtifacts from "./artifacts/contracts/OTC.sol/OTCMarket.json";
import ITManTokenArtifacts from "./artifacts/contracts/ITManToken.sol/ITManToken.json";

const tokenAddress = "0xEff3024c38eDf6fE0FF43329039b55cdc29Cf1FE";
const otcMarketAddress = "0xE1B5fF107a59F208391d4823E30193D01E4F1354";

function TokenICO() {
  const { account, library } = useWeb3React();
  const [amount, setAmount] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 10000); // Regularne odświeżanie co 10 sekund
    return () => clearInterval(intervalId);
  }, [library, account]);

  async function fetchOrders() {
    if (!library || !account) return;
    const contract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner());
    try {
      const activeBuyOrders = await contract.getActiveBuyOrders();
      const activeSellOrders = await contract.getActiveSellOrders();

      const formattedOrders = [...activeBuyOrders, ...activeSellOrders].map((order, index) => ({
        id: index,
        issuer: order.issuer,
        amount: ethers.utils.formatUnits(order.amount, 18),
        totalPrice: ethers.utils.formatUnits(order.totalPrice, 18),
        isBuyOrder: order.isBuyOrder,
        isActive: order.isActive
      }));
      setOrders(formattedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders.');
    }
  }

  async function handlePlaceOrder(isBuyOrder) {
    if (!amount || !totalPrice) {
        toast.error("Please fill in both amount and total price.");
        return;
    }

    const parsedAmount = ethers.utils.parseUnits(amount, "ether");
    const parsedTotalPrice = ethers.utils.parseUnits(totalPrice, "ether");

    const contract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner(account));

    if (!isBuyOrder) {
        // W przypadku Sell Order, najpierw zatwierdź tokeny.
        try {
            const tokenContract = new ethers.Contract(tokenAddress, ITManTokenArtifacts.abi, library.getSigner(account));
            const approvalTx = await tokenContract.approve(otcMarketAddress, parsedAmount);
            await toast.promise(approvalTx.wait(), {
                loading: "Approving tokens...",
                success: "Tokens successfully approved!",
                error: "Token approval failed."
            });
        } catch (error) {
            console.error("Approval Error:", error);
            toast.error(`Approval failed: ${error.message}`);
            return; // Przerwij funkcję, jeśli zatwierdzenie nie powiedzie się.
        }
    }

    try {
        let tx;
        if (isBuyOrder) {
            tx = await contract.placeOrder(parsedAmount, parsedTotalPrice, true, { value: parsedTotalPrice });
        } else {
            // Po zatwierdzeniu tokenów, kontynuuj z zleceniem sprzedaży.
            tx = await contract.placeOrder(parsedAmount, parsedTotalPrice, false);
        }
        await toast.promise(tx.wait(), {
            loading: "Processing order...",
            success: "Order successfully processed!",
            error: "Order processing failed."
        });
        fetchOrders(); // Odświeżanie listy zleceń po każdej transakcji.
    } catch (error) {
        console.error("Transaction Error:", error);
        toast.error(`Transaction failed: ${error.message}`);
        fetchOrders(); // Sprawdź aktualny stan zleceń.
    }
}



  async function handleCancelOrder(orderId) {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) {
      return;
    }

    const contract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner(account));
    try {
      const tx = await contract.cancelOrder(orderId);
      await toast.promise(tx.wait(), {
        loading: "Cancelling order...",
        success: "Order successfully cancelled!",
        error: "Order cancellation failed."
      });
      fetchOrders(); // Odświeżanie listy zleceń po każdej transakcji
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Error cancelling the order.");
    }
  }

  async function handleExecuteOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order || !order.isActive) {
        toast.error("This order is no longer active or does not exist.");
        fetchOrders(); // Refresh to ensure user has up-to-date data
        return;
    }

    const contract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner(account));
    try {
        const tx = await contract.executeOrder(orderId);
        await toast.promise(tx.wait(), {
            loading: "Executing order...",
            success: "Order successfully executed!",
            error: "Failed to execute order."
        });
        fetchOrders(); // Refresh orders list after every transaction
    } catch (error) {
        console.error("Error executing order:", error);
        toast.error("Failed to execute the order.");
        fetchOrders(); // Additionally, refresh orders list if there was an error
    }
}

async function handleConfirmOrderExecution(orderId) {
  if (!library || !account) return;

  const contract = new ethers.Contract(otcMarketAddress, OTCMarketArtifacts.abi, library.getSigner());

  try {
    const tx = await contract.confirmOrderExecution(orderId);
    await toast.promise(tx.wait(), {
      loading: "Confirming order execution...",
      success: "Order execution confirmed!",
      error: "Failed to confirm order execution."
    });
    fetchOrders(); // Refresh orders list after the transaction.
  } catch (error) {
    console.error("Error confirming order execution:", error);
    toast.error(`Failed to confirm order execution: ${error.message}`);
  }
}


return (
  <div>
    <h1>TokenICO</h1>
    <input
      type="number"
      placeholder="Amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
    <input
      type="number"
      placeholder="Total Price"
      value={totalPrice}
      onChange={(e) => setTotalPrice(e.target.value)}
    />
    <div>
      <button onClick={() => handlePlaceOrder(true)}>Place Buy Order</button>
      <button onClick={() => handlePlaceOrder(false)}>Place Sell Order</button>
    </div>
    {orders.map((order, index) => (
      <div key={index}>
        <p>{order.isBuyOrder ? "Buy" : "Sell"} Order</p>
        <p>Issuer: {order.issuer}</p>
        <p>Amount: {order.amount}</p>
        <p>Total Price: {order.totalPrice}</p>
        <button onClick={() => handleExecuteOrder(order.id)}>Execute Order</button>
        <button onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>
        {order.isActive && (
          <button onClick={() => handleConfirmOrderExecution(order.id)}>Confirm Execution</button>
        )}
      </div>
    ))}
  </div>
);


}

export default TokenICO;
