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

