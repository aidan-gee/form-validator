/*  Validator Module for html forms
*
* API - Validator.start((string)idOfForm, (array)nameOfElements));
*
*		Validator.validatePostcode(nameOfInput or string(postcode))
*/

var Validator = (function(Validator){

    /*  Pass in a string 
    *   Test the string again a regular expression to verify it is in correct email fomat
    *   Returns true or false
    */
    Validator.validateEmail = function(emailAddress){
        var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
         return pattern.test(emailAddress);
    }

    /*  Pass in an input element object 
    *   Will return false if its value is empty
    */
    var isEmpty = function(element){
        var value = element[0].value;
        if (typeof value == 'undefined' || value == "") return true;

        return false;
    }

    /*  Pass in an item object 
    *   Will take the items element and validate it based on the elements name / type
    *   returns the item object 
    */
	var validateInput = function(item){

        var element = item.el[0];

        // Before checking specific cases check its not empty
        if(isEmpty(item.el)){
            item.setInvalid();
            return item;
        }
        else{
            item.setValid();
        }

		switch(element.type){
           
        }//switch

        switch(element.name){
            case "postcode":
            	//
        		break;
            case "email":
                console.log(element)
                if(!this.validateEmail(element.value)){
                    item.setInvalid();
                }
                else{
                    item.setValid();
                }
                break;
        }//switch
          
        return item;
    }//validateInput

    /*  Pass in an array of item objects
    *   Will validate each item in the array 
    *   returns the item object or false if something is not valid 
    */
	Validator.validateForm = function(form){

        var items = form.items;
        // no arguments supplied to validate so return true
        if (items.length < 1) return true;

        for (var i = items.length - 1; i >= 0; i--) {
            var input = validateInput(items[i]);
            console.log(input.valid);
            // Not a valid input
        	if(!input.valid){
                form.valid = false;
            }
        };
        
        return form;
    }//validateForm

    /*  (string)Id of the form to validate and (array) of input names to validate
    *   Validates the form on submit
    *   returns the form object
    */
	Validator.start = function(formId, elementsToValidate){
			var that = this;
			//get form an attatch submit handler
            var formEl = document.getElementById(formId);
            var items = [];

            for (var i = elementsToValidate.length - 1; i >= 0; i--) {
                var el = document.getElementsByName(elementsToValidate[i]);

                var item = createItem(elementsToValidate[i], el);

                console.log("item after", item);
            	items.push(item);
            }
            
            var form = {};

            Object.defineProperties(form, {
            	items : {
            		value: items
            	},
                valid: {
                    value: false,
                    writable: true
                } 
            });

            console.log(form);

            formEl.addEventListener("submit", function(e){
                e.preventDefault();
                console.log("form", form);
                var validatedForm = that.validateForm(form);
                if (validatedForm.valid){
                    console.log(e);
                }
            });

            return form;
    }//validate.start


    /*  
    *   Item factory function
    */
    var createItem = function(name, element){
        var item = {
            setInvalid : function(){
                this.valid = false;
                console.log("set this element false", element);
            },
            setValid : function(){
                this.valid = true;
            } 
        };

        Object.defineProperties(item, {
            name: {
                value: name
            },
            el: {
                value: element
            },
            valid: {
                value:false,
                writable: true
            }
        });

        return item;
    }

	return Validator;   
})(Validator || {})//Validator Module


// var valid = true;
//     var errors = [];
//     this.isValidEmailAddress = function(emailAddress) {
//         var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
//         return pattern.test(emailAddress);
//     },
//     this.isValidPassword = function(password) {
//         var pattern = new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,20}$/);
//         return pattern.test(password);
//     },
//     this.isValidName = function(name) {
//         var pattern = new RegExp(/^[A-Za-z ]+$/);
//         return pattern.test(name);
//     },
//     this.isValidUKPostcode = function(postcode) {
//         var pattern = new RegExp(/^([a-zA-Z]){1}([0-9][0-9]|[0-9]|[a-zA-Z][0-9][a-zA-Z]|[a-zA-Z][0-9][0-9]|[a-zA-Z][0-9]){1}([ ])*([0-9][a-zA-z][a-zA-z]){1}$/);
//         return pattern.test(postcode);
//     },
//     this.isEmptyOrUndefined = function(input){
//         if (typeof input == 'undefined' || input == "") return true;
//         return false;
//     },
