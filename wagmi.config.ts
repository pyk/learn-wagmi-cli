import { defineConfig } from "@wagmi/cli";
import { etherscan } from "@wagmi/cli/plugins";
import { erc20ABI } from "wagmi";
import { mainnet } from "wagmi/chains";
import { config } from "dotenv";

config();

export default defineConfig({
    out: "generated/wagmi.ts",
    contracts: [
        {
            name: "erc20",
            abi: erc20ABI,
        },
    ],
    plugins: [
        etherscan({
            apiKey: process.env.ETHERSCAN_API_KEY!,
            chainId: mainnet.id,
            contracts: [
                {
                    name: "EnsRegistry",
                    address: {
                        [mainnet.id]:
                            "0x314159265dd8dbb310642f98f50c066173c1259b",
                    },
                },
                {
                    name: "SushiV2Factory",
                    address: {
                        [mainnet.id]:
                            "0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac",
                    },
                },
            ],
        }),
    ],
});
