var A = {value : decToHex(0), number: 0};
var B = {value : decToHex(0), number: 0};
var C = {value : decToHex(0), number: 0};
var D = {value : decToHex(0), number: 0};
var E = {value : decToHex(0), number: 0};
var H = {value : decToHex(0), number: 0};
var L = {value : decToHex(0), number: 0};

function updateReg(){
	if(A.number>255){
		A.number-=256;
		carry = 1;
	}
	if(B.number>255){
		B.number-=256;
		carry = 1;
	}
	if(C.number>255){
		C.number-=256;
		carry = 1;
	}
	if(D.number>255){
		D.number-=256;
		carry = 1;
	}
	if(E.number>255){
		E.number-=256;
		carry = 1;
	}
	if(H.number>255){
		H.number-=256;
		carry = 1;
	}
	if(L.number>255){
		L.number-=256;
		carry = 1;
	}
	A.value = decToHex(A.number);
	B.value = decToHex(B.number);
	C.value = decToHex(C.number);
	D.value = decToHex(D.number);
	E.value = decToHex(E.number);
	H.value = decToHex(H.number);
	L.value = decToHex(L.number);
	$("#regA").text("A = "+A.value.toUpperCase()+" H");
	$("#regB").text("B = "+B.value.toUpperCase()+" H");
	$("#regC").text("C = "+C.value.toUpperCase()+" H");
	$("#regD").text("D = "+D.value.toUpperCase()+" H");
	$("#regE").text("E = "+E.value.toUpperCase()+" H");
	$("#regH").text("H = "+H.value.toUpperCase()+" H");
	$("#regL").text("L = "+L.value.toUpperCase()+" H");
}

function decToHex(number){
	if (number < 0){
		number = 0xFF + number + 1;
	}
	var str = number.toString(16);
	if(number>255){
		str = str.substr(1);
	}
	if(number<16){
		return "0"+str;
	}else{
		return str;
	}
}