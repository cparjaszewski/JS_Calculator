/***********************************
* Calculator - Test || Main JS file
***********************************/

// Vars
var bCommaLock = false;
var sCalculate = "0";


// Update display
function func_DisplayUpdate()
{
	$('[name=calc_result]').val(sCalculate);
};

// Get last char
function func_GetLastChar(vString)
{
	if(vString == "")
		return "0";
	else
		return vString.substr(vString.length - 1);
}

// Calculate
function func_DoMath()
{
	// Get last char from string
	var vLastChar = func_GetLastChar(sCalculate); 
	
	// If last symbol is math char, that means it's incomplete, ignore math then
	if(vLastChar == "+" || vLastChar == "-" || vLastChar == "*" || vLastChar == "/" || vLastChar == "%")
		return false;
	
	// Eval is not really safe, but AFAIK it's ok for that kind of usage
	sCalculate = (eval(sCalculate)).toString(); 
}

// Append to calculation string
function func_CalcAppend(vAdd)
{
	// Get last char from string
	var vLastChar = func_GetLastChar(sCalculate); 
	
	// Check vADD
	switch(vAdd)
	{
		// If NEW char is a digit
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			if(sCalculate == "0")
				sCalculate = "";
			sCalculate = sCalculate + vAdd;
		break;
		
		// If NEW char IS NOT a digit
		case "+":
		case "-":
		case "*":
		case "/":
		case "%":
			// Don't add char if there is only 0 digit
			if(sCalculate == "0")
				break;
			
			// If new char == last char, break it, we don't want to waste RES for ( X -> X ) replacement
			if(vLastChar == vAdd)
				break;
				
			// If last char is also a math char, then replace it with new one
			if(vLastChar == "+" || vLastChar == "-" || vLastChar == "*" || vLastChar == "/" || vLastChar == "%")
				sCalculate = sCalculate.substr(0, sCalculate.length - 1); // Delete last char in string
				
			// If last char is comma then add 0 before math symbol
			if(vLastChar == ".")
				vAdd = "0" + vAdd;

			sCalculate = sCalculate + vAdd;
			bCommaLock = false; // Another math char was passed, so dissable comma lock
		break;
		
		case ".":
			// Block comma after math symbol
			if(vLastChar == "+" || vLastChar == "-" || vLastChar == "*" || vLastChar == "/" || vLastChar == "%")
				break;
		
			// If comma lock is disabled
			if(bCommaLock == false)
			{
				sCalculate = sCalculate + vAdd;
				bCommaLock = true;
			}
		break;
	}

	func_DisplayUpdate();
	return true; // YAY !
}

// Clear
function func_Clear()
{
	sCalculate = "0";
	bCommaLock = false;
	func_DisplayUpdate();
}

// Button click handler
function func_ExecButtonAction(vBtnID)
{
	switch(vBtnID)
	{
		// Clear
		case "id_C":
			func_Clear();
		break;
		
		// Power of two
		case "id_Power2":
			func_DoMath();
			sCalculate = sCalculate * sCalculate;
			sCalculate = sCalculate.toString();
			func_DisplayUpdate();
		break;
		
		// nth root
		case "id_Radic":
			func_DoMath();
			sCalculate = Math.sqrt(sCalculate);
			sCalculate = sCalculate.toString();
			func_DisplayUpdate();
		break;
		
		// Percent
		case "id_Percent":
			func_CalcAppend("%");
		break;
		
		// Divide
		case "id_Divide":
			func_CalcAppend("/");
		break;
		
		// Multilate
		case "id_Multi":
			func_CalcAppend("*");
		break;
		
		// Subtract
		case "id_Subt":
			func_CalcAppend("-");
		break;
		
		// Comma
		case "id_Comma":
			func_CalcAppend(".");
		break;
		
		// Addition
		case "id_Add":
			func_CalcAppend("+");
		break;
		
		// Result
		case "id_Result":
			func_DoMath();
			func_DisplayUpdate();
		break;
		
		// Digits
		case "id_0":
		case "id_1":
		case "id_2":
		case "id_3":
		case "id_4":
		case "id_5":
		case "id_6":
		case "id_7":
		case "id_8":
		case "id_9":
			vBtnID = vBtnID.replace("id_", ""); // Let's just cut 'id_' from string...
			func_CalcAppend(vBtnID);
		break;
	}
}


// Initialize
function func_ExecMain()
{
	// Pass click event to click handler
	$("button").click(function()
	{
		func_ExecButtonAction(this.id);
	});
	
	func_Clear(); // Reset calc

	return true;
}
