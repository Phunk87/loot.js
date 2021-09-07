
const ethers = require("ethers");
const { lootABI } = require("./abi.js");
const lootAddress = "0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7";
const moreLootAddress = "0x1dfe7ca09e99d10835bf73044a23b73fc20623df";

class Loot {

  constructor(rpcProvider) {
    const rpc = new ethers.providers.JsonRpcProvider(rpcProvider);
    const loot = new ethers.Contract(lootAddress, lootABI, rpc);
    const moreLoot = new ethers.Contract(moreLootAddress, lootABI, rpc);

    this.loot = loot;
    this.moreLoot = moreLoot;
  }

  async bag(lootId) {
    if (lootId > 0) {
      let loot = (lootId < 8001) ? this.loot : this.moreLoot;
      let type = (lootId < 8001) ? "Loot": "More Loot";

      const [chest, foot, hand, head, neck, ring, waist, weapon] =
        await Promise.all([
          loot.getChest(lootId),
          loot.getFoot(lootId),
          loot.getHand(lootId),
          loot.getHead(lootId),
          loot.getNeck(lootId),
          loot.getRing(lootId),
          loot.getWaist(lootId),
          loot.getWeapon(lootId),
        ]);

      let bag = {
        id: lootId,
        type: type,
        chest: chest,
        foot: foot,
        hand: hand,
        head: head,
        neck: neck,
        ring: ring,
        waist: waist,
        weapon: weapon,
      }

      return bag;
    }

    return {};
  }

  async lootIdsInWallet(address) {
    const balance = await this.loot.balanceOf(address);
    let lootIds = [];
    for (var i = 0;i < balance; i++) {
      let lootId = await this.loot.tokenOfOwnerByIndex(address, i);
      lootIds.push(lootId.toString());
    }

    return lootIds;
  }

  async build(address) {

  }
}

module.exports = Loot;
