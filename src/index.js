
const ethers = require("ethers");
const { lootABI } = require("./abi.js");
const lootAddress = "0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7";
const moreLootAddress = "0x1dfe7ca09e99d10835bf73044a23b73fc20623df";

Class Loot {

  constructor(rpcProvider) {
    const rpc = new ethers.providers.JsonRpcProvider(rpcProvider);
    const loot = new ethers.Contract(lootAddress, lootABI, rpc);
    const moreLoot = new ethers.Contract(moreLoot, lootABI, rpc);

    this.loot = loot;
    this.moreLoot = moreLoot;
  }

  async function getBag(lootId) {
    if (lootId > 0) {
      let loot = (lootId < 8001) ? this.loot : this.moreLoot;

      const [chest, foot, hand, head, neck, ring, waist, weapon, owner] =
        await Promise.all([
          loot.getChest(i),
          loot.getFoot(i),
          loot.getHand(i),
          loot.getHead(i),
          loot.getNeck(i),
          loot.getRing(i),
          loot.getWaist(i),
          loot.getWeapon(i),
          loot.ownerOf(i)
        ]);

      let bag = {
        chest: chest,
        foot: foot,
        hand: hand,
        head: head,
        neck: neck,
        ring: ring,
        waist: waist,
        weapon: weapon,
        owner: owner
      }

      return bag;
    }

    return {};
  }

}

module.exports = Loot;
