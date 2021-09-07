# loot.js

## Install

```Shell
npm install --save loot.js
```

## Get started

```javascript
var Loot = require('loot.js');

// init
let loot = new Loot("http://localhost:8545");

// get bag
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

var mBag = await loot.bag(22791);
console.log(mBag);

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

// get wallet lootIds
var lootIds = await loot.lootIdsInWallet("0x84AB05F09B5ad3a1de6941FBf29BdF77CC7E2100");
console.log(lootIds);
// [ '1000' ]
```
