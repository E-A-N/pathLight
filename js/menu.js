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
        menuState.characterHoodie = data.menuState.characterHoodie || config.menuState.characterHoodie;
        menuState.characterBody = data.menuState.characterBody || config.menuState.characterBody;
        menuState.characterArm = data.menuState.characterArm || config.menuState.characterArm;
        menuState.characterStaffHead = data.menuState.characterStaffHead || config.menuState.characterStaffHead;
        menuState.characterShaft = data.menuState.characterShaft || config.menuState.characterShaft;    
        menuState.idleAnimation = data.menuState.idleAnimation || config.menuState.idleAnimation;
    },

    startGame: function() {
        //game.state.start("gameLoop", data);   // data is currently undefined
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

        let characterStaffHeadData = [
            menuState.width * menuState.characterStaffHead.xRegion,
            menuState.height * menuState.characterStaffHead.yRegion,
            menuState.characterStaffHead.key
        ];
        menuState.characterStaffHead.sprite = game.add.image(...characterStaffHeadData);
        menuState.characterStaffHead.sprite.anchor.setTo(...graphicCenter);

        menuState.tweenIdleMotionDown(menuState.characterHorns.sprite);
        menuState.tweenIdleMotionDown(menuState.characterFace.sprite);
        menuState.tweenIdleMotionDown(menuState.characterHoodie.sprite);
        // menuState.tweenIdleMotionDown(menuState.characterBody.sprite);
        menuState.tweenIdleMotionDown(menuState.characterArm.sprite);
        menuState.tweenIdleMotionDown(menuState.characterStaffHead.sprite);
        menuState.tweenIdleMotionDown(menuState.characterShaft.sprite);

    },

    tweenStartButtonToTransparent: function () {
        menuState.startButton.tweenToTransparent = game.add.tween(menuState.startButton.button).to(...menuState.startButtonTweenToTransparentData);
        menuState.startButton.tweenToTransparent.onComplete.add(menuState.tweenStartButtonToOpaque);  // begin tweening to opaque after finished tweening to transparent
    },
    tweenStartButtonToOpaque: function () {
        menuState.startButton.tweenToOpaque = game.add.tween(menuState.startButton.button).to(...menuState.startButtonTweenToOpaqueData);
        menuState.startButton.tweenToOpaque.onComplete.add(menuState.tweenStartButtonToTransparent);    // begin tweening to transparent after finished tweening to opaque
    },

    tweenBackground2ToTransparent: function () {
        menuState.background2.tweenToTransparent = game.add.tween(menuState.background2.sprite).to(...menuState.background2TweenToTransparentData);
        menuState.background2.tweenToTransparent.onComplete.add(menuState.tweenBackground2ToOpaque);
    },
    tweenBackground2ToOpaque: function () {
        menuState.background2.tweenToOpaque = game.add.tween(menuState.background2.sprite).to(...menuState.background2TweenToOpaqueData);
        menuState.background2.tweenToOpaque.onComplete.add(menuState.tweenBackground2ToTransparent);
    },

    tweenIdleMotionDown: function (sprite) {
        let tweenData = [
            {y: sprite.position.y + menuState.idleAnimation.yOffset},
            1000,
            Phaser.Easing.Quadratic.InOut,
            true
        ]
        let tween = game.add.tween(sprite)
            .to(...tweenData);
        tween.onComplete.add(() => {
            menuState.tweenIdleMotionUp(sprite);
        });
    },

    tweenIdleMotionUp: function (sprite) {
        let tweenData = [
            {y: sprite.position.y - menuState.idleAnimation.yOffset},
            1000,
            Phaser.Easing.Quadratic.InOut,
            true
        ]
        let tween = game.add.tween(sprite)
            .to(...tweenData);
        tween.onComplete.add(() => {
            menuState.tweenIdleMotionDown(sprite);
        });

    }
};
