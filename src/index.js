
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

  async numberOfOGBagsInWallet(address) {
    let balance = await this.loot.balanceOf(address);

    return balance.toNumber();
  }

  async numberOfMoreBagsInWallet(address) {
    let balance = await this.moreLoot.balanceOf(address);

    return balance.toNumber();
  }

  async numberOfBagsInWallet(address, excludingMoreLoot=true) {
    return await this.numberOfOGBagsInWallet(address) + (excludingMoreLoot ? 0 : await this.numberOfMoreBagsInWallet(address));
  }

  async lootIdsInWallet(address, excludingMoreLoot=true) {
    const numberOfBags = await this.numberOfBagsInWallet(address);
    let lootIds = [];
    let tasks = [];
    for (var i = 0;i < numberOfBags; i++) {
      tasks.push(this.loot.tokenOfOwnerByIndex(address, i));
    }

    if (!excludingMoreLoot) {
      const numberOfMoreBags = await this.numberOfMoreBagsInWallet(address);
      for (var i = 0;i < numberOfMoreBags; i++) {
        tasks.push(this.moreLoot.tokenOfOwnerByIndex(address, i));
      }
    }

    const data = await Promise.all(tasks);
    for (const lootIdBN of data) {
      lootIds.push(lootIdBN.toString());
    }

    return lootIds;
  }
}

module.exports = Loot;
