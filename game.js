/*
 * This function is game start scene.
 * @sgroot: SceneGraphRoot object.
 */

function startGame(sgroot){
    sgroot.child = new BattleScene(sgroot);
    sgroot.child.sg = sgroot.child.initBattleScene(sgroot);

    // Battle Scene loop
    var f = function() { loop(sgroot, sgroot.child.sg); }
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
    $("canvas").drawImage({
source: obj.img,
x: obj.x, y: obj.y,
width: obj.size,
height: obj.size,
fromCenter: true
});
//ctx.drawImage(obj.img, obj.x, obj.y, obj.size, obj.size);	
}


/*
 * This function is Battle main scene.
 * @sgroot: SceneGraphRoot object.
 */

function BattleScene(sgroot){
}


/*
 * This function is initialize battle scene
 * @sgroot: SceneGraphRoot object.
 * @player: player object.
 * @enemy: enemy object.
 *
 * return value: SceneGraph object.
 */

BattleScene.prototype.initBattleScene = function(sgroot){
    var sg = new SceneGraph();      // create scene graph object.
    sg.width = sgroot.w;
    sg.height = sgroot.h;

    sg.PLAYER_ATTACK = 0x01;
    sg.PLAYER_RETURN = 0x02;
    sg.ENEMY_ATTACK = 0x03;
    sg.ENEMY_RETURN = 0x04;
    sg.STOP = 0x05;
    sg.PLAYER_WIN = 0x06;
    sg.PLAYER_LOSE = 0x07;

    // create player object.
    var player = new Object();

    // Get my character image.
    player.img = sg.readImage(sgroot.ctx, "../../gacha/gacha/img/siman.jpg");
    player.name = 'siman';
    player.x = sg.width* 0.5;         // set player position x.
    player.y = sg.height * 0.8;        // set player position y.
    player.dfx = player.x;
    player.dfy = player.y;
    player.size = 90;               // set player image size.
    player.turn = true;             
    player.back = false;
    player.hpmax = 50;
    player.hp = 50;                 // set player hit point value.
    player.at = 20;                  // set player attack value.
    player.df = 5;                  // set player defense value.
    player.sp = 5;                  // set player speed value.

    // create enemy object
    var enemy = new Object();

    // get enemy character image.
    enemy.img = sg.readImage(sgroot.ctx, "../../gacha/gacha/img/machida.jpg");
    enemy.name = 'machida';
    enemy.x = sg.width * 0.5;          // set enemy position x
    enemy.y = sg.height * 0.2;         // set enemy position y
    enemy.dfx = enemy.x;
    enemy.dfy = enemy.y;
    enemy.size = 90;                // set enemy size
    enemy.turn = false;              // turn flag
    enemy.back = false;
    enemy.hpmax = 40;
    enemy.hp = 40;                  // set enemy hit point value
    enemy.at = 4;                   // set enemy attack value
    enemy.df = 4;                   // set enemy defense value
    enemy.sp = 4;                   // set enemy speed value

    var frame = 10;

    var dist_x = enemy.x - player.x;
    var dist_y = enemy.y - player.y;
    player.mvx = dist_x / frame;
    player.mvy = dist_y / frame;

    var dist_x = player.x - enemy.x;
    var dist_y = player.y - enemy.y;
    enemy.mvx = dist_x / frame;
    enemy.mvy = dist_y / frame;

    sg.player = player;
    sg.enemy = enemy;
 
    sg.scene = sg.PLAYER_ATTACK;

    sg.mainLoop = function(sgroot, sg){

        $('canvas').clearCanvas();
        sgroot.child.selectScene(sgroot, sg);
        sgroot.child.collisionCharacter(sgroot, sg);
        sgroot.child.drawStatus(sgroot, sg);

        sg.outImage(sgroot.ctx, sg.player);	
        sg.outImage(sgroot.ctx, sg.enemy);	
    }

    return sg;
}

BattleScene.prototype.attackMove = function(sg, my, x, y){
    var speed = 20;
    var dist_x = x - my.x;
    var dist_y = y - my.y;
    var dist = Math.sqrt(dist_x * dist_x + dist_y * dist_y);

    if(my.x < x){
        my.x += speed;
    }
    else if(my.x > x){
        my.x -= speed;
    }

    if(my.y < y){
        my.y += speed;
    }
    else if(my.y > y){
        my.y -= speed;
    }

    if(dist < 100){
        switch(sg.scene){
            case sg.PLAYER_ATTACK:
                sg.enemy.hp -= sg.player.at;
                sg.scene = sg.PLAYER_RETURN;
                break;
            case sg.ENEMY_ATTACK:
                sg.player.hp -= sg.enemy.at;
                sg.scene = sg.ENEMY_RETURN;
                break;
            default:
                break;
        }
    }
}

