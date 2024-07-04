const playerUtilities = {};
playerUtilities.create = (player) => {
  // clicking the mouse during this state will change the control type to mouse

    game.input.onDown.add( () => {
      player.controlType = config.default.controls.mouse;
    });
    game.physics.enable(player.sprite, Phaser.Physics.ARCADE);
    player.sprite.enableBody = true;
    player.sprite.body.collideWorldBounds  = true;
    const spriteCenter = [0.5, 0.5];
    player.sprite.anchor.setTo(...spriteCenter);
    playerUtilities.player = player;
};

playerUtilities.update = (player) => {
    let priorY = player.sprite.y;
    let priorX = player.sprite.x;
    playerUtilities.move(player, player.controlType);
    for (let i in objectSpawner.activeObjectPool){
        let colorObject = objectSpawner.activeObjectPool[i];
        // console.log(player.color, colorObject.color.value, player.color === colorObject.color.value);
        if (player.color === colorObject.color.value){
            playerUtilities.colorCollision(player, colorObject);
        }
    }

    let currentY = player.sprite.y;
    let currentX = player.sprite.x;
    if (player.sprite.animations.currentAnim){
        let name = player.sprite.animations.currentAnim.name;
        if (priorY > currentY && name !== "walkAwayAnime"){
            gameLoop.player.sprite.animations.play("walkAwayAnime");
            console.log(name, "playing");
        }
        else if (priorY < currentY && name !== "walkFaceAnime"){
            gameLoop.player.sprite.animations.play("walkFaceAnime");
            console.log(name, "playing");

        }
        else if (priorX === currentX && name !== "playerIdle"){
            gameLoop.player.sprite.animations.play("playerIdle");
            console.log(name, "playing");
        }
    }
};

playerUtilities.colorCollision = (player, colorObject) => {
    game.physics.arcade.collide(player, colorObject.sprite, (spr1, spr2) => {
        console.log("collision is happening!!");
    });
}


playerUtilities.move = (player, type) => {
    let mouseType    = type === 0;
    let keyboardType = type === 1;
    // let animeName = player.sprite.currentAnim.name;
    let priorY = player.sprite.y;

    if (mouseType) {
        playerUtilities.mouseMovement(player, player.speed);
    }

    // Keyboard movement is always listening, and will turn off mouse movement if any keyboard movement key is hit
    playerUtilities.keyboardMovement(player, player.speed);

    let currentY = player.sprite.y;
    // console.log("eandebug:", animeName, priorY, currentY);

    return type;
};
playerUtilities.mouseMovement = (player, playerSpeed) => {
    let movementVector = {
        x: game.input.x - player.sprite.x,
        y: game.input.y - player.sprite.y
    };
    let movementVectorMagnitude = Math.sqrt(
        Math.pow(movementVector.x, 2) +
        Math.pow(movementVector.y, 2));
    if (movementVectorMagnitude != 0) {
        if (movementVectorMagnitude > playerSpeed) {
            // normalize the vector
            movementVector.x /= movementVectorMagnitude;
            movementVector.y /= movementVectorMagnitude;
            // scale the vector to maximum speed
            movementVector.x *= playerSpeed;
            movementVector.y *= playerSpeed;
        }
        player.sprite.x += movementVector.x;
        player.sprite.y += movementVector.y;
        // player.sprite.body.velocity.x   = movementVector.x;
        // player.sprite.body.velocity.y   = movementVector.y;
    }
};

playerUtilities.keyboardMovement = (player, playerSpeed) => {
    //Taking advantage of coercion to implement keyboard control algorithm
    let xVelocityInput = (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) - game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) * playerSpeed;
    let yVelocityInput = (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) - game.input.keyboard.isDown(Phaser.Keyboard.UP)) * playerSpeed;

    // Set diagonal effective speed equal to horizontal/vertical effective speed
    if (xVelocityInput != 0 && yVelocityInput != 0) {
        xVelocityInput *= Math.sqrt(0.5);
        yVelocityInput *= Math.sqrt(0.5);
    }

    player.sprite.x += xVelocityInput;
    player.sprite.y += yVelocityInput;

    // switch movement type to keyboard if a keyboard movement input is used
    if (xVelocityInput != 0 || yVelocityInput != 0)
        player.controlType = config.default.controls.keyboard;
};
