var carry = 0;
var zero = 0;
var sign = 0;
var parity = 0;
var auCarry = 0;

var PC = 0;

var INCR = 0;

function updateFlag(){
	$("#cFlag").text(carry);
	$("#acFlag").text(auCarry);
	$("#zFlag").text(zero);
	$("#pFlag").text(parity);
	$("#sFlag").text(sign);
}

function log(texts){
	var old = $("#console").text();
	$("#console").text(old+"\n"+texts);
}

$(function(){
	initMem();
	updateMem();
	updateReg();
	updateFlag();
	console.log("Simulation started.");
	$("#compile").click(function(){
		PC = 0;
		memory.current = 0;
		var code = $("#code").val();
		var codeArray = code.split('\n');
		for(var i in codeArray){
			M = {value : H.value+L.value, number : memory.address[parseInt(H.value+L.value,16)]};
			memory.address[memory.current] = codeArray[i].toUpperCase();
			//console.log(memToHex(memory.current)+" "+memory.address[memory.current]);
			var instructions = memory.address[PC].split(' ');
			$("#checkCompile").css({
				color:'green'
			});
			$("#checkCompile").text("Success");
			if(instructions[1] === undefined){
				run(instructions[0],"NULL");
			}else{
				run(instructions[0],instructions[1]);
			}
			PC=memory.current;
		}
		
		for(var j = 0; j<memory.current; j++){
			log(memToHex(j)+" "+memory.address[j]);
		}
		updateMem();
		if(code.indexOf("HLT")==-1){
			$("#checkCompile").css({
				color:'red'
			});
			$("#checkCompile").text("Failed. Program executed but not halted!");
		}
	});
});