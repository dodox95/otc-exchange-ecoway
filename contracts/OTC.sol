/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OTCMarket is ReentrancyGuard, Ownable {
	IERC20 public token;
	uint256 public fee = 0;
	address public feeRecipient;

	struct Order {
		address issuer;
		uint256 amount;
		uint256 totalPrice; // Zmieniono z 'price' na 'totalPrice' aby lepiej odzwierciedlić logikę
		bool isBuyOrder;
		bool isActive;
	}

	Order[] public orders;

	event OrderPlaced(
		uint256 indexed orderId,
		bool isBuyOrder,
		address indexed issuer,
		uint256 amount,
		uint256 totalPrice
	);
	event OrderCancelled(uint256 indexed orderId);
	event OrderExecuted(
		uint256 indexed orderId,
		address indexed buyer,
		uint256 amount
	);
	event OrderConfirmed(uint256 indexed orderId, address indexed issuer);

	constructor(address _tokenAddress) {
		require(_tokenAddress != address(0), "Token address cannot be zero.");
		token = IERC20(_tokenAddress);
		feeRecipient = msg.sender;
	}

	function placeOrder(
		uint256 amount,
		uint256 totalPrice,
		bool isBuyOrder
	) external payable {
		require(
			amount > 0 && totalPrice > 0,
			"Amount and total price must be greater than 0"
		);

		if (isBuyOrder) {
			require(msg.value == totalPrice, "Insufficient BNB sent.");
		} else {
			require(
				token.transferFrom(msg.sender, address(this), amount),
				"Token transfer failed."
			);
			require(msg.value == fee, "Insufficient fee.");
		}

		payable(feeRecipient).transfer(fee);

		orders.push(
			Order({
				issuer: msg.sender,
				amount: amount,
				totalPrice: totalPrice,
				isBuyOrder: isBuyOrder,
				isActive: true
			})
		);

		emit OrderPlaced(
			orders.length - 1,
			isBuyOrder,
			msg.sender,
			amount,
			totalPrice
		);
	}

	function cancelOrder(uint256 orderId) external {
		Order storage order = orders[orderId];
		require(
			order.issuer == msg.sender,
			"Only the issuer can cancel this order."
		);
		require(order.isActive, "Order is already inactive.");

		order.isActive = false;

		if (!order.isBuyOrder) {
			require(
				token.transfer(msg.sender, order.amount),
				"Token refund failed."
			);
		}

		emit OrderCancelled(orderId);
	}
	// Nowa funkcja do zmiany stanu zlecenia
	function changeOrderActiveState(uint256 orderId, bool newState) internal {
		Order storage order = orders[orderId];
		order.isActive = newState;
	}

	function executeOrder(uint256 orderId) external payable nonReentrant {
		Order storage order = orders[orderId];
		require(order.isActive, "Order is not active.");
		bool success;

		if (order.isBuyOrder) {
			require(msg.value == order.totalPrice, "Incorrect BNB amount.");
			payable(order.issuer).transfer(msg.value);
			success = true; // Przykład, w rzeczywistości powinno to być zweryfikowane
		} else {
			require(
				token.transfer(msg.sender, order.amount),
				"Token transfer failed."
			);
			payable(order.issuer).transfer(order.totalPrice);
			success = true; // Przykład, w rzeczywistości powinno to być zweryfikowane
		}

		if (success) {
			emit OrderExecuted(orderId, msg.sender, order.amount);
			// Nie zmieniamy stanu zlecenia na nieaktywne tutaj
		}
		// W przypadku niepowodzenia, transakcja zostanie cofnięta, więc nie musimy obsługiwać "else"
	}

	function confirmOrderExecution(uint256 orderId) external {
		require(
			msg.sender == orders[orderId].issuer,
			"Only the issuer can confirm execution."
		);
		require(orders[orderId].isActive, "Order is already inactive.");

		changeOrderActiveState(orderId, false); // Zmieniamy stan zlecenia na nieaktywne
		emit OrderConfirmed(orderId, msg.sender); // Emitujemy zdarzenie potwierdzenia wykonania
	}

	// Funkcja do odczytu aktywnych zleceń kupna
	function getActiveBuyOrders() external view returns (Order[] memory) {
		uint256 activeCount = 0;
		for (uint256 i = 0; i < orders.length; i++) {
			if (orders[i].isActive && orders[i].isBuyOrder) {
				activeCount++;
			}
		}

		Order[] memory activeBuyOrders = new Order[](activeCount);
		uint256 currentIndex = 0;
		for (uint256 i = 0; i < orders.length; i++) {
			if (orders[i].isActive && orders[i].isBuyOrder) {
				activeBuyOrders[currentIndex] = orders[i];
				currentIndex++;
			}
		}
		return activeBuyOrders;
	}

	// Funkcja do odczytu aktywnych zleceń sprzedaży
	function getActiveSellOrders() external view returns (Order[] memory) {
		uint256 activeCount = 0;
		for (uint256 i = 0; i < orders.length; i++) {
			if (orders[i].isActive && !orders[i].isBuyOrder) {
				activeCount++;
			}
		}

		Order[] memory activeSellOrders = new Order[](activeCount);
		uint256 currentIndex = 0;
		for (uint256 i = 0; i < orders.length; i++) {
			if (orders[i].isActive && !orders[i].isBuyOrder) {
				activeSellOrders[currentIndex] = orders[i];
				currentIndex++;
			}
		}
		return activeSellOrders;
	}

	// Implementacja dodatkowych funkcji zarządzania kontraktem
	function setFee(uint256 _newFee) external onlyOwner {
		fee = _newFee;
	}

	function setFeeRecipient(address _newFeeRecipient) external onlyOwner {
		require(
			_newFeeRecipient != address(0),
			"Fee recipient cannot be the zero address."
		);
		feeRecipient = _newFeeRecipient;
	}

	function withdrawFees() external onlyOwner {
		uint256 balance = address(this).balance;
		require(balance > 0, "No fees to withdraw.");
		payable(feeRecipient).transfer(balance);
	}
}
