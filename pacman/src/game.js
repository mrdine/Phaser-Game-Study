// funções dos comportamentos
var andar = function (player) {

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
        // não tem animação idle
        /*
        switch (gameState.playerDirection) {
            case 'up':
                player.anims.play(player.idleUp, true);
                break
            case 'down':
                player.anims.play(player.idleDown, true);
                break
            case 'rigth':
                player.anims.play(player.idleRigth, true);
                break
            case 'left':
                player.anims.play(player.idleLeft, true);
                break
        }
        */
    }
}
// coletar bolinha
function coletaBol (player, bolinha)
{
    bolinha.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}


const gameState = {}
const players = {}
var score = 0;
var scoreText;

// carregar sprites
function preload() {


    this.load.image('chao', './assets/background.png')
    this.load.image('bolGrande', './assets/bolinhaGrande.png')
    this.load.image('bolPequena', './assets/bolinhaPeq.png')
    this.load.image('parede', './assets/parede.png')
    this.load.spritesheet('player', './assets/playersh.png', { frameWidth: 65, frameHeight: 65 })



}

function create() {

    //keyboard input
    gameState.cursors = this.input.keyboard.createCursorKeys()


    //10 x 10 world matrix
    var matrizMundo = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 2, 0],
        [0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 3, 1, 2, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
        [0, 2, 1, 1, 1, 1, 1, 1, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    /**
     * subtitles:
     *  1 = chao por baixo, bolinha pequena
     *  2 = chao por baixo, bolinha grande
     *  3 = player
     *  0 = parede
     *  
     *  
     */

    // chao layer
    var chaoLayer = this.add.group()
    // bolinhas layer
    var bolaLayer = this.physics.add.staticGroup()
    // parede layer
    var paredeLayer = this.physics.add.staticGroup()

    // para transformar o tamanho das sprites em 10% da tela do jogo
    var spriteSize = game.config.width * .1

    // preencher mundo
    for (var lin = 0; lin < 10; lin++) {
        for (var col = 0; col < 10; col++) {
            // chao
            var chao = chaoLayer.create(lin * spriteSize, col * spriteSize, 'chao').setOrigin(0, 0)
            // resize sprite
            chao.displayWidth = spriteSize
            chao.scaleY = 1.25

            //blocks and bottons
            var value = matrizMundo[col][lin]
            var theSprite = ''
            switch (value) {
                case 0:
                    var parede = paredeLayer.create(lin * spriteSize, col * spriteSize, 'parede').setOrigin(0, 0)
                    parede.displayWidth = spriteSize
                    parede.scaleY = 1.25
                    parede.refreshBody()
                    break
                case 1:
                    var bol = bolaLayer.create(lin * spriteSize + (spriteSize / 2), col * spriteSize + (spriteSize / 2.5), 'bolPequena').setOrigin(0, 0)
                    bol.displayWidth = spriteSize * .2
                    bol.scaleY = 2
                    bol.refreshBody()
                    break
                case 2:
                    // vola grande
                    // será descartado possivelmente
                    break
                case 3:

            }
        }
    }

    gameState.player = this.physics.add.sprite(1 * spriteSize + 10, 4 * spriteSize, 'player').setOrigin(0, 0);
    gameState.player.setBounce(0.2)
    gameState.player.setCollideWorldBounds(true)

    // colisão entre player e paredes
    this.physics.add.collider(gameState.player, paredeLayer);
    // colisão entre player e bolinhas
    this.physics.add.overlap(gameState.player, bolaLayer, coletaBol, null, this);

    // direction of Player (left, rigth, up, down)
    gameState.playerDirection = 'up'


    // animações do player
    this.anims.create({
        key: 'runRigth',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'runLeft',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'runDown',
        frames: this.anims.generateFrameNumbers('player', { start: 7, end: 10 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'runUp',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });




    // exibição dos pontos
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px'});
}


function update() {
    andar(gameState.player)
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