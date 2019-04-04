var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
var canvasObjects = []
var lockedItem = null;
var itemIsLocked = false;
var idIndex = 0;
var objectVariableToAddTo = null;
var objectIdToAddTo = null;
var keysForObject = [];

canvas.onmousedown = function (e) {
    for (var i = 0; i < canvasObjects.length; i++) {
        if (!itemIsLocked && canvasObjects[i].getCollisionArea(e)) {
            itemIsLocked = true;
            lockedItem = canvasObjects[i];
        }
    }
}

canvas.onmousemove = function (e) {
    if (itemIsLocked && lockedItem != null) {
        if (lockedItem.moveAble) {
            lockedItem.move(canvas, e);
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < canvasObjects.length; i++) {
            canvasObjects[i].draw(context);
        }
    }
}

//Dynamically create options panel with the numberof options available to the specific component.
canvas.addEventListener('click', function (e) {
    for (var i = 0; i < canvasObjects.length; i++) {
        if (canvasObjects[i].getCollisionArea(e)) {
            //get and reset div
            var div = document.getElementById("buildmode-options-elements");
            div.innerHTML = "";
            objectIdToAddTo = Object.values(canvasObjects[i])[0];
            for (var j = 0; j < Object.keys(canvasObjects[i]).length; j++) {
                if (typeof Object.values(canvasObjects[i])[j] === 'object') {
                    if (Object.keys(canvasObjects[i])[j] != "privateVariables") {
                        objectVariableToAddTo = Object.keys(canvasObjects[i])[j];

                        div.innerHTML += "<p style=" + '"' + "text-align:center;" + '"' + "><strong><u>" + Object.keys(canvasObjects[i])[j] + "</u></strong></p>"
                        for (var k = 0; k < Object.values(canvasObjects[i])[j].length; k++) {
                            div.innerHTML += "<p style=" + '"' + "text-align:center;" + '"' + "id=" + '"' + "objectvalue" + k + '"' + "><p>"
                            for (var n = 0; n < Object.keys(Object.values(Object.values(canvasObjects[i])[j])[k]).length; n++) {
                                document.getElementById("objectvalue" + k).innerHTML +=
                                    Object.keys(Object.values(Object.values(canvasObjects[i])[j])[k])[n] + (k + 1) + ": " +
                                    Object.values(Object.values(Object.values(canvasObjects[i])[j])[k])[n] + "<br>";
                                if (k == Object.values(canvasObjects[i])[j].length - 1) {
                                    keysForObject[n] = Object.keys(Object.values(Object.values(canvasObjects[i])[j])[k])[n];
                                    div.innerHTML += "<div style=" + '"' + "text-align:center; margin-bottom:3px;" + '"' + "> "
                                        + " <form style=" + '"' + "display: inline-block;" + '"' + ">"
                                        + "<input id=" + '"' + Object.keys(Object.values(Object.values(canvasObjects[i])[j])[k])[n] +
                                        (Object.values(canvasObjects[i])[j].length + 1) + '"' +
                                        " style=" + '"' + "text-align:center;" + '"' + " type=" + '"' + "text" + '"' +
                                        " placeholder=" + '"' + Object.keys(Object.values(Object.values(canvasObjects[i])[j])[k])[n] +
                                        (Object.values(canvasObjects[i])[j].length + 1) + " of type: "
                                        + typeof Object.values(Object.values(Object.values(canvasObjects[i])[j])[k])[n] + '"'
                                        + "onchange=" + '"' + "newValuesOfObject[" + n + "]=" + "this.value;" + '"'
                                        + " /> "
                                        + "</form></div>"
                                }
                            }
                        }
                        div.innerHTML += "<div style=" + '"' + "text-align:center; margin-bottom:3px;" + '"' + ">"
                            + "<button onclick=" + '"' + "addToObjectValues(newValuesOfObject)" + '"' + ">"
                            + "Add New Entry </button></div>"

                        //Line separating the values
                        div.innerHTML += "<hr style=" + '"' + "height:1px;border:none;color:#333;background-color:#333;" + '"' + ">";
                    }
                } else if (typeof Object.values(canvasObjects[i])[j] === 'boolean') {
                    //colliding is not supposed to be changed by this
                    if (Object.keys(canvasObjects[i])[j] != "colliding") {
                        div.innerHTML += "<p style=" + '"' + "text-align:center;" + '"' + "><strong><u>" + Object.keys(canvasObjects[i])[j] +" option" + "</u></strong></p>";
                        if (Object.values(canvasObjects[i])[j] == true) {
                            div.innerHTML += "<div style=" + '"' + "text-align:center; margin-bottom:3px;" + '"' + ">" +
                                "<input id=" + '"' + Object.keys(canvasObjects[i])[j] + '"' +
                                " style=" + '"' + "margin-right: 5px;" + '"' +
                                " type=" + '"' + "checkbox" + '"' + "name=" + '"' + Object.keys(canvasObjects[i])[j] + '"' +
                                "onclick=" + '"' + "toggleBool(" + "'" + Object.keys(canvasObjects[i])[j] + "'" + ")" + '"' +
                                " checked=" + '"' + "true" + '"' + ">"
                                + Object.keys(canvasObjects[i])[j] +
                                "</div>";
                        } else {
                            div.innerHTML += "<div style=" + '"' + "text-align:center; margin-bottom:3px;" + '"' + ">" +
                                "<input id=" + '"' + Object.keys(canvasObjects[i])[j] + '"' +
                                " style=" + '"' + "margin-right: 5px;" + '"' +
                                " type=" + '"' + "checkbox" + '"' + "name=" + '"' + Object.keys(canvasObjects[i])[j] + '"' +
                                "onclick=" + '"' + "toggleBool(" + "'" + Object.keys(canvasObjects[i])[j] + "'" + ")" + '"' + ">"
                                + Object.keys(canvasObjects[i])[j] +
                                "</div>";
                        }
                        div.innerHTML += "<hr style=" + '"' + "height:1px;border:none;color:#333;background-color:#333;" + '"' + ">";
                    }
                } else if (typeof Object.values(canvasObjects[i])[j] === 'string') {
                    if (Object.keys(canvasObjects[i])[j] != "object") {
                        div.innerHTML += "<p style=" + '"' + "text-align:center;" + '"' + "><strong><u>" + Object.keys(canvasObjects[i])[j] +" option" + "</u></strong></p>";
                        if (Object.values(canvasObjects[i])[j] != "") {
                            div.innerHTML += "<p style=" + '"' + "text-align:center;" + '"' + "> current text: <u>" + Object.values(canvasObjects[i])[j] + "</u> </p>";
                        }
                        div.innerHTML += "<div style=" + '"' + "text-align:center; margin-bottom:3px;" + '"' + "> "
                            + " <form style=" + '"' + "display: inline-block;" + '"' + ">"
                            + "<input id=" + '"' + Object.keys(canvasObjects[i])[j] + Object.values(canvasObjects[i])[j] + '"'
                            + " style=" + '"' + "text-align:center;" + '"' + " type=" + '"' + "text" + '"' +
                            " placeholder=" + '"' + Object.keys(canvasObjects[i])[j] + " of type:" + typeof Object.values(canvasObjects[i])[j] + '"'
                            + " /> "
                            + "</form></div>"
                        div.innerHTML += "<div style=" + '"' + "text-align:center; margin-bottom:3px;" + '"' + ">"
                            + "<button onclick=" + '"' + "changeText(" + "'" + Object.keys(canvasObjects[i])[j] + "'" + ")" + '"' + ">"
                            + "Save Text </button></div>"
                        div.innerHTML += "<hr style=" + '"' + "height:1px;border:none;color:#333;background-color:#333;" + '"' + ">";
                    }

                } else if (typeof Object.values(canvasObjects[i])[j] === 'number') {
                    if (Object.keys(canvasObjects[i])[j] != "id") {
                        div.innerHTML += "<p style=" + '"' + "text-align:center;" + '"' + "><strong><u>" + Object.keys(canvasObjects[i])[j] + " option" + "</u></strong></p>";
                        div.innerHTML += "<p style=" + '"' + "text-align:center;" + '"' + "> current number: <u>" + Object.values(canvasObjects[i])[j] + "</u> </p>";
                        div.innerHTML += "<div style=" + '"' + "text-align:center; margin-bottom:3px;" + '"' + "> "
                            + " <form style=" + '"' + "display: inline-block;" + '"' + ">"
                            + "<input id=" + '"' + Object.keys(canvasObjects[i])[j] + Object.values(canvasObjects[i])[j] + '"'
                            + " style=" + '"' + "text-align:center;" + '"' + " type=" + '"' + "text" + '"' +
                            " placeholder=" + '"' + Object.keys(canvasObjects[i])[j] + " of type:" + typeof Object.values(canvasObjects[i])[j] + '"'
                            + " /> "
                            + "</form></div>"
                        div.innerHTML += "<div style=" + '"' + "text-align:center; margin-bottom:3px;" + '"' + ">"
                            + "<button onclick=" + '"' + "changeNumber(" + "'" + Object.keys(canvasObjects[i])[j] + "'" + ")" + '"' + ">"
                            + "Save Text </button></div>"
                        div.innerHTML += "<hr style=" + '"' + "height:1px;border:none;color:#333;background-color:#333;" + '"' + ">";
                    }
                }
            }
        }
    }
}, false)

