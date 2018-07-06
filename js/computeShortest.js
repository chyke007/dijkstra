function computeShortest(){
var start,end,result,defn1,defn2;
	
	start = document.querySelector('.start').value;
	end = document.querySelector('.stop').value;
	
	result = dijkstra(problem, start, end);
	if(start =='start'){
		start = 'A';
	}
	if(end =='finish'){
		end = 'I';
	}
	console.log(result);

	defn1 = "<h3><b>Shortest distance from "+start+" to "+end+" is : "+result.distance;
	defn2 = " ";
	for(var i in result.path){
		if(result.path[i]=='start'){
			defn2+="A-";
		}else{
		
		if((parseInt(i)+1)==result.path.length){
			if(result.path[i]=='finish'){
				defn2+= 'I';
				
			}else{
				defn2+= result.path[i];
		
			}
		
			}else{
				defn2+= result.path[i] + '-';
	
			}
		}
		
}

	defn2 = defn1 +"<br>The path is " +defn2+"</b></h3>";
	document.getElementById('resultCompute').innerHTML = defn2;
}