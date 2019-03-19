var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');

//use code generation for this method tocreate every if statment
function createObject(object)
{
    var catAndName = object.Category + object.ComponentName;
    console.log(catAndName);
    if (catAndName == "abstractcollisionShape.js") {
        object = new abstractcollisionShape(123, [{ "x": 100, "y": 100 }, { "x": 100, "y": 150 }, { "x": 150, "y": 200 }], true, true, true);
        object.draw(context);
    }
    return object;
}