function changeNumber(value) {
    for (var i = 0; i < canvasObjects.length; i++) {
        if (canvasObjects[i].id == objectIdToAddTo) {
            for (var j = 0; j < Object.keys(canvasObjects[i]).length; j++) {
                if (Object.keys(canvasObjects[i])[j] == value) {
                    var textField = document.getElementById(value + Object.values(canvasObjects[i])[j]);
                    //Reference and value types are wierd so we do this by talking to the interpreter
                    eval("canvasObjects[i]." + value + " = " + parseFloat(textField.value));
                    updateParams(i, value);
                }
            }
        }
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < canvasObjects.length; i++) {
        canvasObjects[i].draw(context);
    }
}

function changeText(value) {
    for (var i = 0; i < canvasObjects.length; i++) {
        if (canvasObjects[i].id == objectIdToAddTo) {
            for (var j = 0; j < Object.keys(canvasObjects[i]).length; j++) {
                if (Object.keys(canvasObjects[i])[j] == value) {
                    var textField = document.getElementById(value + Object.values(canvasObjects[i])[j]);
                    //Reference and value types are wierd so we do this by talking to the interpreter
                    eval("canvasObjects[i]." + value + " = " + '"' + textField.value + '"');
                    updateParams(i, value);
                }
            }
        }
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < canvasObjects.length; i++) {
        canvasObjects[i].draw(context);
    }
}

