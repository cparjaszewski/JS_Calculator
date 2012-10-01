/***********************************
* Calculator - Test || Main JS file
***********************************/

/**
 * This calculator adds, substracts, multiplies, divides and takes the square root in pure JS
 */ 
calculator = {
	// Flag to protect before double usage of comma ',' character
	commaLock : false,
	
	// The main calculator expression:
	currentExpression : "0",
	
	// The last typed operand:
	lastOperand : null,
	
	/**
	* Finds the main calculator's <input> that displays the current calculator state:
	*/
	updateDisplay : function() {
		$('input[name=calc_result]').val(this.currentExpression)
	},
	
	/** 
	 * Gets the last character of the current calculator expression.
	 * If the currect expression if empty, it returns 0.
	 * 
	 */
	getLastExpressionCharacter : function() {
		if (this.currentExpression == '') {
			return 0;
		} else {
			return this.currentExpression.charAt(this.currentExpression.length - 1);
		}
	},
	
	/** 
	 * Performs the calculation based on the current expression
	 */
	calculate : function() {
		// We are waiting for the first operand to be entered
		if (this.lastOperand == null) {
			return false;
		}
	
		// Get last char from string
		var lastCharacter = this.getLastExpressionCharacter();
		
		// If the last typed characted was a operand - we are still waiting for some number
		if (lastCharacter == this.lastOperand ) {
			return false; 
		} 
		
		// The calculator expression evaluation:
		result = eval(this.currentExpression)
		
		// The answer
		return result.toString();

	},
	
	/** 
	 * Clears the calculator memory and sets 0 to the display
	 */ 
	clear: function() {
		this.currentExpression = "0";
		this.commaLock = false;
		this.updateDisplay();
	}, 
	
	/** 
	 * Starts the calculator
	 */
	start : function() {
		// Self object to remember the calculator reference for event handlers
		var _this = this;
		
		$("button").unbind('click');
		
		// Pass click event to click handler
		$("button").click(function() {
			_this.clickEventHandler(this, _this);
		});
	
		this.clear(); // Reset calc

		return true;
	},
	
	/**
	 * Event handler for the 'click' event
	 *
	 * param button - the object that is calling the event
	 */
	clickEventHandler : function(button, calc) {
		// Reads the caller id attribute
		var callerId = button.id;
		
		// The id attribute has nto been defined
		if (callerId == null) {
			return false;	
		}
		
		var expr = calc.currentExpression;
		
		switch(callerId)
		{
			// Clear
			case "id_C":
				calc.clear();
			break;
			
			// Power of two
			case "id_Power2":
				calc.calculate();
				expr *= expr;
				expr = expr.toString();
				calc.updateDisplay();
			break;
			
			// nth root
			case "id_Radic":
				calculator.calculate();
				expr = Math.sqrt(expr);
				expr = expr.toString();
				calc.updateDisplay();
			break;
			
			// Percent
			case "id_Percent":
				calc.addExpression("%");
			break;
			
			// Divide
			case "id_Divide":
				calc.addExpression("/");
			break;
			
			// Multilate
			case "id_Multi":
				calc.addExpression("*");
			break;
			
			// Subtract
			case "id_Subt":
				calc.addExpression("-");
			break;
			
			// Comma
			case "id_Comma":
				calc.addExpression(".");
			break;
			
			// Addition
			case "id_Add":
				calc.addExpression("+");
			break;
			
			// Result
			case "id_Result":
				calculator.calculate();
				calculator.updateDisplay();
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
				buttonDigit = callerId.replace("id_", ""); // Let's just cut 'id_' from string...
				calc.addExpression(buttonDigit);
				expr = calc.currentExpression;
			break;
		}
		
		calc.currentExpression = expr;
	},
	
	/**
	 * Appends the clicked expression to the main calculator expression
	 *
	 * param expression - expression to add	 
	 */
	addExpression : function(expression)  {
		// Get last char from string
		var vLastChar = this.getLastExpressionCharacter();
		
		// Check vADD
		switch(expression)
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
				if(this.currentExpression == "0") {
					this.currentExpression = "";
				}
				this.currentExpression = this.currentExpression + expression;
			break;
			
			// If NEW char IS NOT a digit
			case "+":
			case "-":
			case "*":
			case "/":
			case "%":
				// Don't add char if there is only 0 digit
				if(this.currentExpression == "0")
					break;
				
				// If new char == last char, break it, we don't want to waste RES for ( X -> X ) replacement
				if(vLastChar == expression)
					break;
					
				// If last char is also a math char, then replace it with new one
				if(vLastChar == "+" || vLastChar == "-" || vLastChar == "*" || vLastChar == "/" || vLastChar == "%")
					this.currentExpression = this.currentExpression.substr(0, this.currentExpression.length - 1); // Delete last char in string
					
				// If last char is comma then add 0 before math symbol
				if(vLastChar == ".")
					expression = "0" + expression;

				this.currentExpression = this.currentExpression + expression;
				this.commaLock = false; // Another math char was passed, so dissable comma lock
			break;
			
			case ".":
				// Blocks comma after math symbol
				if(vLastChar == "+" || vLastChar == "-" || vLastChar == "*" || vLastChar == "/" || vLastChar == "%")
					break;
			
				// If comma lock is disabled
				if(bCommaLock == false)
				{
					this.currentExpression = this.currentExpression + expression;
					this.commaLock = true;
				}
			break;
		}

		// Finally the display is being updated
		this.updateDisplay();
		
		return true; // YAY !
	},
	
	
};

