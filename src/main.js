const gameState = {}

function preload() {
    this.load.image('curva_direita_inferior', './assets/world/pista/curva_direita_inferior.png')
    this.load.image('curva_esquerda_inferior', './assets/world/pista/curva_esquerda_inferior.png')
    this.load.image('curva_direita_superior', './assets/world/pista/curva_direita_superior.png')
    this.load.image('curva_esquerda_superior', './assets/world/pista/curva_esquerda_superior.png')
    this.load.image('reta_horizontal', './assets/world/pista/reta_horizontal.png')
    this.load.image('reta_vertical', './assets/world/pista/reta_vertical.png')
    this.load.image('gramado', './assets/world/terreno/gramado.png')

    this.load.spritesheet('carro', './assets/player/carro.png', { frameWidth: 32, frameHeight: 48 })

    
}

function create() {

    //entrada do teclado
    gameState.cursors = this.input.keyboard.createCursorKeys()


    //Matriz da pista

    var matrizMundo = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 5, 5, 5, 5, 5, 5, 3, 0],
        [0, 6, 0, 0, 0, 0, 0, 0, 6, 0],
        [0, 6, 0, 0, 0, 0, 0, 0, 6, 0],
        [0, 6, 0, 0, 0, 0, 0, 0, 6, 0],
        [0, 6, 0, 0, 0, 0, 0, 0, 6, 0],
        [0, 6, 0, 0, 0, 0, 0, 0, 6, 0],
        [0, 6, 0, 0, 0, 0, 0, 0, 6, 0],
        [0, 2, 5, 5, 5, 5, 5, 5, 4, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    /*
        legenda:
          curva_direita_inferior = 4
          curva_direita_superior = 3
          curva_esquerda_inferior = 2
          curva_esquerda_superior = 1
          reta_horizontal = 5
          reta_vertical = 6
          gramado = 0
      */



    var tiposChao = ['curva_direita_inferior', 'curva_direita_superior', 'curva_esquerda_inferior', 'curva_esquerda_superior', 'reta_horizontal', 'reta_vertical'];
    var tipo = ''

    // camada do chao
    var chaoLayer = this.add.group()
    // camada da pista
    var pistaLayer = this.add.group()
    //camada de objetos dinamicos
    var dinamLayer = this.add.group()



    // Preencher mundo do jogo
    for (var lin = 0; lin < 10; lin++) {
        for (var col = 0; col < 10; col++) {
            // gramado
            var chao = chaoLayer.create(40 + lin * 80, 40 + col * 80, 'gramado')
        }
    }

    // preencher mundo colocando a pista
    for (var lin = 0; lin < 10; lin++) {
        for (var col = 0; col < 10; col++) {
            var value = matrizMundo[lin][col]
            if (value != 0) {
                if (matrizMundo[col][lin] === 1) {
                    tipo = 'curva_esquerda_superior'
                } else if (matrizMundo[col][lin] === 2) {
                    tipo = 'curva_esquerda_inferior'
                } else if (matrizMundo[col][lin] === 3) {
                    tipo = 'curva_direita_superior'
                } else if (matrizMundo[col][lin] === 4) {
                    tipo = 'curva_direita_inferior'
                } else if (matrizMundo[col][lin] === 5) {
                    tipo = 'reta_horizontal'
                } else if (matrizMundo[col][lin] === 6) {
                    tipo = 'reta_vertical'
                }
                // adicionar a pista com o tamanho de 10% do tamanho da tela do jogo
                var auxScale = game.config.width*.1
                var auxSpace = game.config.width*.1/2
                var pista = pistaLayer.create(auxSpace + lin * auxScale, auxSpace + col * auxScale, tipo)

                pista.displayWidth = game.config.width*.1; 
                pista.scaleY= pista.scaleX
            }
        }
    }

    // adicionar carro
    gameState.carro = dinamLayer.create(40,40, 'carro')

    // animaçao do carro

    this.anims.create({
        key: 'andar',
        frames: this.anims.generateFrameNumbers('carro', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

}

function update() {

    var vel = 3
    if (gameState.cursors.down.isDown) {
        gameState.carro.y += vel
    }
    if (gameState.cursors.up.isDown) {
        gameState.carro.y -= vel
    }
    if (gameState.cursors.right.isDown) {
        gameState.carro.x += vel
        gameState.carro.rotation = 90
    }
    if (gameState.cursors.left.isDown) {
        gameState.carro.x -= vel
    }
}

const config = {
    width: 800,
    height: 800,
    backgroundColor: "0xdda0dd",
    scene: {
        preload,
        create,
        update
    }
}

const game = new Phaser.Game(config)

