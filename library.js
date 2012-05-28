// SceneGraphRoot is top Scene.

SceneGraphRoot = function(){
    this.child = null; 	 	    // root has only one child.
    this.w = 0;					// width of game screen
    this.h = 0;					// height of game screen
    this.ctx = null;            // into context
    this.canvas = null;         // into canvas object
}


// game scene
SceneGraph = function(){
    this.parents = null;
    this.child = new Array();
    this.frame = 0;
}


SceneGraph.prototype.mainLoop = function(sgroot, sg){
}
