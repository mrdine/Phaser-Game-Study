const gameState = {}

function preload() {
    this.load.image('bg', './assets/world/bg1.png')
    this.load.image('gleft', './assets/world/gleft.png')
    this.load.image('gmid', './assets/world/gmid.png')
    this.load.image('grigth', './assets/world/grigth.png')
    this.load.spritesheet('player', './assets/player/player.png', { frameWidth: 80, frameHeight: 110 })
}

function create() {

    //entrada do teclado
    gameState.cursors = this.input.keyboard.createCursorKeys()

    //camada background
    var bgLayer = this.add.group()
    //camada mundo fisico
    plataforms = this.physics.add.staticGroup()

    var bg = bgLayer.create(400, 300, 'bg')

    // matrix 10x10 para definir plataformas

    var matrizMundo = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 2, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 2, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 3]
    ]
    /*
        legenda:
          
          grigth = 3
          gmid = 2
          gleft = 1
          irrelevante = 0
      */

    // variavel auxiliar para definir tamanho das sprites
    var tamanho = game.config.width * .1

    for (lin = 0; lin < 10; lin++) {
        for (col = 0; col < 10; col++) {

            var value = matrizMundo[col][lin]
            var tipo = ''

            if (value === 1) {
                tipo = 'gleft'
            } else if (value === 2) {
                tipo = 'gmid'
            } else if (value === 3) {
                tipo = 'grigth'
            }

            if (value > 0) {
                // colocar sprites da plataforma de modo fiel a matriz
                // o setOrigin define o pivo para (0,0)px da imagem, evita o uso de variavel auxiliar
                chao = plataforms.create(lin * tamanho, col * tamanho, tipo).setOrigin(0, 0)

                // escalacionar imagem
                chao.displayWidth = tamanho
                chao.scaleY = 1.25
                chao.refreshBody()
            }

        }
    }

    player = this.physics.add.sprite(100, 450, 'player');

    player.setBounce(0.2)
    player.setCollideWorldBounds(true)

    this.anims.create({
        key: 'andar',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 10 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player', {start: 0, end: 0}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'pular',
        frames: this.anims.generateFrameNumbers('player', {start: 1, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    // definir colisao entre player e plataforma
    this.physics.add.collider(player, plataforms);
}

function update() {

        

        var vel = 160
        
        if (gameState.cursors.right.isDown) {
            player.setVelocityX(vel);
            player.anims.play('andar', true);

            // se o player não estiver tocando no chao
            if(!player.body.touching.down)
            {
                player.anims.play('pular', true);
            }
        }
        else if (gameState.cursors.left.isDown) {
            player.setVelocityX(-vel);
            player.anims.play('andar', true);
            
            // se o player não estiver tocando no chao
            if(!player.body.touching.down)
            {
                player.anims.play('pular', true);
            }
        } else {
            player.setVelocityX(0);
            player.anims.play('idle', true);
            // se o player não estiver tocando no chao
            if(!player.body.touching.down)
            {
                player.anims.play('pular', true);
            }
        }
        if(gameState.cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
            player.anims.play('pular', true);
        }
        
        

}

const config = {
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
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