function run(instruction, argument){
	instruction = instruction.toUpperCase();
	argument = argument.toUpperCase();
	var argArray = argument.split(',');
	switch(instruction){
		//Data transfer instructions
		case "MOV":
		INCR = 1;
		log(argArray[0]+" <- "+argArray[1]);
		if(argArray[0]=="M"){
			memory.address[parseInt(H.value+L.value,16)] = RefToReg(argArray[1]).value;
		}else if(argArray[1]=="M"){
			RefToReg(argArray[0]).number = decToHex(memory.address[parseInt(H.value+L.value,16)]);
			RefToReg(argArray[0]).value = memory.address[parseInt(H.value+L.value,16)];
		}else{
			RefToReg(argArray[0]).value = RefToReg(argArray[1]).value;
			RefToReg(argArray[0]).number = RefToReg(argArray[1]).number;
		}
		break;
		case "MVI":
		INCR = 2;
		memory.address[memory.current+1] = argArray[1].substr(0,2);
		log(argArray[0]+" <- "+argArray[1]);
		RefToReg(argArray[0]).value = argArray[1].substr(0,2);
		RefToReg(argArray[0]).number = parseInt(argArray[1].substr(0,2),16);
		break;
		case "LXI":
		INCR = 3;
		memory.address[memory.current+1] = argArray[1].substr(2,2);
		memory.address[memory.current+2] = argArray[1].substr(0,2);
		if(argArray[0]=="B"){
			log("BC <- "+argArray[1]);
			B.number = parseInt(argArray[1].substr(0,2),16);
			C.number = parseInt(argArray[1].substr(2,2),16);
		}
		if(argArray[0]=="D"){
			log("DE <- "+argArray[1]);
			D.number = parseInt(argArray[1].substr(0,2),16);
			E.number = parseInt(argArray[1].substr(2,2),16);
		}
		if(argArray[0]=="H"){
			log("HL <- "+argArray[1]);
			H.number = parseInt(argArray[1].substr(0,2),16);
			L.number = parseInt(argArray[1].substr(2,2),16);
		}
		break;
		case "LDA":
		INCR = 3;
		memory.address[memory.current+1] = argArray[0].substr(2,2);
		memory.address[memory.current+2] = argArray[0].substr(0,2);
		var addr1 = parseInt(argArray[0].substr(0,4),16);
		A.number = parseInt(memory.address[addr1],16);
		log("A <- [ "+addr1+" ]");
		break;
		case "STA":
		INCR = 3;
		memory.address[memory.current+1] = argArray[0].substr(2,2);
		memory.address[memory.current+2] = argArray[0].substr(0,2);
		var addr2 = parseInt(argArray[0].substr(0,4),16);
		memory.address[addr2] = A.value;
		log("[ "+addr1+" ] <- A");
		break;
		case "XCHG":
		tempA = H.value;
		tempB = H.number;
		H.value = D.value;
		H.number = D.number;
		D.value = tempA;
		D.number = tempB;
		tempA = L.value;
		tempB = L.number;
		L.value = E.value;
		L.number = E.number;
		E.value = tempA;
		E.number = tempB;
		log("HL <-> DE");
		break;
		//Arithmetic instructions
		case "ADD":
		INCR = 1;
		log("A <- A + "+argArray[0]);
		A.number+=RefToReg(argArray[0]).number;
		break;
		case "ADI":
		INCR = 2;
		memory.address[memory.current+1] = argArray[0].substr(0,2);
		log("A <- A + "+argArray[0]);
		A.number+=parseInt(argArray[0].substr(0,2),16);
		break;
		case "ADC":
		INCR = 1;
		log("A <- A + "+argArray[0]+" + carry("+carry+")");
		A.number+=RefToReg(argArray[0]).number+carry;
		break;
		case "ACI":
		INCR = 2;
		memory.address[memory.current+1] = argArray[0].substr(0,2);
		log("A <- A + "+argArray[0]+" + carry("+carry+")");
		A.number+=parseInt(argArray[0].substr(0,2),16)+carry;
		break;
		case "SUB":
		INCR = 1;
		log("A <- A - "+argArray[0]);
		A.number-=RefToReg(argArray[0]).number;
		break;
		case "SUI":
		INCR = 2;
		memory.address[memory.current+1] = argArray[0].substr(0,2);
		log("A <- A - "+argArray[0]);
		A.number-=parseInt(argArray[0].substr(0,2),16);
		break;
		case "INR":
		INCR = 2;
		log(argArray[0] +"++");
		RefToReg(argArray[0]).number++;
		break;
		case "DCR":
		INCR = 2;
		log(argArray[0] +"--");
		RefToReg(argArray[0]).number--;
		break;
		case "INX":
		INCR = 3;
		if(argArray[0]=="B"){
			log("BC++");
			if(C.number == 255){
				B.number++;
			}
			C.number++;
		}
		if(argArray[0]=="D"){
			log("DE++");
			if(E.number == 255){
				D.number++;
			}
			E.number++;
		}
		if(argArray[0]=="H"){
			log("HL++");
			if(L.number == 255){
				H.number++;
			}
			L.number++;
		}
		break;
		case "DCX":
		INCR = 3;
		if(argArray[0]=="B"){
			log("BC--");
			if(C.number === 0){
				B.number--;
			}
			C.number--;
		}
		if(argArray[0]=="D"){
			log("DE++");
			if(E.number === 0){
				D.number--;
			}
			E.number--;
		}
		if(argArray[0]=="H"){
			log("HL++");
			if(L.number === 0){
				H.number--;
			}
			L.number--;
		}
		break;
		//Misc
		case "HLT":
		INCR = 1;
		break;
		//Else
		default:
		log("No instructions recognized!");
	}
	memory.current+=INCR;
	updateReg();
}
function RefToReg(str){
	switch(str){
		case 'A':
		return A;
		case 'B':
		return B;
		case 'C':
		return C;
		case 'D':
		return D;
		case 'E':
		return E;
		case 'H':
		return H;
		case 'L':
		return L;
	}
}