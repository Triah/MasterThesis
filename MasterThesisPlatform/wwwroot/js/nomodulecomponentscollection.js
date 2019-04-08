'use strict';  class abstractshape {
    constructor(id, bounds, moveAble, targetAble, color, text, textVisible, size) {
        this.id = id;
        this.colliding;
        this.size = size;
        this.color = color;
        this.text = text;
        this.textVisible = textVisible;
        this.moveAble = moveAble;
        this.targetAble = targetAble;
        this.object = null;
        this.bounds = bounds;
    }

    setObjectName(object) {
        this.object = object;
    }

    init(objects){
        //do nothing
    }
    
    updateParams(paramToBeUpdated){
        if(paramToBeUpdated == "size"){
            this.scaleSize(this.size);
        }
    }

    /**
     * This method must be extended when creating a new object for it to be usable by the game creator
     * @param {canvas} canvas 
     */
    setDefaultForUninstantiatedParameters(canvas){
        if(this.bounds == null){
            this.bounds = [{x:canvas.width/2-100, y:canvas.height/2-100},{x:canvas.width/2+100, y:canvas.height/2-100},{x:canvas.width/2+100, y:canvas.height/2+100}, {x:canvas.width/2-100,y:canvas.height/2+100}];
        }
        if(this.moveAble == null){
            this.moveAble = true;
        }
        if(this.targetAble == null){
            this.targetAble = false;
        }
        if(this.color == null){
            this.color = "white";
        }
        if(this.text == null){
            this.text = "";
        }
        if(this.textVisible == null){
            this.textVisible = false;
        }
        if(this.size == null){
            this.size = 1;
        }
    }

    getDegreesForAngles(){
        var newBounds = [];
        for(var i = 0; i < this.bounds.length; i++){
            if(i != this.bounds.length-1){
                var angle = Math.atan2(this.bounds[i+1].y-this.bounds[i].y,this.bounds[i+1].x-this.bounds[i].x)
                var vectorLength = Math.sqrt(Math.pow(this.bounds[i+1].x-this.bounds[i].x, 2) + Math.pow(this.bounds[i+1].y-this.bounds[i].y, 2));
            } else {
                var angle = Math.atan2(this.bounds[0].y-this.bounds[i].y,this.bounds[0].x-this.bounds[i].x)
                var vectorLength = Math.sqrt(Math.pow(this.bounds[0].x-this.bounds[i].x, 2) + Math.pow(this.bounds[0].y-this.bounds[i].y, 2));
            }
            newBounds.push({x:Math.floor(this.bounds[i].x + vectorLength*Math.cos(angle)),y:Math.floor(this.bounds[i].y + vectorLength*Math.sin(angle))})
        }
        return newBounds;
    }

    scaleSize(multiplier){
        for(var i = 0; i < this.getDegreesForAngles().length; i++){
            if(i == this.getDegreesForAngles().length-1){
                this.bounds[0].x = this.getDegreesForAngles()[i].x*multiplier;
                this.bounds[0].y = this.getDegreesForAngles()[i].y*multiplier;   
            } else {
                this.bounds[i+1].x = this.getDegreesForAngles()[i].x*multiplier;
                this.bounds[i+1].y = this.getDegreesForAngles()[i].y*multiplier;   
            }
            
        }
        
    }


    getBounds() {
        return this.bounds;
    }

    getVectors() {
        var vectors = []
        for (var i = 0; i < this.getBounds().length; i++) {
            if (i != this.getBounds().length - 1) {
                var x1 = this.getBounds()[i].x;
                var y1 = this.getBounds()[i].y;
                var x2 = this.getBounds()[i + 1].x;
                var y2 = this.getBounds()[i + 1].y;
            } else {
                var x1 = this.getBounds()[i].x;
                var y1 = this.getBounds()[i].y;
                var x2 = this.getBounds()[0].x;
                var y2 = this.getBounds()[0].y;
            }
            vectors.push({ x1: x1, y1: y1, x2: x2, y2: y2 });

        }
        return vectors;
    }

    process(e,objects,socket){
        //Do nothing
    }

    draw(context) {
        context.beginPath();
        if(this.color != ""){
            context.fillStyle = this.color;
        }
        context.moveTo(this.getBounds()[0].x, this.getBounds()[0].y);
        for (var i = 1; i < this.getBounds().length; i++) {
            context.lineTo(this.getBounds()[i].x, this.getBounds()[i].y);
        }
        context.strokeStyle = "#000000"
        context.closePath();
        context.fill();
        if (this.text != "" && this.textVisible) {
            context.font = "12px Arial";
            context.strokeText(this.text, this.bounds[0].x+10, this.getCenter().y);
        }
        context.stroke();
    }

    area() {
        var areas = [];
        for (var i = 0; i < this.getBounds().length; i++) {
            var sideLengths = [];
            var bounds = [];
            //get the bounds for each of the triangles
            bounds.push({ x: this.getBounds()[i].x, y: this.getBounds()[i].y });
            if (i != this.getBounds().length - 1) {
                bounds.push({ x: this.getBounds()[i + 1].x, y: this.getBounds()[i + 1].y })
            } else {
                bounds.push({ x: this.getBounds()[0].x, y: this.getBounds()[0].y });
            }
            bounds.push({ x: this.getCenter().x, y: this.getCenter().y });

            for (var j = 0; j < bounds.length; j++) {
                if (j != bounds.length - 1) {
                    var vector = { x1: bounds[j].x, y1: bounds[j].y, x2: bounds[j + 1].x, y2: bounds[j + 1].y };
                } else {
                    var vector = { x1: bounds[j].x, y1: bounds[j].y, x2: bounds[0].x, y2: bounds[0].y };
                }
                var lengthx = vector.x2 - vector.x1;
                var lengthy = vector.y2 - vector.y1;
                var length = Math.sqrt(Math.pow(lengthx, 2) + Math.pow(lengthy, 2));
                sideLengths.push(length);
            }

            var s = 0;
            for (var j = 0; j < sideLengths.length; j++) {
                s += sideLengths[j];
            }
            s = s / 2;
            var a = 0;

            for (var j = 0; j < sideLengths.length; j++) {
                if (a == 0) {
                    a = s - sideLengths[j];
                } else {
                    a *= s - sideLengths[j];
                }
            }

            a = s * a;
            a = Math.sqrt(a);
            areas.push(a);

            var area = 0
            for (var j = 0; j < areas.length; j++) {
                area += areas[j]
            }
        }
        return Math.floor(area);
    }

    //this is limited in irregular polygons as the triangles created need to be within the figure for it to work
    getCollisionArea(e) {
        var areas = [];
        for (var i = 0; i < this.getBounds().length; i++) {
            var sideLengths = [];
            var bounds = [];

            //get the bounds for each of the triangles
            bounds.push({ x: this.getBounds()[i].x, y: this.getBounds()[i].y });
            if (i != this.getBounds().length - 1) {
                bounds.push({ x: this.getBounds()[i + 1].x, y: this.getBounds()[i + 1].y })
            } else {
                bounds.push({ x: this.getBounds()[0].x, y: this.getBounds()[0].y });
            }
            bounds.push({ x: e.x - canvas.getBoundingClientRect().left, y: e.y - canvas.getBoundingClientRect().top });

            for (var j = 0; j < bounds.length; j++) {
                if (j != bounds.length - 1) {
                    var vector = { x1: bounds[j].x, y1: bounds[j].y, x2: bounds[j + 1].x, y2: bounds[j + 1].y };
                } else {
                    var vector = { x1: bounds[j].x, y1: bounds[j].y, x2: bounds[0].x, y2: bounds[0].y };
                }
                var lengthx = vector.x2 - vector.x1;
                var lengthy = vector.y2 - vector.y1;
                var length = Math.sqrt(Math.pow(lengthx, 2) + Math.pow(lengthy, 2));
                sideLengths.push(length);
            }

            var s = 0;
            for (var j = 0; j < sideLengths.length; j++) {
                s += sideLengths[j];
            }
            s = s / 2;
            var a = 0;

            for (var j = 0; j < sideLengths.length; j++) {
                if (a == 0) {
                    a = s - sideLengths[j];
                } else {
                    a *= s - sideLengths[j];
                }
            }

            a = s * a;
            a = Math.sqrt(a);
            areas.push(a);
        }

        var eventArea = 0
        for (var i = 0; i < areas.length; i++) {
            eventArea += areas[i]
        }

        var buffer = 20;
        if (Math.floor(eventArea) - Math.floor(this.area()) < 20) {
            this.colliding = true;
        } else {
            this.colliding = false;
        }
        return this.colliding;
    }


    distanceX(p1, p2, canvas) {
        //temporary
        return (p1.x - canvas.getBoundingClientRect().left) - p2.x;
    }

    distanceY(p1, p2, canvas) {
        //temporary
        return (p1.y - canvas.getBoundingClientRect().top) - p2.y;
    }

    getCenter() {
        var centerX = 0
        for (var i = 0; i < this.getBounds().length; i++) {
            centerX += this.getBounds()[i].x;
        }
        centerX = centerX / this.getBounds().length;
        var centerY = 0;
        for (var i = 0; i < this.getBounds().length; i++) {
            centerY += this.getBounds()[i].y;
        }
        centerY = centerY / this.getBounds().length;
        var centerPoint = { x: centerX, y: centerY };
        return centerPoint;
    }

    move(canvas, e) {
        var moveDistanceX = this.distanceX(e, this.getCenter(), canvas);
        var moveDistanceY = this.distanceY(e, this.getCenter(), canvas);
        for (var i = 0; i < this.getBounds().length; i++) {
            this.bounds[i].x = this.bounds[i].x + moveDistanceX;
            this.bounds[i].y = this.bounds[i].y + moveDistanceY;
        }
    }


}  class shapessquare extends abstractshape
 {    constructor(id, bounds, moveAble, targetAble, color, text, textVisible, size){
        super(id, bounds, moveAble, targetAble, color, text, textVisible, size);
    }

    setDefaultForUninstantiatedParameters(canvas){
        super.setDefaultForUninstantiatedParameters(canvas);
        
        this.constructProperBounds(100,100);
    }

    constructProperBounds(w,h){
        var startX = this.bounds[0].x;
        var startY = this.bounds[0].y;

        if(this.bounds.length == 4){
            this.bounds[0] = { x:startX, y:startY };
            this.bounds[1] = { x:startX + w, y: startY };
            this.bounds[2] = { x:startX + w, y: startY + h };
            this.bounds[3] = { x: startX, y: startY + h};
            return this.bounds;
        } else {
            console.log("shape is not a square removing it from canvas");
            return this.bounds;
        }
    }

    

}  class memorymemoryCard extends abstractshape {
    constructor(id, bounds, moveAble, targetAble, color, text, textVisible, privateVariables, size, imageURL) {
        super(id, bounds, moveAble, targetAble, color, text, textVisible, size);
        this.privateVariables = privateVariables;
        this.imageURL = imageURL;
    }


    setDefaultForUninstantiatedParameters(canvas) {
        super.setDefaultForUninstantiatedParameters(canvas);
        this.targetAble = true;
        if (this.imageURL == null) {
            this.imageURL = "";
        }
        if (this.privateVariables == null) {
            this.privateVariables = { "cloneExists": undefined, "activeVariables": [], "locked": false, "cloneId": [] };
        }
        else {
            this.privateVariables.activeObjects = [];
            this.privateVariables.locked = false;
        }

    }

    init(objects) {
        if (this.privateVariables.cloneExists == undefined) {
            this.clone(objects);
        }

    }

    setObjectName(object) {
        this.object = object;
    }

    draw(context) {
        context.beginPath();
        if(this.color != ""){
            context.fillStyle = this.color;
        }
        context.moveTo(this.getBounds()[0].x, this.getBounds()[0].y);
        for (var i = 1; i < this.getBounds().length; i++) {
            context.lineTo(this.getBounds()[i].x, this.getBounds()[i].y);
        }
        context.strokeStyle = "#000000"
        context.closePath();
        context.fill();
        if (this.text != "" && this.textVisible) {
            context.font = "12px Arial";
            context.strokeText(this.text, this.bounds[0].x+10, this.getCenter().y);
        }
        context.stroke();
        if(this.imageURL != null){
            if(this.textVisible){
                var img = new Image()
                img.src = this.imageURL;
                var bounds = this.getBounds();
                img.onload = function(){
                    context.drawImage(img, bounds[0].x, bounds[0].y, Math.sqrt(Math.pow(bounds[1].x-bounds[0].x, 2) + Math.pow(bounds[1].y-bounds[0].y, 2)),Math.sqrt(Math.pow(bounds[2].x-bounds[1].x, 2) + Math.pow(bounds[2].y-bounds[1].y, 2)))
                }
            }
            
        }
    }

    process(e, objects, socket) {
        if (e.type == "mousedown") {
            this.checkMatching(objects, e, socket);
        }
    }

    checkMatching(list, e, socket) {
        var reset = false;
        var nonpairedActive = [];

        var untargetables = [];
        for(var i = 0; i < list.length; i++){
            if(list[i].object == this.object){
                if(!list[i].targetAble){
                    untargetables.push(list[i]);
                }
            }
        }

        for(var i = 0; i < list.length; i++){
            if(list[i].privateVariables.locked){
                for(var obj in untargetables){
                    if(untargetables[obj].id == list[i].id){
                        untargetables.splice(obj,1);
                    }
                }
            }
        }

        for(var i = 0; i < untargetables.length; i++){
            if(untargetables.length == 2){
                if(!untargetables[i].privateVariables.locked){
                    untargetables[i].targetAble = true;
                    untargetables[i].textVisible = false;
                }
            }
        }

        if (this.getCollisionArea(e)) {
            if (this.targetAble) {
                this.mouseDownEvent();
                if (this.textVisible && !this.privateVariables.locked) {
                    if (list[this.privateVariables.cloneId[0]].privateVariables.activeObjects.indexOf(this.id) == -1) {
                        list[this.privateVariables.cloneId[0]].privateVariables.activeObjects.push(this.id);
                    }
                    if (list[this.privateVariables.cloneId[1]].privateVariables.activeObjects.indexOf(this.id) == -1) {
                        list[this.privateVariables.cloneId[1]].privateVariables.activeObjects.push(this.id);
                    }
                    this.targetAble = false;
                } else {
                    for (var i = 0; i < this.privateVariables.activeObjects.length; i++) {
                        if (this.privateVariables.activeObjects[i] == this.id && this.textVisible == false) {
                            this.privateVariables.activeObjects.splice(i, 1);
                        }
                    }
                }

                var lockedItems = [];
                for (var i = 0; i < list.length; i++) {
                    if (list[i].privateVariables.activeObjects.length == 2) {
                        if (list[i].privateVariables.activeObjects.indexOf(list[i].id) != -1) {
                            if(!list[list[i].privateVariables.activeObjects[0]].targetAble && !list[list[i].privateVariables.activeObjects[1]].targetAble){
                                list[i].privateVariables.locked = true;
                                lockedItems.push(list[i]);
                            }
                        }
                    }
                }

                var allItemsActivated = [];
                for (var i = 0; i < list.length; i++) {
                    if (list[i].privateVariables.activeObjects.length > 0) {
                        for (var j = 0; j < list[i].privateVariables.activeObjects.length; j++) {
                            if (allItemsActivated.indexOf(list[i].privateVariables.activeObjects[j]) == -1) {
                                allItemsActivated.push(list[i].privateVariables.activeObjects[j]);
                            }
                        }
                    }
                }
                var lockedIds = []
                for (var i = 0; i < lockedItems.length; i++) {
                    lockedIds.push(lockedItems[i].id);
                }

                socket.emit('updateState', list);
            }
        }

    }

    clone(listToAddTo) {
        if (this.object != null) {
            for (var object in listToAddTo) {
                if (listToAddTo[object].object == this.object) {
                    if (listToAddTo[object].privateVariables.cloneExists == undefined) {
                        if (this.object != null) {
                            //TODO: FIX!!
                            var clone = eval("new " + this.object + "(" + " listToAddTo.length,[],listToAddTo[object].moveAble," +
                                "listToAddTo[object].targetAble,listToAddTo[object].color,listToAddTo[object].text,listToAddTo[object].textVisible,listToAddTo[object].privateVariables,listToAddTo[object].size,listToAddTo[object].imageURL" + ")");
                        }
                        listToAddTo[object].privateVariables.cloneExists = true;
                        for (var i = 0; i < listToAddTo[object].bounds.length; i++) {
                            clone.bounds[i] = { x: listToAddTo[object].bounds[i].x, y: listToAddTo[object].bounds[i].y };
                        }
                        clone.privateVariables.cloneId = []
                        clone.setObjectName(this.object);
                        clone.privateVariables.cloneId.push(listToAddTo[object].id, clone.id)
                        listToAddTo.push(clone);
                    }
                }
            }
        }
    }

    mouseDownEvent() {
        if (!this.privateVariables.locked) {
            if (this.textVisible) {
                this.textVisible = false;
            } else if (!this.textVisible) {
                this.textVisible = true;
            }
        }
    }
}
