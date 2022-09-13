import { ethers } from "hardhat"
import { expect } from "chai"

describe("SimpleStorage", function () {
	let simpleStorageFactory
	let simpleStorage: any

	this.beforeEach(async function () {
		simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
		simpleStorage = await simpleStorageFactory.deploy()
	})

	it("should start with a favorite number of 0", async function () {
		const currentValue = await simpleStorage.retrieve()
		const expectedValue = "0"
		expect(currentValue.toString()).to.equal(expectedValue)
	})

	it("should update the value when using store", async function () {
		const transactionReceipt = await simpleStorage.store("7")
		await transactionReceipt.wait(1)
		const currentValue = await simpleStorage.retrieve()
		const expectedValue = "7"

		expect(currentValue.toString()).to.equal(expectedValue)
	})
})