function toggleBool(bool) {
    for (var i = 0; i < canvasObjects.length; i++) {
        if (canvasObjects[i].id == objectIdToAddTo) {
            for (var j = 0; j < Object.keys(canvasObjects[i]).length; j++) {
                if (Object.keys(canvasObjects[i])[j] == bool) {
                    //Reference and value types are wierd so we do this by talking to the interpreter
                    eval("canvasObjects[i]." + bool + " = !canvasObjects[i]." + bool);
                    eval("console.log(canvasObjects[i]." + bool + ");");
                    updateParams(i, bool);
                }
            }
        }
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < canvasObjects.length; i++) {
        canvasObjects[i].draw(context);
    }

}




function addToObjectValues(listOfValues) {
    if (objectVariableToAddTo != null && objectIdToAddTo != null) {
        var newObjectToAdd = {};
        for (var i = 0; i < keysForObject.length; i++) {
            if (Object.is(parseInt(listOfValues[i]), NaN)) {
                newObjectToAdd[keysForObject[i]] = listOfValues[i];
            } else {
                newObjectToAdd[keysForObject[i]] = parseInt(listOfValues[i]);
            }

        }
        for (var i = 0; i < canvasObjects.length; i++) {
            if (canvasObjects[i].id == objectIdToAddTo) {
                for (var j = 0; j < Object.keys(canvasObjects[i]).length; j++) {
                    if (Object.keys(canvasObjects[i])[j] == objectVariableToAddTo) {
                        //special case for bounds as they needed to be more intuitive and the position actually matters alot
                        if (Object.keys(canvasObjects[i])[j] == "bounds") {
                            var currentLowestDist = null;
                            var currentSecondLowestDist = null;
                            var lowestCorner = null;
                            var secondLowestCorner = null;
                            for (var k = 0; k < Object.values(canvasObjects[i])[j].length; k++) {
                                var currentDist = Math.hypot(Object.values(Object.values(canvasObjects[i])[j])[k].x - newObjectToAdd.x, Object.values(Object.values(canvasObjects[i])[j])[k].y - newObjectToAdd.y);
                                if (currentLowestDist != null && currentSecondLowestDist != null) {
                                    if (currentDist < currentSecondLowestDist) {
                                        if (currentDist < currentLowestDist) {
                                            currentSecondLowestDist = currentLowestDist;
                                            secondLowestCorner = lowestCorner;
                                            currentLowestDist = currentDist;
                                            lowestCorner = k;
                                        } else {
                                            currentSecondLowestDist = currentDist;
                                            secondLowestCorner = k;
                                        }
                                    }
                                }
                                if (currentSecondLowestDist == null && currentLowestDist != null) {
                                    currentSecondLowestDist = currentDist;
                                    secondLowestCorner = k;
                                }
                                if (currentLowestDist == null) {
                                    currentLowestDist = currentDist;
                                    lowestCorner = k;
                                }

                            }
                            if (lowestCorner != null && secondLowestCorner != null) {
                                if (lowestCorner == Object.values(canvasObjects[i])[j].length - 1 && secondLowestCorner == 0) {
                                    Object.values(canvasObjects[i])[j].push(newObjectToAdd);
                                } else if (secondLowestCorner == Object.values(canvasObjects[i])[j].length - 1 && lowestCorner == 0) {
                                    Object.values(canvasObjects[i])[j].push(newObjectToAdd);
                                } else if (secondLowestCorner > lowestCorner) {
                                    Object.values(canvasObjects[i])[j].splice(secondLowestCorner, 0, newObjectToAdd);
                                } else if (lowestCorner < secondLowestCorner) {
                                    Object.values(canvasObjects[i])[j].splice(secondLowestCorner, 0, newObjectToAdd);
                                } else if (lowestCorner > secondLowestCorner) {
                                    Object.values(canvasObjects[i])[j].splice(lowestCorner, 0, newObjectToAdd);
                                }
                            }

                        }

                    }
                }
            }
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < canvasObjects.length; i++) {
            canvasObjects[i].draw(context);
        }
        //set object name to null again
        keysForObject = []
        objectVariableToAddTo = null;
        objectIdToAddTo = null;
    }

}


function updateParams(obj,param) {
    canvasObjects[obj].updateParams(param);
}

canvas.onmouseup = function (e) {
    //unlock item
    if (lockedItem != null) {
        itemIsLocked = false;
        lockedItem = null;
    }
}

function getObjects() {
    return canvasObjects;
}