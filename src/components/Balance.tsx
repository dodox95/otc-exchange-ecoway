import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import React from "react";

export function Balance() {
  const { account, library, chainId } = useWeb3React();
  const [balance, setBalance] = React.useState<number | undefined>();

  React.useEffect((): any => {
    if (Boolean(account) && Boolean(library)) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance: React.SetStateAction<number | undefined>) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(undefined);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // Ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <div className="btn btn-ghost btn-sm rounded-btn">
      <span>Balance:</span>
      BNB

      <span className="badge badge-ghost">{balance === null ? "Error" : balance ? `Ξ${formatEther(balance)}` : ""}</span>
    </div>
  );
}
