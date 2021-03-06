var drawing = [];
var currentPath = [];
var isDrawing = false; 

function setup() {
  canvas = createCanvas(1000, 400);
  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);
  canvas.parent('canvascontainer');

  var drawing = [];

  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

  

  var ref = database.ref("drawings");
  ref.on("value", gotData,errData);
}

function draw() {
  background(255); 

  if (isDrawing) {
    var point = {
      x: mouseX,
      y: mouseY,
    }
    currentPath.push(point);
  }  
  stroke("yellow");
  strokeWeight(7);
  noFill();

  for(var i = 0; i < drawing.length; i++){
    var path = drawing[i];
    beginShape();
    for(var j = 0; j < path.length; j++){
      vertex(path[j].x, path[j].y);
    }
    endShape();
  }
}

function startPath(){
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath(){
  isDrawing = false;
}

function saveDrawing(){
  var refer = database.ref('drawings');
  var data = {
    name: "Saanhvi",
    drawing: drawing
  }
  var result = refer.push(data, dataSent);
  console.log(result.key);

  function dataSent(status){
    console.log(status);
  }
}

function gotData(data){
  var elts=selectAll(".listing");
  for(var i=0;i<elts.length;i++){
    elts[i].remove;
  }
}

var drawings=data.val();
var keys=Object.keys(drawings);
for(var i=0;i<keys.length;i++){
  var key=keys[i];
  var li=createElement("li","");
  li.class("listing");

  var ahref=createA("#",key);
  ahref.mousePressed(showDrawing);
  ahref.parent(li);
  li.parent("drawing list");

}





function errData(err){
  console.log(err);
}

function showDrawing(){
  var key = this.html();

  var ref = database.ref("drawings/" + key);
  ref.on("value", oneDrawing, errData);
}

function oneDrawing(data){
  var dbdrawing = data.val();
  drawing = dbdrawing.drawing;
  console.log(drawing);
}


