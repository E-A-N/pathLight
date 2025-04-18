const config = {
    //Any NONE GAME STATE config information goes under default
    default: {},
    loader:{
        x: 80,
        y: 150,
        text: 'loading...',
        font: '30px Courier',
        fill: '#fff',
        logo: 'assets/img/boilerplate-logo.png',
        background: "#000000",
        playerImage: {
            src: 'assets/img/templatePlayerFace.png',
            key: "player"
        },
        mapImage:{
            src: 'assets/img/floorBG.png',
            key: "gameMap"
        },
        placeHolder: {
            src: "assets/img/placeHolder.png",
            key: "placeHolder"
        },
        bgm: {
            mp3: "assets/audio/bodenstaendig2000InRock4bit.mp3",
            ogg: "assets/audio/bodenstaendig2000InRock4bit.ogg",
            label:   "loadingScreenBgm"
        },
        screenImg: "",
        loadValue:  0,
        loadScreen:{
            src: "assets/img/loadingScreenAsset.png",
            spriteLabel: "loadScreen",
            xPosition: 0,
            yPosition: 100
        },
        loadText:{
            src: "assets/img/loadingTextAsset.png",
            spriteLabel:    "loadText",
            xPosition: 0,
            yPosition: 10
        },
        cursors: {},
        velocity: 80
    },
    init:{
        //screenWidth: 375,
        screenWidth: 297,
        screenHeight: 812,
        phoneWidth: 360,
        phoneHeight: 740
    },
    boot:{
        bootString : "...preparing to load."
    },
    menuState: {
        background: {
            xRegion: 0.5,
            yRegion: 0.5,
            key: "mainMenuBackground",
            src: "assets/img/mainMenuRed.png"
        },
        background2: {
            xRegion: 0.5,
            yRegion: 0.5,
            key: "mainMenuBackground2",
            src: "assets/img/mainMenuBlue.png",
            opacityCycleDurationInSeconds: 7,
            tweenToTransparentProperties: { alpha: 0 },
            tweenToOpaqueProperties: { alpha: 1.0 },
            tweenToTransparentEasing: Phaser.Easing.Quadratic.InOut,
            tweenToOpaqueEasing: Phaser.Easing.Quadratic.InOut
        },
        title: {
            xRegion: 0.5,
            yRegion: 0.383,
            key: "titleGraphic",
            src: "assets/img/pathLightTitleAsset.png"
        },
        startButton: {
            xRegion: 0.5,
            yRegion: 0.496,
            key: "startButton",
            src: "assets/img/startButtonAsset.png",
            opacityCycleDurationInSeconds: 3,
            tweenToTransparentProperties: { alpha: 0.5 },
            tweenToOpaqueProperties: { alpha: 1.0 },
            tweenToTransparentEasing: Phaser.Easing.Quadratic.In,
            tweenToOpaqueEasing: Phaser.Easing.Quadratic.Out
        },
        startButtonDots: {
            xRegion: 0.5,
            yRegion: 0.5,
            key: "startButtonDots",
            src: "assets/img/startDotsAsset.png"
        }
    },
    gameLoop:{
        xStartRegion: 0.5,
        yStartRegion: 0.75,
        blocks: {
            full: {},
            half: {},
            quarter: {}
        }
    },
    gameOverState: {
        gameOverLabel: {
            xRegion: 0.5,
            yRegion: 0.25,
            text: "Game Over!",
            style: {
                font: "35px Courier",
                fill: "#fff"
            }
        },
        finalScoreLabel: {
            xRegion: 0.5,
            yRegion: 0.33,
            text: "Final Score:",
            style: {
                font: "30px Courier",
                fill: "#fff"
            }
        },
        finalScoreText: {
            xRegion: 0.5,
            yRegion: 0.45,
            style: {
                font: "30px Courier",
                fill: "#fff"
            }
        },
        restartButton: {
            xRegion: 0.5,
            yRegion: 0.66,
            key: "restartButton",
            src: "assets/img/startButton.png" // TODO: Make restart button
        }
    }
};
//Settings should be initiated 1st out of all defaults
config.default.settings = {
    tileHeight: 58,
    tileWidth:  74,
    wrapOffset: -1,
    mapVelocity: 50,
    maxMapVelocity: 150,
    difficultyInterval: 10000, //10 seconds
    difficulty: "easy"
};

config.default.controls = {
    mouse: 0,
    keyboard: 1
};

config.default.player = {
    speed: 2,
    controlType: config.default.controls.mouse,
    color:  0xffffff,
    key: "player",
    src: "../spriteLocation.png"
};

config.default.darkness = {
    key: "darkness",
    src: "assets/img/darknessLayer.png"
}

config.default.particles = {
    key: "particles",
    src: "assets/img/whiteParticle.png",
    emitter: {},
    offsetX: -23,
    offsetY: -27,
    faceOffsetX: -23,
    faceOffsetY: -27,
    backOffsetX: 23,
    backOffsetY: -27
}

config.default.blocks = {
    full: {
        score: 25,
        src: "assets/img/fullBlock.png",
        key: "fullBlock"
    },
    half: {
        score: 50,
        src: "assets/img/halfBlock.png",
        key: "halfBlock"
    },
    quarter: {
        score: 100,
        src: "assets/img/quarterBlock.png",
        key: "quarterBlock"
    }
};

