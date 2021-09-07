# loot.js

## Install

```Shell
npm install --save loot.js
```

## Get started

```javascript
var Loot = require('loot.js');

// init
const address = "0x84AB05F09B5ad3a1de6941FBf29BdF77CC7E2100";
let loot = new Loot("http://localhost:8545");

// get OG Loot balance
const ogCount = await loot.numberOfOGBagsInWallet(address);

// get More Loot balance
const moreCount = await loot.numberOfMoreBagsInWallet(address);

// get OG and More Loot balance
const allCount = await loot.numberOfBagsInWallet(address, false);

// get OG and More LootIds
var lootIds = await loot.lootIdsInWallet(address, false);

// 👁️ Bag #1000 (an OG Loot)
var bag = await loot.bag(1000);
console.log(bag);
/*
{
  id: 1000,
  type: 'Loot',
  chest: 'Holy Chestplate',
  foot: 'Leather Boots',
  hand: 'Leather Gloves',
  head: 'Ancient Helm',
  neck: 'Amulet of Giants',
  ring: 'Platinum Ring',
  waist: 'Demonhide Belt of the Twins',
  weapon: '"Gloom Grasp" Katana of the Twins +1'
}

*/

// 👁️ Bag #22791 (a More Loot)
var bag = await loot.bag(22791);
console.log(bag);
/*
{
  id: 22791,
  type: 'More Loot',
  chest: '"Gloom Bite" Ring Mail of Perfection +1',
  foot: 'Chain Boots',
  hand: 'Holy Gauntlets of Perfection',
  head: '"Cataclysm Peak" Great Helm of Power +1',
  neck: '"Rage Grasp" Pendant of Protection +1',
  ring: '"Skull Moon" Silver Ring of Skill +1',
  waist: '"Mind Bender" Sash of Enlightenment +1',
  weapon: 'Book'
}
*/
```
