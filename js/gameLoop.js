//initiliaze gameLoop 1st so it functions as a namespace

let gameLoop = {};
gameLoop = {
    // phaser default methods (subStates) -------------------------

    init: (data) => {
        data = typeof data === "undefined" ? {} : data;
        gameLoop.player     = data.player       || config.default.player;
        gameLoop.score      = data.score        || config.default.score;
        gameLoop.particles   = data.particles     || config.default.particles;
        gameLoop.width      = data.width        || config.init.screenWidth;
        gameLoop.height     = data.height       || config.init.screenHeight;
        gameLoop.xStartRegion = data.xStartRegion || config.gameLoop.xStartRegion;
        gameLoop.yStartRegion = data.yStartRegion || config.gameLoop.yStartRegion;
        gameLoop.difficulty   = data.difficulty   || config.default.settings.difficulty;
        gameLoop.velocity     = data.velocity     || config.default.settings.mapVelocity;
        if (data.debug && data.debug.isOn === true){
            gameLoop.debugMode = data.debug.isOn;
            gameLoop.debug = data.debug;
        }
        else {
            gameLoop.debugMode = false;
        }

        mapController.init();
        neutralMap.init();
        objectSpawner.init();
        gameLoop.colorController = setInterval(gameLoop.randomColorUpdate, 3000);
    },

    create: () => {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        neutralMap.create();    // setup neutral map sprites
        objectSpawner.create();
        blockUtilities.init();

        //setup player object
        let playerStartData = [
            gameLoop.width  * gameLoop.xStartRegion,
            gameLoop.height * gameLoop.yStartRegion,
            "playerAnims"
        ];
        gameLoop.player.sprite = game.add.sprite(...playerStartData);

        let frameRate = 32
        let deathAniData = [
            "deathFrames",
            config.player.animations["deathFrames"],
            frameRate,
            true
        ];
        gameLoop.player.sprite.animations.add(...deathAniData);

        let walkAwayAniData = [
            "walkAwayFrames",
            config.player.animations["walkAwayFrames"],
            frameRate,
            true
        ];
        gameLoop.player.sprite.animations.add(...walkAwayAniData);


        let walkFacingAniData = [
            "walkFacingFrames",
            config.player.animations["walkFacingFrames"],
            frameRate,
            true
        ];
        gameLoop.player.sprite.animations.add(...walkFacingAniData);

        let idleAniData = [
            "playerIdle",
            [config.player.animations["walkFacingFrames"][0]],
            frameRate,
            true
        ];
        gameLoop.player.sprite.animations.add(...idleAniData);
        gameLoop.player.sprite.animations.play("playerIdle");

        gameLoop.player.torch = {};
        gameLoop.player.torch.sprite = game.add.sprite(...playerStartData);
        let deathAniTorchData = [
            "deathTorchFrames",
            config.player.animations["deathTorchFrames"],
            5,
            true
        ];
        gameLoop.player.torch.sprite.animations.add(...deathAniTorchData);

        let walkAwayAniTorchData = [
            "walkAwayTorchFrames",
            config.player.animations["walkAwayTorchFrames"],
            5,
            true
        ];
        gameLoop.player.torch.sprite.animations.add(...walkAwayAniTorchData);


        let walkFacingAniTorchData = [
            "walkFacingTorchFrames",
            config.player.animations["walkFacingTorchFrames"],
            5,
            true
        ];
        gameLoop.player.torch.sprite.animations.add(...walkFacingAniTorchData);

        let idleAniTorchData = [
            "playerIdleTorch",
            [config.player.animations["walkFacingTorchFrames"][0]],
            1,
            true
        ];
        gameLoop.player.torch.sprite.animations.add(...idleAniTorchData);
        gameLoop.player.torch.sprite.animations.play("playerIdleTorch");


        playerUtilities.create(gameLoop.player);
        darknessUtilities.create(gameLoop.player);
        particlesUtilities.create(gameLoop.particles, gameLoop.player);

        //interface pickups with player using event style callback
        objectSpawner.onSpawn = playerUtilities.collisionInit;

        //setup score UI
        scoreUtilities.create(gameLoop.score);

        if (gameLoop.debugMode === true) {
            gameLoop.debug.controls = game.input.keyboard;
        };

        //gameLoop.difficultyIncrease = gameLoop.manageDifficulty();    // idk what this does lol
    },

    update: () => {
        mapController.update();
        objectSpawner.update();
        playerUtilities.update(gameLoop.player, gameLoop.player.controlType);
        particlesUtilities.update(gameLoop.particles, gameLoop.player);

        // update score
        scoreUtilities.setText(gameLoop.score, gameLoop.score.bonus);

        if(gameLoop.debugMode){
            //let upScrollCheat   = gameLoop.debug.controls.isDown(Phaser.KeyCode.OPEN_BRACKET);
            //let downScrollCheat = gameLoop.debug.controls.isDown(Phaser.KeyCode.CLOSED_BRACKET);
            let gameOverCheat   = gameLoop.debug.controls.isDown(Phaser.KeyCode.SPACEBAR);

            //upScrollCheat   ? neutralMap.setMapSpeed(-gameLoop.difficulty) : -1;
            //downScrollCheat ? neutralMap.setMapSpeed(gameLoop.difficulty)  : -1;
            gameOverCheat   ? game.state.start("end") : -1;
        }

    },
    render:() => {
        // game.debug.body(gameLoop.player.sprite);
        // mapController.render();
        //game.debug.body(sprite2);
    },
    //This will eventually be an isolated module
    manageDifficulty: () => {
        let data = config.default.difficultyModifiers[gameLoop.difficulty];
        let velocityIncreaser = () => {
            let atMaxDifficulty = gameLoop.velocity >= config.default.settings.maxMapVelocity
            if (atMaxDifficulty){
                gameLoop.velocity = config.default.settings.maxMapVelocity;
                return;
            };

            //gameLoop.velocity *= data.velocityIncrease;
            //neutralMap.setMapSpeed(gameLoop.velocity);
            //blockUtilities.setVelocity(gameLoop.velocity);

        };

        let intervalData = [velocityIncreaser, config.default.settings.difficultyInterval];
        let interval = setInterval(...intervalData);

        return interval;
    },

    randomColorUpdate: () => {
        if(game.state.current !== "gameLoop"){
            clearInterval(gameLoop.colorController);
            return;
        }
        let choice = Math.floor(Math.random() * config.default.colorPickup.colorOptions.length);
        let newColor = config.default.colorPickup.colorOptions[choice];
        gameLoop.player.color = newColor.value;
        // console.log("Players new color is now:", choice, newColor.value, config.default.colorLookup[newColor.value]);
    }
};
