import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import * as dotenv from "dotenv"
dotenv.config()
import "@nomiclabs/hardhat-etherscan"
import "hardhat-gas-reporter"
import "./tasks/block-number"
import "solidity-coverage"

const rpc_url = process.env.GOERLI_RPC_URL
const private_key = process.env.GOERLI_PRIVATE_KEY

const etherscan_api_key = process.env.ETHERSCAN_API_KEY

const coinmarketcap_api_key = process.env.COINMARKETCAP_API_KEY

const config: HardhatUserConfig = {
	solidity: "0.8.16",
	networks: {
		goerli: {
			chainId: 5,
			url: rpc_url,
			accounts: [private_key!],
		},
		localhost: {
			url: "http://127.0.0.1:8545/",
			// accounts: are handed over by hardhat automatically
			chainId: 31337,
		},
	},
	etherscan: {
		apiKey: etherscan_api_key,
	},
	gasReporter: {
		enabled: false,
		outputFile: "gas-report.txt",
		noColors: true,
		currency: "USD",
		coinmarketcap: coinmarketcap_api_key,
	},
}

export default config
