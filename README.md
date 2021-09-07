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

// get wallet lootIds
var lootIds = await loot.lootIdsInWallet("0x84AB05F09B5ad3a1de6941FBf29BdF77CC7E2100");
console.log(lootIds);
```
