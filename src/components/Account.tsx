import { useWeb3React } from "@web3-react/core";
import React from "react";

export function Account() {
  const { account } = useWeb3React();

  return (
    <div className="btn btn-ghost btn-sm rounded-btn">
      <span>Wallet:</span>
      <span role="img" aria-label="robot">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 hover:text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
      </span>
      <span className="badge badge-ghost">
        {account === null
          ? "-"
          : account
          ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
          : ""}
      </span>
    </div>
  );
}
