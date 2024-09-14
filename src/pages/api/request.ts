import { Koios, Lucid } from "@lucid-evolution/lucid";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Process a POST request
   const initLucid = () => {
    const b = new Koios("https://api.koios.rest/api/v1");
    return Lucid(b, "Mainnet");

   };

    const lucid = await initLucid();
    const data = req.body;

    lucid.selectWallet.fromAddress(data.address, [])
    const rewardAddress = await lucid.wallet().rewardAddress();
    const poolID = "pool1xs34q2z06a46nk7hl48d27dj5gzc6hh9trugw2ehs9ajsevqffx";
    const tx = await lucid
      .newTx()
      .delegateTo(rewardAddress, poolID)
      .complete();
    res.status(200).json({ tx: tx.toCBOR() });
  } else {
    // Handle any other HTTP method
  }
}

export const parse = (json: string) =>
  JSON.parse(json, (key, value) =>
    typeof value === "string" && /^\d+n$/.test(value)
      ? BigInt(value.slice(0, -1))
      : value
  );
