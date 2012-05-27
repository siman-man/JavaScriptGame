function startGame(sgroot){
        var width = sgroot.w;
        var height = sgroot.h;
		var size = 90;

		var player = new Object();

		// 自分のキャラの画像を取得する。
		player.img = readImage(ctx, "../../gacha/gacha/img/siman.jpg");
		player.x = width * 0.2;
		player.y = height * 0.8;
		player.size = size;
		player.turn = null;
		player.hp = 50;
		player.at = 5;
		player.df = 5;
		player.sp = 5;

		var enemy = new Object();

		// 敵のキャラの画像を取得する
		enemy.img = readImage(ctx, "../../gacha/gacha/img/machida.jpg");
		enemy.x = width * 0.8;
		enemy.y = height * 0.2;
		enemy.size = size;
		enemy.turn = null;
		enemy.hp = 40;
		enemy.at = 4;
		enemy.df = 4;
		enemy.sp = 4;


		startBattleInit(sgroot, player, enemy);
		var f = function() { startBattle(ctx, canvas, player, enemy); }
		setInterval(f, 60);
}


function readImage(ctx, url){
		var img = new Image();

		img.src = url;

		return img;
}

function outImage(ctx, obj){
		//obj.img.onload = function(){
		ctx.drawImage(obj.img, obj.x, obj.y, obj.size, obj.size);	
		//}
}

function startBattle(ctx, canvas, player, enemy){
		ctx.clearRect( 10, 10, canvas.xsize, canvas.ysize);
		ctx.strokeRect(10, 10, canvas.xsize, canvas.ysize); // 外枠を描画 
		outImage(ctx, player);	
		outImage(ctx, enemy);	
		console.log('test');
}

function textAnim(ctx, canvas, obj){
}

function fadeIn(ctx, canvas, text){
}
