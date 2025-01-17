import "core-js/stable";
import "regenerator-runtime/runtime";
import { waitForAppScreen, zemu, genericTx, SPECULOS_ADDRESS, RANDOM_ADDRESS, txFromEtherscan } from './test.fixture';
import { ethers } from "ethers";
import { parseEther, parseUnits } from "ethers/lib/utils";

const contractAddr = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
const pluginName = "opensea";
const abi_path = `../${pluginName}/abis/` + contractAddr + '.json';
// const abi = require(abi_path);

// from https://etherscan.io/tx/0x6557bf57679f13b3bc953f86ed60c45a6111a0d5300ac539c886d6ee071ea8d4
test('[Nano S] nanos_register_proxy', zemu("nanos", async (sim, eth) => {
  const serializedTx = txFromEtherscan("0x02f87001068459682f008510cf2358568307e31394a5409ec958c83c3f309868babaca7c86dcb077c18084ddd81f82c080a0a3b03b61a326669936ffcfeea480241284fe864962b7d8b3d5bc9c239b01fa25a03e4055474823523011e8b304e324e3c596ce7bb37572de00ba16cf132638e232");
  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx,
  );
  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_register_proxy', [7, 0]);
  await tx;
}));