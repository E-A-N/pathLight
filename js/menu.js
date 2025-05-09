// initialize menuState 1st so it functions as a namespace
let menuState = {};
menuState = {
    init: (data) => {
        data = typeof data === "undefined" ? { menuState: {} } : data;
        menuState.width = data.width || config.init.screenWidth;
        menuState.height = data.height || config.init.screenHeight;
        menuState.background = data.menuState.background || config.menuState.background;
        menuState.background2 = data.menuState.background2 || config.menuState.background2;
        menuState.title = data.menuState.title || config.menuState.title;
        menuState.startButton = data.menuState.startButton || config.menuState.startButton;
        menuState.startButtonDots = data.menuState.startButtonDots || config.menuState.startButtonDots;
        menuState.characterHorns = data.menuState.characterHorns || config.menuState.characterHorns;
        menuState.characterFace = data.menuState.characterFace || config.menuState.characterFace;

        menuState.characterLeftEye = data.menuState.characterLeftEye 
            || Object.assign({} , config.menuState.characterSingleEye);

        menuState.characterRightEye = data.menuState.characterRightEye
            || Object.assign({} , config.menuState.characterSingleEye);

        menuState.characterHoodie = data.menuState.characterHoodie || config.menuState.characterHoodie;
        menuState.characterBody = data.menuState.characterBody || config.menuState.characterBody;
        menuState.characterArm = data.menuState.characterArm || config.menuState.characterArm;
        menuState.characterStaffHead = data.menuState.characterStaffHead || config.menuState.characterStaffHead;
        menuState.characterShaft = data.menuState.characterShaft || config.menuState.characterShaft;    
        menuState.idleAnimation = data.menuState.idleAnimation || config.menuState.idleAnimation;
    },

    startGame: function() {
        game.state.start("gameLoop");
    },

    create: () => {
        const graphicCenter = [0.5, 0.5];    // [X, Y]

        let menuTitleData = [
            menuState.width * menuState.title.xRegion,
            menuState.height * menuState.title.yRegion,
            menuState.title.key
        ];
        menuState.title.sprite = game.add.sprite(...menuTitleData);
        menuState.title.sprite.anchor.setTo(...graphicCenter);

        let startButtonData = [
            menuState.width * menuState.startButton.xRegion,
            menuState.height * menuState.startButton.yRegion,
            menuState.startButton.key,
            menuState.startGame,
            menuState
        ];
        menuState.startButton.button = game.add.button(...startButtonData);
        menuState.startButton.button.anchor.setTo(...graphicCenter);

        let startButtonDotsData = [
            menuState.width * menuState.startButtonDots.xRegion,
            menuState.height * menuState.startButtonDots.yRegion,
            menuState.startButtonDots.key
        ];
        menuState.startButtonDots.sprite = game.add.sprite(...startButtonDotsData);
        menuState.startButtonDots.sprite.anchor.setTo(...graphicCenter);

        // Animate graphics ---------------------------------------
        menuState.startButtonTweenToTransparentData = [
            menuState.startButton.tweenToTransparentProperties,
            menuState.startButton.opacityCycleDurationInSeconds * 1000 / 2,
            menuState.startButton.tweenToTransparentEasing,
            true    // autostart tween, saves a call to tween.start()
        ];
        menuState.startButtonTweenToOpaqueData = [
            menuState.startButton.tweenToOpaqueProperties,
            menuState.startButton.opacityCycleDurationInSeconds * 1000 / 2,
            menuState.startButton.tweenToOpaqueEasing,
            true    // autostart tween, saves a call to tween.start()
        ];
        menuState.tweenStartButtonToTransparent();


        let characterBodyData = [
            menuState.width * menuState.characterBody.xRegion,
            menuState.height * menuState.characterBody.yRegion,
            menuState.characterBody.key
        ];
        menuState.characterBody.sprite = game.add.image(...characterBodyData);
        menuState.characterBody.sprite.anchor.setTo(...graphicCenter);

        let characterHoodieData = [
            menuState.width * menuState.characterHoodie.xRegion,
            menuState.height * menuState.characterHoodie.yRegion,
            menuState.characterHoodie.key
        ];
        menuState.characterHoodie.sprite = game.add.image(...characterHoodieData);
        menuState.characterHoodie.sprite.anchor.setTo(...graphicCenter);

        let characterShaftData = [
            menuState.width * menuState.characterShaft.xRegion,
            menuState.height * menuState.characterShaft.yRegion,
            menuState.characterShaft.key
        ];
        menuState.characterShaft.sprite = game.add.image(...characterShaftData);
        menuState.characterShaft.sprite.anchor.setTo(...graphicCenter);

        let characterArmData = [
            menuState.width * menuState.characterArm.xRegion,
            menuState.height * menuState.characterArm.yRegion,
            menuState.characterArm.key
        ];
        menuState.characterArm.sprite = game.add.image(...characterArmData);
        menuState.characterArm.sprite.anchor.setTo(...graphicCenter);

        let characterFaceData = [
            menuState.width * menuState.characterFace.xRegion,
            menuState.height * menuState.characterFace.yRegion,
            menuState.characterFace.key
        ];
        menuState.characterFace.sprite = game.add.image(...characterFaceData);
        menuState.characterFace.sprite.anchor.setTo(...graphicCenter);

        let characterHorns = [
            menuState.width * menuState.characterHorns.xRegion,
            menuState.height * menuState.characterHorns.yRegion,
            menuState.characterHorns.key
        ];
        menuState.characterHorns.sprite = game.add.image(...characterHorns);
        menuState.characterHorns.sprite.anchor.setTo(...graphicCenter);

        let characterLeftEye = [
            menuState.width * 0.42,
            menuState.height * menuState.characterLeftEye.yRegion,
            menuState.characterLeftEye.key
        ];
        menuState.characterLeftEye.sprite = game.add.image(...characterLeftEye);
        menuState.characterLeftEye.sprite.anchor.setTo(...graphicCenter);

        let characterRightEye = [
            menuState.width * 0.68,
            menuState.height * menuState.characterRightEye.yRegion,
            menuState.characterRightEye.key
        ];
        menuState.characterRightEye.sprite = game.add.image(...characterRightEye);
        menuState.characterRightEye.sprite.anchor.setTo(...graphicCenter);



        let characterStaffHeadData = [
            menuState.width * menuState.characterStaffHead.xRegion,
            menuState.height * menuState.characterStaffHead.yRegion,
            menuState.characterStaffHead.key
        ];
        menuState.characterStaffHead.sprite = game.add.image(...characterStaffHeadData);
        menuState.characterStaffHead.sprite.anchor.setTo(...graphicCenter);
        // menuState.characterStaffHead.sprite.tint= 0xffff00;
        // menuState.characterStaffHead.sprite.tint= 16776960;



        menuState.tweenIdleMotionDown(menuState.characterHorns.sprite, 3);
        menuState.tweenIdleMotionDown(menuState.characterFace.sprite, 3);
        menuState.tweenIdleMotionDown(menuState.characterLeftEye.sprite, 3);
        menuState.tweenIdleMotionDown(menuState.characterRightEye.sprite, 3);
        menuState.tweenIdleMotionDown(menuState.characterHoodie.sprite, 0, 200);
        menuState.tweenIdleMotionDown(menuState.characterArm.sprite, 5, 100);
        menuState.tweenIdleMotionDown(menuState.characterStaffHead.sprite, 5, 100);
        menuState.tweenIdleMotionDown(menuState.characterShaft.sprite, 5, 100);

        menuState.planEyeBlinks(Math.random() * 5000);
        menuState.planEyeColorCyle(Math.random() * 5000);
    },

    tweenStartButtonToTransparent: function () {
        menuState.startButton.tweenToTransparent = game.add.tween(menuState.startButton.button).to(...menuState.startButtonTweenToTransparentData);
        menuState.startButton.tweenToTransparent.onComplete.add(menuState.tweenStartButtonToOpaque);  // begin tweening to opaque after finished tweening to transparent
    },
    tweenStartButtonToOpaque: function () {
        menuState.startButton.tweenToOpaque = game.add.tween(menuState.startButton.button).to(...menuState.startButtonTweenToOpaqueData);
        menuState.startButton.tweenToOpaque.onComplete.add(menuState.tweenStartButtonToTransparent);    // begin tweening to transparent after finished tweening to opaque
    },

    tweenIdleMotionDown: function (sprite, customYOffset = 0, delay = 0) {
        let tweenData = [
            {y: sprite.position.y + (menuState.idleAnimation.yOffset + customYOffset)},
            1000,
            Phaser.Easing.Quadratic.InOut,
            true,
            delay
        ]
        let tween = game.add.tween(sprite)
            .to(...tweenData);

        tween.repeat(-1);
        tween.yoyo(true);
    },

    colorTween: (sprite, targetColor) => {
        let tweenObj = {
            color: sprite.tint
        }

        let tweenData = [
            {color: targetColor},
            2000,
            Phaser.Easing.Linear.None,
            true
        ];

        let tween = game.add.tween(tweenObj)
            .to(...tweenData);

        tween.onUpdateCallback(function(tween, value) {
            sprite.tint = tweenObj.color;
        });
    },

    planEyeColorCyle: function(time) {
        return setTimeout(() => {
            let colorOptions = [
                0xffffff,
                0xff0000,
                0xffff00,
                0x0000ff
            ]
            let choice = Math.floor(Math.random() * colorOptions.length);
            menuState.colorTween(
                menuState.characterStaffHead.sprite, 
                colorOptions[choice]
            )

            let nextTime = 5000 + (Math.random() * 10000);
            menuState.planEyeColorCyle(nextTime);
        }, time)
    },

    tweenEyeBlink: function (sprite) {
        let tweenData = [
            {y: 0.1},
            100,
            Phaser.Easing.Quadratic.InOut,
            true
        ]
        let tween = game.add.tween(sprite.scale)
            .to(...tweenData);
        tween.yoyo(true);
    },

    planEyeBlinks: function(time) {
        return setTimeout(() => {
            menuState.tweenEyeBlink(menuState.characterLeftEye.sprite);
            menuState.tweenEyeBlink(menuState.characterRightEye.sprite);

            let nextTime = 300 + (Math.random() * 5000);
            menuState.planEyeBlinks(nextTime);
        }, time)
    }
};