config.default.score = {
    amount: 0,
    bonus: 1,
    text: "SCORE:",
    x: config.default.settings.tileWidth,
    y: 5,
    numOffsetX: 17,     // score value, number of spaces
    sprites:{
        scoreText:{
            src: "assets/img/scoreTexts/scoreTextAsset.png",
            key: "scoreText"
        },
        textNum0:{
            src: "assets/img/scoreTexts/textNum0.png",
            key: "textNum0"
        },
        textNum1:{
            src: "assets/img/scoreTexts/textNum1.png",
            key: "textNum1"
        },
        textNum2:{
            src: "assets/img/scoreTexts/textNum2.png",
            key: "textNum2"
        },
        textNum3:{
            src: "assets/img/scoreTexts/textNum3.png",
            key: "textNum3"
        },
        textNum4:{
            src: "assets/img/scoreTexts/textNum4.png",
            key: "textNum4"
        },
        textNum5:{
            src: "assets/img/scoreTexts/textNum5.png",
            key: "textNum5"
        },
        textNum6:{
            src: "assets/img/scoreTexts/textNum6.png",
            key: "textNum6"
        },
        textNum7:{
            src: "assets/img/scoreTexts/textNum7.png",
            key: "textNum7"
        },
        textNum8:{
            src: "assets/img/scoreTexts/textNum8.png",
            key: "textNum8"
        },
        textNum9:{
            src: "assets/img/scoreTexts/textNum9.png",
            key: "textNum9"
        }
    },
};

config.default.score.spriteMap = {
    "0": config.default.score.sprites.textNum0.key,
    "1": config.default.score.sprites.textNum1.key,
    "2": config.default.score.sprites.textNum2.key,
    "3": config.default.score.sprites.textNum3.key,
    "4": config.default.score.sprites.textNum4.key,
    "5": config.default.score.sprites.textNum5.key,
    "6": config.default.score.sprites.textNum6.key,
    "7": config.default.score.sprites.textNum7.key,
    "8": config.default.score.sprites.textNum8.key,
    "9": config.default.score.sprites.textNum9.key
};

config.default.debug = {
    isOn: true, //to avoid coercion
    controls: {}
};

config.default.neutralMap = {
    xRegion: 0.5,
    key: "neutralMap",
    src: "assets/img/floorBgAsset.png"
};

config.default.difficultyModifiers = {
    easy: {
        velocityModifier: 0.75,
        velocityIncrease: 0.10,
        bonus: 0.75,
    },
    medium: {
        velocityModifier: 1,
        velocityIncrease: 0.15,
        bonus: 1.0,
    },
    hard:{
        velocityModifier: 1.25,
        velocityIncrease: 0.25,
        bonus: 1.25,
    }
};

config.default.gameMap = {
    startMarker: {
        x: 0,
        y: config.default.settings.tileHeight * -1
    },
    endMarker: {
        x: 0,
        y: config.default.settings.tileHeight * -14
    },
    normalSpeed: 1,
    hardSpeed: 2
};

config.default.colors = {
    white: {
        value: 0xffffff,
        amount: 0
    },
    // primaries
    red: {
        value: 0xff0000,
        amount: 0
    },
    yellow: {
        value: 0xffff00,
        amount: 0
    },
    blue: {
        value: 0x0000ff,
        amount: 0
    },
    // secondaries
    orange: {
        value: 0xff8000,
        amount: 0
    },
    purple: {
        value: 0x800080,
        amount: 0
    },
    green: {
        value: 0x00ff00,
        amount: 0
    }
};

config.default.colorLookup = {
    0xffffff: 'white',
    // primaries
    0xff0000: 'red',
    0xffff00: 'yellow',
    0x0000ff: 'blue',

    // secondaries
    0xff8000: "orange",
    0x800080: "purpole",
    0x00ff00: "green"
};

config.default.colorPickup = {
    colorOptions: [
        config.default.colors.red,
        config.default.colors.yellow,
        config.default.colors.blue
    ],
    pickupScore: 0,
    tilesBetweenSpawns: {
        min: 25,
        max: 100
    },
    src: "assets/img/pickUpAsset.png",
    key: "colorPickup"
};

config.default.blurGlow = {
    colorOptions: [
        config.default.colors.red,
        config.default.colors.yellow,
        config.default.colors.blue
    ],
    pickupScore: 0,
    tilesBetweenSpawns: {
        min: 25,
        max: 100
    },
    src: "assets/img/blurGlow.png",
    key: "blurGlow"
};

config.default.colorStates = {
    activeColors: ["color1", "color2"],
    spawnedPickups: [],
    blockColors:  [],
    activeNumber: 0,
    activeColorSIMPLE: "color"
};

config.default.mapUtilities = {
    rowSize: 14,
    columnSize: 4,
    icons : {
        full: 9,
        half: 8,
        quarter: 7,
        pickup: 6,
        colorBeam: 5
    }
};

config.default.gameInformation = {
    title: "PathLight",
    htmlID: "gameContainer",
    hackable: true,
    devModeSimple: true
};

config.player = {};
config.player.animations = {
    key: "playerAnims", 
    src: "assets/img/animations/playerAnimations.png",
    deathFrames: [0,1,2,3,4,5],
    deathTorchFrames: [6,7,8,9,10,11],
    walkAwayFrames: [12,13,14,15],
    walkAwayTorchFrames: [16,17,18,19],
    walkFacingFrames: [20, 21,22, 23],
    walkFacingTorchFrames: [24,25,26,27]
}