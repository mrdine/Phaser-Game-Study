const gameState = {}

function preload() {
    // objects
    this.load.image('woodBotton', './assets/objects/environment_02.png')
    this.load.image('redBotton', './assets/objects/environment_05.png')
    this.load.image('blueBotton', './assets/objects/environment_08.png')
    this.load.image('greenBotton', './assets/objects/environment_10.png')
    this.load.image('coin', './assets/objects/environment_11.png')
    // world
    this.load.image('woodBlock', './assets/world/block_03.png')
    this.load.image('redBlock', './assets/world/block_08.png')
    this.load.image('woodCrate', './assets/world/crate_02.png')
    this.load.image('redCrate', './assets/world/crate_03.png')
    this.load.image('blueCrate', './assets/world/crate_04.png')
    this.load.image('greenCrate', './assets/world/crate_05.png')
    this.load.image('ground', './assets/world/ground_06.png')
    // player
    this.load.spritesheet('player', './assets/player/sheetPlayer3.png', { frameWidth: 64, frameHeight: 64 })
}

function create() {

    //keyboard input
    gameState.cursors = this.input.keyboard.createCursorKeys()

    var i = 11
    //10 x 10 world matrix
    var matrizMundo = [
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, i, i, i, 0, i, i, i, i, 0],
        [0, i, i, 3, i, i, i, i, i, 0],
        [0, i, i, i, i, i, 7, i, i, 0],
        [0, i, 2, i, i, i, 8, i, i, 0],
        [0, i, i, i, i, i, 9, i, i, 0],
        [0, i, i, i, 5, i, 10, i, i, 0],
        [0, i, 4, 6, i, i, i, i, i, 1],
        [0, i, i, i, 0, i, i, i, i, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
    ]
    /**
     * subtitles:
     *  0 = 'redBlock'
     *  1 = 'woodBlock'
     *  2 = 'redCrate'
     *  3 = 'woodCrate'
     *  4 = 'blueCrate'
     *  5 = 'greenCrate'
     *  6 = 'coin'
     *  7 = 'redBotton'
     *  8 = 'woodBotton'
     *  9 = 'blueBotton'
     *  10 = 'greenBotton'
     *  i = ignore
     */

    // ground layer
    var groundLayer = this.add.group()
    // borders layer
    var bordersLayer = this.physics.add.staticGroup()
    // bottons layer
    var bottonsLayer = this.add.group()
    // blocks layer
    var pbLayer = this.physics.add.staticGroup()

    // resize sprite to 10% of game screen
    var spriteSize = game.config.width * .1

    // fill world
    for (var lin = 0; lin < 10; lin++) {
        for (var col = 0; col < 10; col++) {
            // ground
            var gr = groundLayer.create(lin * spriteSize, col * spriteSize, 'ground').setOrigin(0, 0)
            // resize sprite
            gr.displayWidth = spriteSize
            gr.scaleY = 1.25

            //blocks and bottons
            var value = matrizMundo[col][lin]
            var theSprite = ''
            switch (value) {
                case 0:
                    theSprite = 'redBlock'
                    break
                case 1:
                    theSprite = 'woodBlock'
                    break
                case 2:
                    theSprite = 'redCrate'
                    break
                case 3:
                    theSprite = 'woodCrate'
                    break
                case 4:
                    theSprite = 'blueCrate'
                    break
                case 5:
                    theSprite = 'greenCrate'
                    break
                case 6:
                    theSprite = 'coin'
                    break
                case 7:
                    theSprite = 'redBotton'
                    break
                case 8:
                    theSprite = 'woodBotton'
                    break
                case 9:
                    theSprite = 'blueBotton'
                    break
                case 10:
                    theSprite = 'greenBotton'
                    break;
            }
            if (value != i) {
                if (value === 6) {
                    // bottonLayer
                    var coin = groundLayer.create(lin * spriteSize, col * spriteSize, theSprite).setOrigin(0, 0)
                    // resize sprite
                    coin.displayWidth = spriteSize
                    coin.scaleY = 1.25
                }
                else if (value === 7 || value === 8 || value === 9 || value === 10) {
                    // bottonLayer
                    var bl = bottonsLayer.create(lin * spriteSize, col * spriteSize, theSprite).setOrigin(0, 0)
                    // resize sprite
                    bl.displayWidth = spriteSize
                    bl.scaleY = 1.25
                } else {
                    //if ((lin === 0 || lin === 9) || col === 0 || col === 9) 
                    if (value === 0 || value === 1) {
                        // border layer
                        var border = bordersLayer.create(lin * spriteSize, col * spriteSize, theSprite).setOrigin(0, 0)
                        // resize sprite
                        border.displayWidth = spriteSize
                        border.scaleY = 1.25
                        border.refreshBody()
                    } else {
                        // pbLayer
                        //2,3,4,5
                        var pb = pbLayer.create(lin * spriteSize, col * spriteSize, theSprite).setOrigin(0, 0)
                        // resize sprite
                        pb.displayWidth = spriteSize
                        pb.scaleY = 1.25
                        pb.refreshBody()
                        // save the crates
                        if (value === 2) {
                            gameState.redCrate = pb
                        } else if (value === 3) {
                            gameState.woodCrate = pb
                        }
                        else if (value === 4) {
                            gameState.blueCrate = pb
                        }
                        else if (value === 5) {
                            gameState.greenCrate = pb
                        }

                    }
                }

            }

        }
    }

    // player
    player = this.physics.add.sprite(100, 450, 'player');

    player.setBounce(0.2)
    player.setCollideWorldBounds(true)

    // direction of Player (left, rigth, up, down)
    gameState.playerDirection = 'down'

    this.anims.create({
        key: 'idleDown',
        frames: this.anims.generateFrameNumbers('player', { start: 11, end: 11 }),
        frameRate: 1,
        repeat: -1
    });
    this.anims.create({
        key: 'idleUp',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
        frameRate: 1,
        repeat: -1
    });
    this.anims.create({
        key: 'idleLeft',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 6 }),
        frameRate: 1,
        repeat: -1
    });
    this.anims.create({
        key: 'idleRigth',
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 3 }),
        frameRate: 1,
        repeat: -1
    });
    this.anims.create({
        key: 'runDown',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'runUp',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'runRigth',
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'runLeft',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
    });


    // dfine collision between player and crates
    this.physics.add.collider(player, pbLayer, moveCrate);
    // dfine collision between player and borders
    this.physics.add.collider(player, bordersLayer);



}

