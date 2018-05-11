window.onload=function(){
	var qt = document.createElement("script");
	qt.src = "//qt.gtimg.cn/q=sz000002";
	var s = document.getElementsByTagName("script")[0]; 
	s.parentNode.insertBefore(qt, s);	
	
	var stockTimer=null;
	stockTimer=setInterval(function(){
		var newqt = document.createElement("script");
		newqt.src = "//qt.gtimg.cn/q=sz000002";
		s.parentNode.replaceChild(newqt,qt);
		qt=newqt;
		var elements=v_sz000002.split("~");
		document.getElementById("data_name").innerHTML=elements[1];
		document.getElementById("data_code").innerHTML="("+elements[2]+")";
		document.getElementById("data_xianjia").innerHTML=elements[3];
		document.getElementById("data_zhangdie").innerHTML=elements[31];
		document.getElementById("data_zhangdiefu").innerHTML=elements[32]+"%";
		document.getElementById("data_jinkai").innerHTML=elements[5];
		document.getElementById("data_zuigao").innerHTML=elements[33];
		document.getElementById("data_zhangting").innerHTML=elements[47];
	    document.getElementById("data_zuoshou").innerHTML=elements[4];
	    document.getElementById("data_zuidi").innerHTML=elements[42];
	    document.getElementById("data_dieting").innerHTML=elements[48];
		document.getElementById("data_chengjiaoliang").innerHTML=toDecimal(elements[36]/10000)+"万";
		document.getElementById("data_chengjiaoe").innerHTML=toDecimal(elements[37]/10000)+"亿";
		document.getElementById("data_liutongshizhi").innerHTML=elements[44]+"亿";
		document.getElementById("data_shiyinglv").innerHTML=elements[39];
		document.getElementById("data_huanshoulv").innerHTML=elements[38]+"%";
		document.getElementById("data_zhenfu").innerHTML=elements[43];
		document.getElementById("data_zongshizhi").innerHTML=elements[45]+"亿";
		document.getElementById("data_shijinglv").innerHTML=elements[46];		
	},1000);
	function toDecimal(x){ 
	   var f = parseFloat(x); 
	   if (isNaN(f)) { 
	    return; 
	   } 
	   f = Math.round(x*100)/100; 
	   return f; 
	} 
}
