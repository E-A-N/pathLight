const objectSpawner = {};

objectSpawner.inactiveObjectPool;
objectSpawner.activeObjectPool = {};
objectSpawner.distanceUntilNextColorPickupSpawn;
objectSpawner.blurGlows = [];
objectSpawner.init = (data) => {
    data = typeof data === "undefined" ? {} : data;
    objectSpawner.colorPickup = data.colorPickup || config.default.colorPickup;
    objectSpawner.tiles = data.settings || config.default.settings;
    objectSpawner.width = data.screenWidth || config.init.screenWidth;

    objectSpawner.id = 0;
    objectSpawner.inactiveObjectPool = [];
    objectSpawner.graphicCenter = [0.5, 0.5];
};

objectSpawner.create = () => {
    objectSpawner.assignNextDistanceUntilColorPickupSpawn();
};

objectSpawner.update = () => {
    objectSpawner.distanceUntilNextColorPickupSpawn -= mapController.speed;
    if (objectSpawner.distanceUntilNextColorPickupSpawn <= 0) {
        objectSpawner.assignNextDistanceUntilColorPickupSpawn();
        let pickup = objectSpawner.spawnColorPickup();

        let pickupEventInitiated = typeof objectSpawner.onSpawn === "function"
        if (pickupEventInitiated){
            objectSpawner.onSpawn(pickup)
        }
    }

    for (let i in objectSpawner.blurGlows){
        let blurGlow = objectSpawner.blurGlows[i];
        objectSpawner.updateBlurGlow(blurGlow);
    }
};

objectSpawner.assignNextDistanceUntilColorPickupSpawn = () => {
    let minDistance = objectSpawner.colorPickup.tilesBetweenSpawns.min * objectSpawner.tiles.tileHeight;
    let maxDistance = objectSpawner.colorPickup.tilesBetweenSpawns.max * objectSpawner.tiles.tileHeight;
    objectSpawner.distanceUntilNextColorPickupSpawn = randomUtilities.randomRange(minDistance, maxDistance);
};

objectSpawner.spawnColorPickup = () => {
    let choice = Math.floor(Math.random() * config.default.colorPickup.colorOptions.length);
    let colorPickup = {
        type: "color",
        color: objectSpawner.colorPickup.colorOptions[choice],
        id: objectSpawner.id++
    };

    const theresNoItemsToDeploy = objectSpawner.inactiveObjectPool.length === 0;
    if (theresNoItemsToDeploy) {
        let colorPickupData = [
            0,
            0,
            objectSpawner.colorPickup.key
        ];
        colorPickup.sprite = game.add.sprite(...colorPickupData);
        colorPickup.sprite.anchor.setTo(...objectSpawner.graphicCenter);
        objectSpawner.generateBlurGlow(colorPickup);
    }
    else {
        colorPickup.sprite = objectSpawner.inactiveObjectPool.pop();
    }
    game.physics.enable(colorPickup.sprite, Phaser.Physics.ARCADE);
    colorPickup.sprite.enableBody = true;
    let minX = colorPickup.sprite.width * colorPickup.sprite.anchor.x;
    let maxX = objectSpawner.width - colorPickup.sprite.width * (1 - colorPickup.sprite.anchor.x);
    colorPickup.sprite._spawnParent = colorPickup;
    objectSpawner.activeObjectPool[colorPickup.id] = colorPickup;
    colorPickup.sprite.x = randomUtilities.randomRange(minX, maxX);
    colorPickup.sprite.tint = colorPickup.color.value;
    colorPickup.sprite.onFullyLeftMap = (sprite) => {
        objectSpawner.disableObject(sprite);
        objectSpawner.stopTween(colorPickup.blurGlow);
    }
    
    colorPickup.sprite.enabled = true;
    mapController.addToTopOfMap(colorPickup.sprite);

    return colorPickup;
};

objectSpawner.generateBlurGlow = (target) => {
    let blurGlowImageData = [
        target.sprite.x,
        target.sprite.y,
        config.default.blurGlow.key
    ];
    let blurGlow = {};
    blurGlow.tween = null;
    blurGlow.parent = target;
    blurGlow.sprite = game.add.sprite(...blurGlowImageData);
    blurGlow.sprite.x = target.sprite.x;
    blurGlow.sprite.y = target.sprite.y;
    blurGlow.sprite.anchor.setTo(...objectSpawner.graphicCenter);
    blurGlow.sprite.tint = target.color.value;
    target.blurGlow = blurGlow;
    objectSpawner.blurGlows.push(blurGlow);
    game.world.sendToBack(blurGlow.sprite);
}

objectSpawner.updateBlurGlow = (blurGlow) => {
    if (playerUtilities.player.color === blurGlow.parent.color.value){
        if (blurGlow.tween === null){
            objectSpawner.initBlurGlowTween(blurGlow)
        }
    }
    else {
        objectSpawner.stopTween(blurGlow)
    }
    blurGlow.sprite.x = blurGlow.parent.sprite.x;
    blurGlow.sprite.y = blurGlow.parent.sprite.y;
    blurGlow.sprite.z = 2;
    blurGlow.sprite.anchor.setTo(...objectSpawner.graphicCenter);
    blurGlow.sprite.tint = blurGlow.parent.color.value;
}

objectSpawner.initBlurGlowTween = (blurGlow) => {
    blurGlow.tween = game.add.tween(blurGlow.sprite.scale)
        .to({ x: 3, y: 3 }, 1000, Phaser.Easing.Quadratic.InOut) 
        .to({ x: 1, y: 1 }, 1000, Phaser.Easing.Quadratic.InOut)
        .loop(true)
        .start();
}

objectSpawner.stopTween = (blurGlow) => {
    if (blurGlow.tween !== null) {
        blurGlow.tween.stop();
        blurGlow.tween = null;
        blurGlow.sprite.scale.x = 1;
        blurGlow.sprite.scale.y = 1;

    }
}

objectSpawner.disableObject = (sprite) => {
    console.log("eandebug on fully left map!!!");
    sprite.enabled = false;
    sprite.enableBody = false;
    delete objectSpawner.activeObjectPool[sprite._spawnParent.id];
    objectSpawner.inactiveObjectPool.push(sprite);
};

objectSpawner.onSpawn = null;
