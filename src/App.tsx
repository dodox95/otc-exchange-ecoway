// dapp-token-ico\src\App.tsx
import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import ICOToken from "./ICOToken";
import Demo from "./components/Demo";
import { getLibrary } from "./components/Demo";

const otcAddress = import.meta.env.OTC_EXCHANGE_ADDRESS;

const queryClient = new QueryClient();

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Demo />
          {/* } <ICOToken otcMarketAddress={otcAddress} /> */}
          <ICOToken otcMarketAddress="0x786c0F5672AB580aDE52882A486d186d89812Ea3" />
          <footer className="p-4 bg-base-200 text-base-content text-center">
  <div>
    <p>&copy; {new Date().getFullYear()} EcoWay</p>
    <p>
      Follow us on: <br />
      <a href="https://twitter.com/Ecoway_org" target="_blank" rel="noopener noreferrer" className="link link-hover">
        Twitter
      </a>
      {' | '}
      <a href="https://t.me/ecoway_org" target="_blank" rel="noopener noreferrer" className="link link-hover">
        Telegram
      </a>
    </p>
  </div>
</footer>

        </div>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </Web3ReactProvider>
  );
}

export default App;
