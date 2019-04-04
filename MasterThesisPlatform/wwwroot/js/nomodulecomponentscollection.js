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

    process(e,objects){
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
    constructor(id, bounds, moveAble, targetAble, color, text, textVisible,privateVariables,size){
        super(id, bounds, moveAble, targetAble, color, text, textVisible,size);
        this.privateVariables = privateVariables;
    }

    setDefaultForUninstantiatedParameters(canvas){
        super.setDefaultForUninstantiatedParameters(canvas);     
        this.privateVariables = {"cloneExists": undefined, "cloneId": undefined, "activeObjects": [], "locked": false };
    }

    init(objects){
        this.clone(objects);
    }

    setObjectName(object) {
        this.object = object;
    }

    process(e,objects){
        if(e.type == "mousedown"){
            this.checkMatching(objects,e);
            console.log(this);
        } 
    }

    checkMatching(list,e){
        if(this.getCollisionArea(e)){
            this.mouseDownEvent();
            if(this.textVisible && !this.privateVariables.locked){
                if(list[this.privateVariables.cloneId[0]].privateVariables.activeObjects.indexOf(this.id) == -1){
                    list[this.privateVariables.cloneId[0]].privateVariables.activeObjects.push(this.id);
                }
                if(list[this.privateVariables.cloneId[1]].privateVariables.activeObjects.indexOf(this.id) == -1){
                    list[this.privateVariables.cloneId[1]].privateVariables.activeObjects.push(this.id);
                }
                console.log(list[this.privateVariables.cloneId[0]])
                console.log(list[this.privateVariables.cloneId[1]])
            } else {
                for(var i = 0 ; i < this.privateVariables.activeObjects.length; i++){
                    if(this.privateVariables.activeObjects[i] == this.id && this.textVisible == false){
                        this.privateVariables.activeObjects.splice(i,1);
                    }
                }
            }
        }
        var lockedItems = [];
        for(var i = 0; i < list.length; i++){
            if(list[i].privateVariables.activeObjects.length == 2){
                if(list[i].privateVariables.activeObjects.indexOf(list[i].id) != -1){
                    list[i].privateVariables.locked = true;
                    lockedItems.push(list[i]);
                }
            }
        }
        var allItemsActivated = [];
        for(var i = 0; i < list.length; i++){
            if(list[i].privateVariables.activeObjects.length > 0) {
                for(var j = 0; j < list[i].privateVariables.activeObjects.length; j++){
                    if(allItemsActivated.indexOf(list[i].privateVariables.activeObjects[j]) == -1){
                        allItemsActivated.push(list[i].privateVariables.activeObjects[j]);
                    }
                }
            }
        }
        var lockedIds = []
        for(var i = 0; i < lockedItems.length; i++){
            lockedIds.push(lockedItems[i].id);
        }
        console.log(lockedIds);
        var nonpairedActive = []
        nonpairedActive = allItemsActivated.filter(id => !lockedIds.includes(id));
        console.log("non-paired: " + nonpairedActive);
        console.log("all: " + allItemsActivated);
        if(nonpairedActive.length == 2){
            for(var i = 0; i < list.length; i++){
                for(var j = 0; j < nonpairedActive.length; j++){
                    if(list[i].id == nonpairedActive[j]){
                        list[i].privateVariables.activeObjects = [];                 
                    }
                }
                
            }
        }
        if(nonpairedActive.length > 0 && nonpairedActive.length < 2){
            for(var i = 0; i < list.length; i++){
                if(list[i].textVisible && list[i].privateVariables.activeObjects.indexOf(list[i].id) == -1){
                    list[i].textVisible = false
                }
            }
        }
    }

    clone(listToAddTo){
        for(var object in listToAddTo){
            if(listToAddTo[object].object == this.object){
                if(listToAddTo[object].privateVariables.cloneExists == undefined){
                    var clone = eval("new " + this.object + "("+" listToAddTo.length,[],listToAddTo[object].moveAble," +
                    "listToAddTo[object].targetAble,listToAddTo[object].color,listToAddTo[object].text,listToAddTo[object].textVisible,listToAddTo[object].privateVariables,listToAddTo[object].size" +")"); /*(listToAddTo.length,[],listToAddTo[object].moveAble,
                    listToAddTo[object].targetAble,listToAddTo[object].color,listToAddTo[object].text,listToAddTo[object].textVisible,listToAddTo[object].privateVariables,listToAddTo[object].size);*/
                    console.log(clone)
                    
                    listToAddTo[object].privateVariables.cloneExists = true;
                    for(var i = 0; i < listToAddTo[object].bounds.length;i++){
                        clone.bounds[i] = {x:listToAddTo[object].bounds[i].x , y:listToAddTo[object].bounds[i].y }; 
                    }
                    clone.privateVariables.cloneId = []
                    clone.setObjectName(this.object);
                    clone.privateVariables.cloneId.push(listToAddTo[object].id, clone.id)
                    listToAddTo.push(clone);
                }
            }
        }
    }

    mouseDownEvent(){
        if(!this.privateVariables.locked){
            console.log(this.id);
            if(this.textVisible){
            this.textVisible = false;
            } else if (!this.textVisible){
                this.textVisible = true;
            }
        }
    }
}
  class abstractcollisionShape extends abstractshape {
    constructor(id, bounds,moveAble,collideAble,targetAble) {
        super(id,bounds,moveAble,targetAble);
        this.collideAble = collideAble;
        this.colliding = false;
    }

    setDefaultForUninstantiatedParameters(canvas){
        super.setDefaultForUninstantiatedParameters(canvas);
        this.collideAble = true;
    }

    isCollidingWithOtherObject(objects) {
        var collision = null;
        if(this.calcCollisionOtherObjectsToThis(objects, this) != null){
            //calculate from other objects to this object
            collision = this.calcCollisionOtherObjectsToThis(objects, this);
        } else if (this.calcCollisionThisToOtherObjects(objects, this) != null){
            //invert process to cover all lines and point cases
            collision = this.calcCollisionThisToOtherObjects(objects, this);
        }
        return collision;
    }

    calcCollisionThisToOtherObjects(objects,self){
        var collision = null;
        objects.forEach(obj => {
            if (obj != self) {
                var areas = [];
                var allBoundsForPoint = [];
                for (var i = 0; i < obj.getBounds().length; i++) {
                    var allBoundsForPoint = [];
                    //Functioning as intended
                    for (var j = 0; j < self.getBounds().length; j++) {
                        var bounds = [];
                        bounds.push({ x: self.getBounds()[j].x, y: self.getBounds()[j].y });
                        if (j != self.getBounds().length - 1) {
                            bounds.push({ x: self.getBounds()[j + 1].x, y: self.getBounds()[j + 1].y })
                        } else {
                            bounds.push({ x: self.getBounds()[0].x, y: self.getBounds()[0].y });
                        }
                        bounds.push({ x: obj.getBounds()[i].x, y: obj.getBounds()[i].y });
                        allBoundsForPoint.push(bounds);
                    }

                    //calculate the lengths of the sides
                    var sideLengths = self.calcSideLengths(allBoundsForPoint);

                    //functioning as intended
                    var sValues = self.calcSValue(sideLengths);

                    //calculating areas
                    areas.push(self.calcTemporaryAreaValues(sValues, sideLengths));

                    //For each of the triangles combine the areas
                    var totalAreas = self.calcArea(areas);

                    for(var k = 0; k < totalAreas.length; k++){
                        if (Math.floor(totalAreas[k]) == Math.floor(self.area())) {
                            collision = {firstObj: self, secondObj: obj, cornerForCollision: k};
                        }
                    }
                }
            }
        });
        return collision;
    }

    calcCollisionOtherObjectsToThis(objects,self){
        var collision = null;
        objects.forEach(obj => {
            if (obj != self) {
                var areas = [];
                var allBoundsForPoint = [];
                for (var i = 0; i < self.getBounds().length; i++) {
                    var allBoundsForPoint = [];
                    //Functioning as intended
                    for (var j = 0; j < obj.getBounds().length; j++) {
                        var bounds = [];
                        bounds.push({ x: obj.getBounds()[j].x, y: obj.getBounds()[j].y });
                        if (j != obj.getBounds().length - 1) {
                            bounds.push({ x: obj.getBounds()[j + 1].x, y: obj.getBounds()[j + 1].y })
                        } else {
                            bounds.push({ x: obj.getBounds()[0].x, y: obj.getBounds()[0].y });
                        }
                        bounds.push({ x: self.getBounds()[i].x, y: self.getBounds()[i].y });
                        allBoundsForPoint.push(bounds);
                    }

                    //calculate the lengths of the sides
                    var sideLengths = self.calcSideLengths(allBoundsForPoint);

                    //functioning as intended
                    var sValues = self.calcSValue(sideLengths);

                    //calculating areas
                    areas.push(self.calcTemporaryAreaValues(sValues, sideLengths));

                    //For each of the triangles combine the areas
                    var totalAreas = self.calcArea(areas);

                    for(var k = 0; k < totalAreas.length; k++){
                        if (Math.floor(totalAreas[k]) == Math.floor(obj.area())) {
                            collision = {firstObj: obj, secondObj: self, cornerForCollision: k};
                        }
                    }
                }
            }
        });
        return collision;
    }

    calcSideLengths(allBoundsForPoint) {
        var sideLengths = []
        for (var k = 0; k < allBoundsForPoint.length; k++) {
            var lengthsOfEachTriangle = [];
            for (var b = 0; b < allBoundsForPoint[k].length; b++) {
                if (b != allBoundsForPoint[k].length - 1) {
                    var vector = { x1: allBoundsForPoint[k][b].x, y1: allBoundsForPoint[k][b].y, x2: allBoundsForPoint[k][b + 1].x, y2: allBoundsForPoint[k][b + 1].y };
                } else {
                    var vector = { x1: allBoundsForPoint[k][b].x, y1: allBoundsForPoint[k][b].y, x2: allBoundsForPoint[k][0].x, y2: allBoundsForPoint[k][0].y };
                }
                var lengthx = vector.x2 - vector.x1;
                var lengthy = vector.y2 - vector.y1;
                var length = Math.sqrt(Math.pow(lengthx, 2) + Math.pow(lengthy, 2));
                lengthsOfEachTriangle.push(length);
            }
            sideLengths.push(lengthsOfEachTriangle);
        }
        return sideLengths;
    }

    calcArea(tempAreaValues) {
        var totalAreas = []
        for (var k = 0; k < tempAreaValues.length; k++) {
            var totalArea = 0
            for (var b = 0; b < tempAreaValues[k].length; b++) {
                totalArea += tempAreaValues[k][b];
            }
            totalAreas.push(totalArea);
        }
        return totalAreas;
    }

    calcTemporaryAreaValues(sValues, sideLengths) {
        var tempAreaValues = []
        for (var k = 0; k < sValues.length; k++) {
            var a = 0;
            for (var b = 0; b < sideLengths[k].length; b++) {
                if (a == 0) {
                    a = sValues[k] - sideLengths[k][b];
                } else {
                    a *= sValues[k] - sideLengths[k][b];
                }
            }
            tempAreaValues.push(a);
        }

        for (var k = 0; k < tempAreaValues.length; k++) {
            tempAreaValues[k] = sValues[k] * tempAreaValues[k];
            tempAreaValues[k] = Math.sqrt(tempAreaValues[k]);
        }
        return tempAreaValues;
    }

    calcSValue(sideLengthsArray) {
        var sValues = []
        for (var k = 0; k < sideLengthsArray.length; k++) {
            var s = 0;
            for (var b = 0; b < sideLengthsArray[k].length; b++) {
                s += sideLengthsArray[k][b];
            }
            s = s / 2;
            sValues.push(s);
        }
        return sValues;
    }

}