import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import { useRegisterNewUser } from "../../hooks/useRegisterNewUser";

type ConnectPropsType = {
  setUserAddress: Dispatch<SetStateAction<string>>;
};

type AddressPropsType = {
  userAddress: string;
};

type SignMessagePropsType = {
  setError: Dispatch<SetStateAction<any>>;
  message: string;
};

type MetaMaskAuthPropsType = {
  setAuth: Dispatch<SetStateAction<boolean>>;
};

const signMessage = async ({ setError, message }: SignMessagePropsType) => {
  try {
    console.log({ message });
    if (!(window as any).ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await (window as any).ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum,
    );
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address,
    };
  } catch (err: any) {
    setError(err.message);
  }
};

async function connect(onConnected: any) {
  if (!(window as any).ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await (window as any).ethereum.request({
    method: "eth_requestAccounts",
  });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected: any) {
  if ((window as any).ethereum) {
    const accounts = await (window as any).ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }
  }
}

function Connect({ setUserAddress }: ConnectPropsType) {
  return (
    <ConnectButton onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </ConnectButton>
  );
}

function Address({ userAddress }: AddressPropsType) {
  return (
    <AddressSpan>
      {userAddress.substring(0, 5)}…
      {userAddress.substring(userAddress.length - 4)}
    </AddressSpan>
  );
}

export const MetaMaskAuth = (props: MetaMaskAuthPropsType) => {
  const [userAddress, setUserAddress] = useState<string>("");
  const { mutate: metaMaskRegistration, data: regData } = useRegisterNewUser();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState();

  useEffect(() => {
    if (regData) {
      localStorage.setItem("authToken", regData.data.authToken);
      props.setAuth(true);
    }
  }, [props, regData]);

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  useEffect(() => {
    async function testMaskApi() {
      const sig = await signMessage({
        setError,
        message: userAddress,
      });
      if (sig) {
        metaMaskRegistration({ ...sig });
      }
    }
    if (userAddress) {
      testMaskApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  return userAddress ? (
    <ConnectWrapper>
      <div>
        Connected with <Address userAddress={userAddress} /> <br />
        <p>Waiting for your signing...</p>
      </div>
    </ConnectWrapper>
  ) : (
    <ConnectWrapper>
      <Connect setUserAddress={setUserAddress} />
    </ConnectWrapper>
  );
};

const AddressSpan = styled.span`
  background-color: #e5771b;
  color: black;
  padding: 5px;
  border-radius: 5px;
  border: none;
`;

const ConnectButton = styled.button`
  color: white;
  background: -webkit-linear-gradient(left, #e5771b, #753d16);
  background-size: 200% 200%;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  border-width: 1px;
  padding: 13px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.2em;

  :hover {
    background: -webkit-linear-gradient(left, #e5771b, #e5771b);
  }
`;

const ConnectWrapper = styled.div`
  width: 100%;
  margin-top: 31%;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    color: #fff;
  }

  p {
    margin-top: 10px;
  }
`;
