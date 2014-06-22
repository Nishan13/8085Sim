var memory = {
	address : [],
	start: 0,
	end: 4095,
	current: 0,
};

function initMem(){
	for(var a=memory.start;a<memory.end+1;a++){
		memory.address[a] = decToHex(0);
	}
}

function memToHex(number){
	if (number < 0){
		number = 0xFFFF + number + 1;
	}
	var str = number.toString(16);
	if(number>65535){
		str = str.substr(1);
	}
	if(number<16){
		return "000"+str.toUpperCase();
	}else if(number<256){
		return "00"+str.toUpperCase();
	}else if(number<4096){
		return "0"+str.toUpperCase();
	}else{
		return str.toUpperCase();
	}
}

function updateMem(){
	$("#tbody").text("");
	for(var a=memory.start;a<memory.end+1;a++){
		$("#tbody").append("<tr><td>"+memToHex(a)+"</td><td>"+memory.address[a]+"</td>");
	}
}