/*********
* Tester
*********/


// Place for some tests
module("Core.js tests", {
	buttonArray : [
			'<button id="id_C" class="c_calc_button" style="color: #bb0000">C</button>',
			'<button id="id_Power2" class="c_calc_button" style="color: #004ea5">x^2</button>',
			'<button id="id_Radic" class="c_calc_button" style="color: #004ea5">&radic;</button>',
			'<button id="id_Percent" class="c_calc_button" style="color: #004ea5">mod</button>',
			'<button id="id_7" class="c_calc_button">7</button>',
			'<button id="id_8" class="c_calc_button">8</button>',
			'<button id="id_9" class="c_calc_button">9</button>',
			'<button id="id_Divide" class="c_calc_button" style="color: #004ea5">/</button>',
			'<button id="id_4" class="c_calc_button">4</button>',
			'<button id="id_5" class="c_calc_button">5</button>',
			'<button id="id_6" class="c_calc_button">6</button>',
			'<button id="id_Multi" class="c_calc_button" style="color: #004ea5">*</button>',
			'<button id="id_1" class="c_calc_button">1</button>',
			'<button id="id_2" class="c_calc_button">2</button>',
			'<button id="id_3" class="c_calc_button">3</button>',
			'<button id="id_Subt" class="c_calc_button" style="color: #004ea5">-</button>',
			'<button id="id_0" class="c_calc_button">0</button>',
			'<button id="id_Comma" class="c_calc_button" style="color: #004ea5">,</button>',
			'<button id="id_Add" class="c_calc_button" style="color: #004ea5">+</button>',
			'<button id="id_Result" class="c_calc_button" style="color: #00a317">=</button>'
	],
	setup: function() {
		ok(true, "setup() has been launched");		
		$('body').after('<div id="test-panel-data" style="display:none;">'+this.buttonArray+'</div>');
	},
	teardown: function() {
		ok(true, "teardown() has been launched");
		$('#test-panel-data').remove();
	},
	
});

test("Init environment check", function() {
	ok(null != calculator , "calculator must be defined, otherwise tests do not have any sensd");
});


test("start() method assertions", function() {
	calculator.start();
	$(this.buttonArray).each(function(button) {
		var button = $(this+"");
		if ( 
				(null != (obj = document.getElementById(button.attr("id"))) ) &&
				(null != (events = jQuery._data(obj).events) ) &&
				(null != (clickEventArray = events.click))
			) 
		{
			ok(clickEventArray.length == 1, "We must have one and only one click event!");
		} else {
			ok(false, "Error occured - the giver buttonArray is not valid ");
		}
		ok(null != clickEventArray[0].handler, "determines if the button is already bound with the proper eventHandler");
	});
});

test("clickEventHandler() method assertions", function() {
	
	ok(false == calculator.clickEventHandler('<button></button>', calculator), "for empty id the clickEventHandler function must return false");
	buttonId1 = document.createElement('button');
	buttonId1.setAttribute("id","id_1");
	calculator.clickEventHandler(buttonId1, calculator);
	ok("1" == calculator.currentExpression, "after clicking 1, the calculator's current expression must be updated");
	
});

test("updateDisplay() method aasertions", function() {

});
test("getLastExpressionCharacter() method aasertions", function() {

});
test("calculate() method aasertions", function() {

});
test("clear() method aasertions", function() {

});
test("addExpression() method aasertions", function() {

});