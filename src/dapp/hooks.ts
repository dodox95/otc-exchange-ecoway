// src\dapp\hooks.ts
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";

import logger from "../logger";
import { injected } from "./connectors";

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized: boolean) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      })
      .catch(logger.error);
  }, []); // Intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React();

  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum?.on && !active && !error && !suppress) {
      const handleConnect = async () => {
        logger.warn("Handling 'connect' event");
        await activate(injected);
      };

      const handleChainChanged = async (chainId: string | number) => {
        logger.warn("Handling 'chainChanged' event with payload", chainId);
        await activate(injected);
      };

      const handleAccountsChanged = async (accounts: string[]) => {
        logger.warn("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          await activate(injected);
        }
      };

      const handleNetworkChanged = async (networkId: string | number) => {
        logger.warn("Handling 'networkChanged' event with payload", networkId);
        await activate(injected);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
}
