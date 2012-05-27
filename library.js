// シーングラフのroot今回はあまり実装しないかも

SceneGraphRoot = function(){
    this.children = null;	 	// rootはchildを1つしか持たない
    this.w = 0;					// ゲーム画面の横幅
    this.h = 0;					// ゲーム画面の縦幅
    this.ctx = null;            // コンテキストを入れる
    this.canvas = null;         // canvasオブジェクトをいれる
}


// それぞれのゲーム場面を格納する場所
SceneGraph = function(){
    this.parents = null;
    this.child = new Array();
}

