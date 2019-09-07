const gameState = {}

// carregar assets
function preload(){
  this.load.image('curva_direita_inferior', './assets/world/pista/curva_direita_inferior.png')
  this.load.image('curva_esquerda_inferior', './assets/world/pista/curva_esquerda_inferior.png')
  this.load.image('curva_direita_superior', './assets/world/pista/curva_direita_superior.png')
  this.load.image('curva_esquerda_superior', './assets/world/pista/curva_esquerda_superior.png')
  this.load.image('reta_horizontal', './assets/world/pista/reta_horizontal.png')
  this.load.image('reta_vertical', './assets/world/pista/reta_vertical.png')
  this.load.image('gramado', './assets/world/terreno/gramado.png')

  this.load.image('carro', './assets/player/carro.png')
}

function create(){
  // entrada do teclado
  gameState.cursors = this.input.keyboard.createCursorKeys()
  
    //Matriz da pista
    
    var matrizMundo = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,5,5,5,5,5,5,3,0],
    [0,6,0,0,0,0,0,0,6,0],
    [0,6,0,0,0,0,0,0,6,0],
    [0,6,0,0,0,0,0,0,6,0],
    [0,6,0,0,0,0,0,0,6,0],
    [0,6,0,0,0,0,0,0,6,0],
    [0,6,0,0,0,0,0,0,6,0],
    [0,2,5,5,5,5,5,5,4,0],
    [0,0,0,0,0,0,0,0,0,0]
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

  // a tela do jogo é 800X800 px, cada imagem do mundo corresponde a 80x80 px, logo o mapa é uma matriz 10x10
  // Preencher mundo do jogo
  for(var lin = 0; lin < 10; lin++ )
  {
    for(var col = 0; col < 10; col++ )
    {
      if( matrizMundo[col] [lin] === 0)
      {
        tipo = 'gramado'
      } else if(  matrizMundo[col] [lin] === 1 )
      {
        tipo = 'curva_esquerda_superior'
      } else if(  matrizMundo[col] [lin] === 2 )
      {
        tipo = 'curva_esquerda_inferior'
      } else if(  matrizMundo[col] [lin] === 3 )
      {
        tipo = 'curva_direita_superior'
      } else if(  matrizMundo[col] [lin] === 4 )
      {
        tipo = 'curva_direita_inferior'
      } else if(  matrizMundo[col] [lin] === 5 )
      {
        tipo = 'reta_horizontal'
      } else if(  matrizMundo[col] [lin] === 6 )
      {
        tipo = 'reta_vertical'
      }
      

      // adicionar sprite( 40 pq o pivô é centro da imagem )
      var chao = this.add.sprite(40 + lin * 80, 40 + col * 80, tipo)
      
      //Escalacionar a sprite para 80x80 px
      //set the width of the sprite
      chao.displayWidth = 80;
      //scale evenly
      chao.scaleY = chao.scaleX;
    }
  }
  // adicoinar carro
  gameState.carro = this.add.sprite(40, 40, 'carro')
  gameState.carro.displayWidth = 80;
  gameState.carro.scaleY = carro.scaleX;
}

function update(){
  // velocidade do player
  var vel = 3

  if(gameState.cursors.down.isDown){
    gameState.carro.y += vel
  }
  if(gameState.cursors.rigth.isDown){
    gameState.carro.x += vel
  }
  if(gameState.cursors.up.isDown){
    gameState.carro.y -= vel
  }
  if(gameState.cursors.left.isDown){
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