// move crate when player collides with him
function moveCrate(player, crate) {
    var crateSpeed = 100
    /*
    switch (gameState.playerDirection) {
        case 'down':
            crate.setVelocityY(crateSpeed)
        case 'up':
            crate.setVelocityY(-crateSpeed)
        case 'rigth':
            crate.setVelocityX(crateSpeed)
        case 'left':
            crate.setVelocityX(-crateSpeed)
    }*/
}


function update() {

    // player move
    var vel = 150;

    if (gameState.cursors.down.isDown) {
        player.setVelocityX(0);
        player.setVelocityY(vel);
        gameState.playerDirection = 'down'
        player.anims.play('runDown', true);
    } else if (gameState.cursors.up.isDown) {
        player.setVelocityX(0);
        player.setVelocityY(-vel);
        gameState.playerDirection = 'up'
        player.anims.play('runUp', true);
    } else if (gameState.cursors.right.isDown) {
        player.setVelocityY(0);
        player.setVelocityX(vel);
        gameState.playerDirection = 'rigth'
        player.anims.play('runRigth', true);
    } else if (gameState.cursors.left.isDown) {
        player.setVelocityY(0);
        player.setVelocityX(-vel);
        gameState.playerDirection = 'left'
        player.anims.play('runLeft', true);
    } else {
        player.setVelocityX(0);
        player.setVelocityY(0);

        switch (gameState.playerDirection) {
            case 'up':
                player.anims.play('idleUp', true);
                break
            case 'down':
                player.anims.play('idleDown', true);
                break
            case 'rigth':
                player.anims.play('idleRigth', true);
                break
            case 'left':
                player.anims.play('idleLeft', true);
                break
        }
    }

}

const config = {
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    backgroundColor: "0xdda0dd",
    scene: {
        preload,
        create,
        update
    }
}

const game = new Phaser.Game(config)