BattleScene.prototype.returnMove = function(sg, my, x, y){
    var speed = 20;
    if(my.x < my.dfx){
        my.x += speed;
    }
    else if(my.x > my.dfx){
        my.x -= speed;
    }

    if(my.y < my.dfy){
        my.y += speed;
    }
    else if(my.y > my.dfy){
        my.y -= speed;
    }

    if(my.x == my.dfx && my.y == my.dfy){
        switch(sg.scene){
            case sg.PLAYER_RETURN:
                if(sg.enemy.hp <= 0){
                    sg.scene = sg.PLAYER_WIN;
                }else{
                    sg.scene = sg.ENEMY_ATTACK;
                }
                break;
            case sg.ENEMY_RETURN:
                if(sg.player.hp <= 0){
                    sg.scene = sg.PLAYER_LOSE;
                }else{
                    sg.scene = sg.STOP;
                }
                break;
            default:
                break;
        }
    }
}

BattleScene.prototype.littleWait = function(sg){
    if((sg.frame % 30) == 0){
        sg.scene = sg.PLAYER_ATTACK;
    }
}

BattleScene.prototype.resultWin = function(sgroot, sg){
$('canvas').drawText({
fillStyle: "#f00",
strokeStyle: "#000", 
strokeWidth: "1",
x: sgroot.w/2, y: sgroot.h/2,
font: "20pt Arial",
fromCenter: true,
text: sg.player.name + ' WIN'
});
}

BattleScene.prototype.resultLose = function(sgroot, sg){
$('canvas').drawText({
fillStyle: "#00f",
strokeStyle: "#000", 
strokeWidth: "1",
x: sgroot.w /2, y: sgroot.h /2,
font: "20pt Arial",
fromCenter: true,
text: sg.player.name + ' LOSE'
});
}

BattleScene.prototype.selectScene = function(sgroot, sg){
    switch(sg.scene){
        case sg.PLAYER_ATTACK:
            sgroot.child.attackMove(sg, sg.player, sg.enemy.x, sg.enemy.y); 
            break;
        case sg.PLAYER_RETURN:
            sgroot.child.returnMove(sg, sg.player, sg.player.dfx, sg.player.dfy);
            break;
        case sg.ENEMY_ATTACK:
            sgroot.child.attackMove(sg, sg.enemy, sg.player.x, sg.player.y);
            break;
        case sg.ENEMY_RETURN:
            sgroot.child.returnMove(sg, sg.enemy, sg.enemy.dfx, sg.enemy.dfy);
            break;
        case sg.STOP:
            sgroot.child.littleWait(sg);
            break;
        case sg.PLAYER_WIN:
            sgroot.child.resultWin(sgroot, sg);
            break;
        case sg.PLAYER_LOSE:
            sgroot.child.resultLose(sgroot, sg);
            break;
        default:
            break;
    }
}

BattleScene.prototype.collisionCharacter = function(sgroot, sg){
    /*
       var dist_x = my.x - x;
       var dist_y = my.y - y;
       var frame = 10;
       var dist = Math.sqrt(dist_x * dist_x + dist_y * dist_y);
     */
}

BattleScene.prototype.drawStatus = function(sgroot, sg){
    var p_s = sg.player.hp / sg.player.hpmax;
    var e_s = sg.enemy.hp / sg.enemy.hpmax;


    $("canvas").drawRect({
strokeStyle: "#000",
x: 10, y: 10,
width: sgroot.w,
height: sgroot.h,
fromCenter: false
});

$('canvas').drawText({
fillStyle: "#000",
strokeStyle: "#000", 
strokeWidth: "1",
x: sg.player.x, y: sg.player.y + 60,
font: "13pt Arial",
fromCenter: true,
text: 'HP : ' + sg.player.hp
});

$('canvas').drawText({
fillStyle: "#000",
strokeStyle: "#000", 
strokeWidth: "1",
x: sg.player.x, y: sg.player.y - 60,
font: "13pt Arial",
fromCenter: true,
text: sg.player.name
});


$('canvas').drawRect({
fillStyle: "#7CFC00",
x: sg.player.x - (100 - (100 * p_s)) * 0.5, y: sg.player.y + 80,
width: 100 * p_s, height: 10,
fromCenter: true
});


$('canvas').drawRect({
strokeStyle: "#000",
strokeWidth: "3",
x: sg.player.x, y: sg.player.y + 80,
width: 100, height: 10,
fromCenter: true
});


$('canvas').drawText({
fillStyle: "#000",
strokeStyle: "#000", 
strokeWidth: "1",
x: sg.enemy.x, y: sg.enemy.y + 60,
font: "13pt Arial",
fromCenter: true,
text: 'HP : ' + sg.enemy.hp
});

$('canvas').drawText({
fillStyle: "#000",
strokeStyle: "#000", 
strokeWidth: "1",
x: sg.enemy.x, y: sg.enemy.y - 60,
font: "13pt Arial",
fromCenter: true,
text: sg.enemy.name
});

$('canvas').drawRect({
fillStyle: "#7CFC00",
x: sg.enemy.x - (100 - (100 * e_s)) * 0.5, y: sg.enemy.y + 80,
width: 100 * e_s, height: 10,
fromCenter: true
});

$('canvas').drawRect({
strokeStyle: "#000",
strokeWidth: "3",
x: sg.enemy.x, y: sg.enemy.y + 80,
width: 100, height: 10,
fromCenter: true
});
}


/*
 * This function is main loop.
 */
function loop(sgroot, sg){
    sg.mainLoop(sgroot, sg);
    sg.frame += 1;
}
