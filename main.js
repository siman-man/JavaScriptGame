// When browser read, this function called.
onload = function(){
	main();
}

// This function game main.
function main(){
    // SceneGraphRoot object create.
    var sgroot = new SceneGraphRoot();
	start(sgroot);
}

// This function game start.
function start(sgroot){
    // get canvas object
	var canvas = $('#canvas').get(0);
	if(!canvas || !canvas.getContext){
		return false;
	}

	sgroot.w = canvas.width * 0.9;      // set screen size x.
	sgroot.h = canvas.height * 0.9;     // set screen size y.

	var ctx = canvas.getContext('2d');  // get context.

    sgroot.ctx = ctx;                   // set context object.
    sgroot.canvas = canvas;             // set canvas object.


    // game staring.
	startGame(sgroot);
}

