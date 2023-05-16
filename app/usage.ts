import {
    createPublicClient,
    http,
    Address,
    getAbiItem,
    parseAbiItem,
    decodeEventLog,
} from "viem";
import { mainnet } from "viem/chains";
import {
    erc20ABI,
    sushiV2FactoryABI,
    sushiV2FactoryAddress,
} from "../generated/wagmi";

async function main() {
    const client = createPublicClient({
        chain: mainnet,
        transport: http(),
    });

    const usdcName = await client.readContract({
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        abi: erc20ABI,
        functionName: "name",
    });
    console.log("usdcName", usdcName);

    const logs = await client.getLogs({
        address: sushiV2FactoryAddress[1] as Address,
        event: parseAbiItem(
            "event PairCreated(address indexed token0, address indexed token1, address pair, uint n)"
        ),
        fromBlock: 17274414n,
        toBlock: 17274415n,
    });
    console.log(
        logs.map((log) => decodeEventLog({ abi: sushiV2FactoryABI, ...log }))
    );
}

main();
