const particlesUtilities = {};
particlesUtilities.create = (particles, player) => {
    let emitterX = player.sprite.x + config.default.particles.offsetX;
    let emitterY = player.sprite.y + config.default.particles.offsetY;
    particles.emitter = game.add.emitter(emitterX, emitterY, 200);

    particles.emitter.makeParticles(config.default.particles.key);

    particles.emitter.setRotation(0, 100);
    particles.emitter.setAlpha(1, 1);
    particles.emitter.setScale(0.1, 0, 0.1, 0, 3000);
    particles.emitter.gravity = 0;

    //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
    //	The 5000 value is the lifespan of each particle before it's killed
    particles.emitter.start(false, 1000, 100);
};

particlesUtilities.update = (particles, player) => {
    var px = player.sprite.body.velocity.x;
    var py = player.sprite.body.velocity.y;

    px *= -1;
    py *= -1;

    particles.emitter.minParticleSpeed.set(px, py);
    particles.emitter.maxParticleSpeed.set(px, py);

    let offsetX = 0;
    let offsetY = 0;

    if (player.sprite.animations.currentAnim){
        let name = player.sprite.animations.currentAnim.name;
        switch (name){
            case "walkAwayAnime":
                offsetX = config.default.particles.backOffsetX;
                offsetY = config.default.particles.backOffsetY;
            break;

            case "walkFaceAnime":
                offsetX = config.default.particles.faceOffsetX;
                offsetY = config.default.particles.faceOffsetY;
            break;

            default:
                offsetX = config.default.particles.offsetX;
                offsetY = config.default.particles.offsetY;
            break;
        }
    }

    particles.emitter.emitX = player.sprite.x + offsetX;
    particles.emitter.emitY = player.sprite.y + offsetY;

    // emitter.forEachExists(game.world.wrap, game.world);
    game.world.wrap(player.sprite, 64);
};
