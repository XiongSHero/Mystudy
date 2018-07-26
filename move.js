function getByClass(oParent, sClass)
{
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	
	for(var i=0;i<aEle.length;i++)
	{
		if(aEle[i].className==sClass)
		{
			aResult.push(aEle[i]);
		}
	}
	
	return aResult;
}

function $(id){
    return document.getElementById(id);
}

function getStyle(obj,attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr]; 
}

function startMove(obj,json,fnEnd){
    var speed = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function (){
        var bStop = true;// 假设所有的值都到达目标点
        for(var attr in json){
            var pos = 0;
            pos = attr == "opacity" ? Math.round(parseFloat(getStyle(obj, attr))*100) : parseInt(getStyle(obj, attr));
            var speed = (json[attr] - pos)/20;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); 
            if(pos != json[attr]){
                bStop = false;
            }
            if(attr == "opacity"){
                obj.style.opacity = (pos + speed)/100;
                obj.style.filter = 'alpha(opacity:"+( pos + speed )+")';
            }else{
                obj.style[attr] = pos + speed + 'px';
            }
        }
        if(bStop){
            clearInterval(obj.timer);
            if(fnEnd){
                fnEnd();
            }
        }
    },30)
}