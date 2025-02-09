import React from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { isConnecting, isDisconnected } = useAccount();

  if (isConnecting) {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Conntectiong
      </Button>
    );
  }

  return (
    <Button
      className="bg-black hover:bg-gray-800 text-white"
      onClick={() => open()}
    >
      {isDisconnected ? "Connect Wallet" : "Disconnect"}
    </Button>
  );
}
