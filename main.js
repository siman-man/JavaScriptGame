onload = function(){
	main();
}

function main(){
    var sgroot = SceneGraphRoot();
	start(sgroot);
}

function start(sgroot){
	var canvas = $('#canvas').get(0);
	if(!canvas || !canvas.getContext){
		return false;
	}

	sgroot.w = canvas.width * 0.9;
	sgroot.y = canvas.height * 0.9;

	var ctx = canvas.getContext('2d');

    sgroot.ctx = ctx;
    sgroot.canvas = canvas;

	startGame(sgroot);
}

function drawStart(ctx, canvas, startFlag){
	canvas.onmouseout  = mouseOut;
	canvas.onmouseover = mouseOver;
	canvas.onmousemove = mouseMove;
	canvas.onmousedown = mouseDown;

	createMenu();

	function createBottun(startFlag){
		ctx.globalAlpha = 0.7;          // 透明度
		if(startFlag == false){
			ctx.arc(300, 300, 50, 0, Math.PI * 2, false);
			ctx.fill();
		}else{
			ctx.fillStyle = 'rgb(100, 90, 248)';
			ctx.arc(300, 300, 50, 0, Math.PI * 2, false);
			ctx.fill();
		}
	}

	function mouseOver(e){
	}

	function mouseOut(e){
	}

	function mouseDown(e){
		var rect = e.target.getBoundingClientRect();
		var mouseX = e.clientX - Math.floor(rect.left);
		var mouseY = e.clientY - Math.floor(rect.top);
		if(mouseX >= 250 && mouseX <= 350 &&
				mouseY >= 250 && mouseY <= 350){
			canvas.onmouseout  = null;
			canvas.onmouseover = null;
			canvas.onmousemove = null;
			canvas.onmousedown = null;
			startGame(ctx, canvas);
		}
	}

	function mouseMove(e){
		var rect = e.target.getBoundingClientRect();
		var mouseX = e.clientX - Math.floor(rect.left);
		var mouseY = e.clientY - Math.floor(rect.top);
		if(mouseX >= 250 && mouseX <= 350 &&
				mouseY >= 250 && mouseY <= 350){
			startFlag = true;
		}else{
			startFlag = false;
		}
		createMenu();
	}

	function createMenu(){
		ctx.clearRect( 0, 0, canvas.xsize, canvas.ysize); // canvasを一度クリア
		ctx.strokeRect(0, 0, canvas.xsize, canvas.ysize); // 外枠を描画 
		ctx.font = "24pt 'Arial'";
		ctx.fillStyle = 'rgb(200, 0, 0)'; // 色を設定
		ctx.fillText('ゲーム開始', 200, 200);
		createBottun(startFlag);
	}
}



