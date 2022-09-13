import { ethers, run, network } from "hardhat"

async function main() {
	const SimpleStorageFactory = await ethers.getContractFactory(
		"SimpleStorage"
	)
	console.log("Deploying")
	const simpleStorage = await SimpleStorageFactory.deploy()
	await simpleStorage.deployed()
	console.log(`Deployed contract to: ${simpleStorage.address}`)

	console.log(network.config)
	if (
		network.config.chainId === process.env.GOERLI_CHAIN_ID &&
		process.env.ETHERSCAN_API_KEY
	) {
		const sixBlocks = 6
		await simpleStorage.deployTransaction.wait(sixBlocks)
		await verify(simpleStorage.address, [])
	}
}

async function verify(contractAddress: any, args: any) {
	console.log("Verifying contract ..")
	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		})
	} catch (e: any) {
		if (e.message.toLowerCase().includes("already verified")) {
			console.log("Already verified")
		} else {
			console.log(e)
		}
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
