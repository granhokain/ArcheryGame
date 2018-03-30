/*global Phaser*/
var game = new Phaser.Game(900, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update});

var background;
var alvo;
var vida;
var sprite;
var background;
var music;
var mira;
var meio;
var borda1;
var borda2;
var borda3;
var borda4;
var leftBlock;
var rightBlock;
var cursors;
var atirar;
var bala;
var podeTocar;
var gravit_y_mira = 15;
var block;
var bipe;
var som2;
var som5;
var som10;

var marca;


function preload() {
    
    game.load.baseURL = 'assets/';
    game.load.image('background', 'background/background.png');
    game.load.image('borda1', 'sprites/meio.png');
    game.load.image('borda2', 'sprites/meio.png');
    game.load.image('borda3', 'sprites/meio.png');
    game.load.image('borda4', 'sprites/meio.png');
    game.load.image('alvo', 'sprites/alvo.png');
    game.load.image('mira', 'sprites/Mira1.png');
    game.load.image('meio', 'sprites/meio.png');
    game.load.image('block', 'sprites/bloqueio.png');
    game.load.audio('bipe', ['audio/bipe.ogg']);
    game.load.audio('som2', ['audio/2pts.ogg']);
    game.load.audio('som5', ['audio/5pts.ogg']);
    game.load.audio('som10', ['audio/10pts.ogg']);
    game.load.image('marca', 'sprites/marca.png');
   
    
    //game.load.image('background', 'background/background3.jpg'); // plano de fundo
  //  game.load.image('bullet', 'sprites/bullet.png');
   // game.load.audio('music', ['audio/music.ogg']); // audio
    
}
var flechas = 3;
var level = 1;
var score = 0;
var scoreText;
var flechasText;
var levelText;
var scoreString = '';
var introText;


function create() {
    
    background = game.add.sprite(0, 0, 'background');
    alvo = game.add.sprite(game.world.centerX, game.world.centerY, 'alvo');
    mira = game.add.sprite(game.world.centerX, game.world.centerY, 'mira');
    meio = game.add.sprite(game.world.centerX, game.world.centerY, 'meio');
    borda1 = game.add.sprite(250, game.world.centerY, 'borda1');
    borda2 = game.add.sprite(650, game.world.centerY, 'borda2');
    borda3 = game.add.sprite(130, game.world.centerY, 'borda3');
    borda4 = game.add.sprite(780, game.world.centerY, 'borda4');
    leftBlock = game.add.sprite(-20, game.world.centerY, 'block');
    rightBlock = game.add.sprite(920, game.world.centerY, 'block');
    
    
 scoreText = game.add.text(32, 550, 'Score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
 flechasText = game.add.text(800, 550, 'Flechas: 3 ', { font: "20px Arial", fill: "#ffffff", align: "left" });
 levelText = game.add.text(800, 32, 'Level: 1', { font: "20px Arial", fill: "#ffffff", align: "left" });
 


 mira.anchor.setTo(0.5, 0.5);
 alvo.anchor.setTo(0.5, 0.5);
 meio.anchor.setTo(0.5,0.5);
 borda1.anchor.setTo(0.5,0.5);
 borda2.anchor.setTo(0.5,0.5);
 borda3.anchor.setTo(0.5,0.5);
 borda4.anchor.setTo(0.5,0.5);
 leftBlock.anchor.setTo(0.5, 0.5);
 rightBlock.anchor.setTo(0.5,0.5);
 
 
 game.physics.arcade.enable(mira);
 game.physics.arcade.enable(meio);
 game.physics.arcade.enable(leftBlock);
 game.physics.arcade.enable(rightBlock);
  
 
 mira.body.velocity.x = -250;
 
 leftBlock.body.immovable = true;
 rightBlock.body.immovable = true;
 
 /* mira.body.bounce.set(0.8);
 mira.body.gravity.set(15, 1);
  mira.body.collideWorldBounds= true;*/
  
 leftBlock.body.immovable = true;
   rightBlock.body.immovable = true;
    mira.body.bounce.setTo(1,1);
    
 
 cursors = game.input.keyboard.createCursorKeys();
    
    atirar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    bala = 1;
    
    podeTocar = true;
    
    bipe = game.add.audio('bipe');
    som2 = game.add.audio('som2');
    som5 = game.add.audio('som5');
    som10 = game.add.audio('som10');
    
   bipe.volume = 0.4;
   som2.volume = 0.4;
   som5.volume = 0.4;
   som10.volume = 0.4;
  
 
}    
  
    
function tocar(){
    if(podeTocar == true){
       bipe.play();
    }
    podeTocar = false;
}
function somPonto(som){
    som.play();
}

function canPlay(){
    podeTocar = true;
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function textUpdateScore(texto, ponto){
    texto.setText('Score: '+ ponto);
}

function textUpdateFlechas(texto, flechas){
    texto.setText('Flechas: ' + flechas);
}

function textUpdateLevel(texto, level){
    texto.setText('Level: ' + level);
}

function update() {
    game.physics.arcade.collide(leftBlock, mira, canPlay);
    game.physics.arcade.collide(rightBlock, mira, canPlay);
    
    /*mira.body.gravity.set(gravit_y_mira,0);
     
     //if (mira.body.onWall()){
         gravit_y_mira = -gravit_y_mira;
     }*/
    
    if (score == 15){
        level = level + 1;
        textUpdateLevel(levelText,level);
        alvo.scale.setTo(300,300);
    }
    
    if(checkOverlap(mira, meio)){
        tocar();
    }
    
    if(atirar.isUp) {
        if(bala < 1){
            bala = 1;
        }
    }
    if(atirar.isDown){
        if(flechas > 0){
        if(bala > 0){
            flechas--;
            textUpdateFlechas(flechasText, flechas);
            if(checkOverlap(mira, meio)){
                score = score + 10;
                textUpdateScore(scoreText, score);
                somPonto(som10);
            }else if(checkOverlap(mira, borda1)){
                score = score + 5;
                textUpdateScore(scoreText, score);
                somPonto(som5);
            }else if(checkOverlap(mira, borda2)){
                score = score + 5;
                textUpdateScore(scoreText, score);
                somPonto(som5);
            }else if(checkOverlap(mira, borda3)){
                score = score + 2;
                textUpdateScore(scoreText, score);
                somPonto(som2);
            }else if(checkOverlap(mira, borda4)){
                score = score + 2;
                textUpdateScore(scoreText, score);
                somPonto(som2);
            }
            marca = game.add.sprite(mira.x, mira.y, 'marca');
        }
        bala = 0;
    }
    }
}
