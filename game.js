/*
 * This function is game start scene.
 * @sgroot: SceneGraphRoot object.
 */

function startGame(sgroot){
    var width = sgroot.w;       // set screen size.
    var height = sgroot.h;      // set screen size.

    var sg = new SceneGraph();      // create scene graph object.

    // create player object.
    var player = new Object();

    // Get my character image.
    player.img = sg.readImage(sgroot.ctx, "../../gacha/gacha/img/siman.jpg");
    player.x = width * 0.2;         // set player position x.
    player.y = height * 0.8;        // set player position y.
    player.size = 90;               // set player image size.
    player.turn = null;             
    player.hp = 50;                 // set player hit point value.
    player.at = 5;                  // set player attack value.
    player.df = 5;                  // set player defense value.
    player.sp = 5;                  // set player speed value.

    // create enemy object
    var enemy = new Object();

    // get enemy character image.
    enemy.img = sg.readImage(sgroot.ctx, "../../gacha/gacha/img/machida.jpg");
    enemy.x = width * 0.8;          // set enemy position x
    enemy.y = height * 0.2;         // set enemy position y
    enemy.size = 90;                // set enemy size
    enemy.turn = null;              // turn flag
    enemy.hp = 40;                  // set enemy hit point value
    enemy.at = 4;                   // set enemy attack value
    enemy.df = 4;                   // set enemy defense value
    enemy.sp = 4;                   // set enemy speed value

    sg.player = player;
    sg.enemy = enemy;

    sgroot.sg = sg;

    // Initial battle scene 
    sgroot.child = new startBattleInit(sgroot);

    // Battle Scene loop
    var f = function() { loop(sgroot); }
    setInterval(f, 60);
}


/* 
 * This function is reading image from url.
 * @ctx: context object.
 * @url: locate image url.
 */
SceneGraph.prototype.readImage = function(ctx, url){
    // create Image object.
    var img = new Image();

    // set rul img.src.
    img.src = url;

    // return Image object.
    return img;
}


/*
 * This function is output image from obj.
 * @ctx: context object.
 * @obj: Image Object.
 */

SceneGraph.prototype.outImage = function(ctx, obj){
    ctx.drawImage(obj.img, obj.x, obj.y, obj.size, obj.size);	
}



/* 
 * This function is battle scene.
 * @sgroot: SceneGraphRoot object.
 * @player: player object.
 * @enemy: enemy object.
 */

function startBattle(sgroot, player, enemy){
    ctx.clearRect( 10, 10, sgroot.w, sgroot.h); // clean game screen
    ctx.strokeRect(10, 10, sgroot.w, sgroot.h); // wirting screen frame 

    outImage(ctx, player);	
    outImage(ctx, enemy);	
}


/*
 * This function is initialize battle scene
 * @sgroot: SceneGraphRoot object.
 * @player: player object.
 * @enemy: enemy object.
 */

function startBattleInit(sgroot, player, enemy){
    
}


function loop(sgroot){
    sgroot.sg;
}
