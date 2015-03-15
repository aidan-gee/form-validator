/*  Validator Module for html forms
*
* API - Validator.start((string)idOfForm, (array)nameOfElements));
*
*		Validator.validateInput((string)nameOfInput);

        Validator.validateForm((string)formId, (array)nameOfElements);
*
* Copyright 2015 by Aidan Gee
*
* Web: http://aidangee.co.uk
* Email: aidangeewd@gmail.com
*
*/

var Validator = (function(Validator){

    /*  Pass in a string 
    *   Test the string again a regular expression to verify it is in correct email fomat
    *   Returns true or false
    */
    var validateEmail = function(emailAddress){
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
        else item.setValid();

		switch(element.type){
           
        }//switch

        switch(element.name){
            case "postcode":
            	//
        		break;
            case "email":
                if(!validateEmail(element.value)){
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
	var validateForm = function(form){

        var items = form.items;
        var valid = true;
    
        // no arguments supplied to validate so return true
        if (items.length < 1) return true;

        for (var i = items.length - 1; i >= 0; i--) {
            var input = validateInput(items[i]);
            // Not a valid input
        	if(!input.valid){
                valid = false
            }
        };

        form.valid = valid;
        
        return form;
    }//validateForm

    Validator.validateInput = function(elementName){
        var el = document.getElementsByName(elementName);
        var item = createItem(elementName, el);
    
        return validateInput(item);
    }

    Validator.validateForm = function(formId, elementsToValidate){
        var form = createForm(elementsToValidate);        
        var validatedForm = validateForm(form);

        return validatedForm;
    }

    /*  (string)Id of the form to validate and (array) of input names to validate
    *   Validates the form on submit
    *   returns the form object
    */
	Validator.start = function(formId, elementsToValidate, errorCallback){
			var that = this;
			//get form an attatch submit handler
            var formEl = document.getElementById(formId);
            
            var form = createForm(elementsToValidate);

            formEl.addEventListener("submit", function(e){
                var validatedForm = validateForm(form);
                if (validatedForm.valid){
                    return true;
                }else {
                    e.preventDefault();
                    if (typeof(errorCallback) == "function" ){
                        errorCallback();
                    }
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
                if (this.el[0].className.indexOf("invalid") == -1){
                    this.el[0].className += 'invalid';
                }
            },
            setValid : function(){
                this.valid = true;
                this.el[0].className = this.el[0].className .replace("invalid", "");
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

    /*  
    *   Form factory function
    */
    var createForm = function(elementsToValidate){
        var items = [];

        for (var i = elementsToValidate.length - 1; i >= 0; i--) {
            var el = document.getElementsByName(elementsToValidate[i]);
            var item = createItem(elementsToValidate[i], el);

            items.push(item);
        }
        var form = {};

        Object.defineProperties(form, {
            items : {
                value: items
            },
            valid: {
                value: true,
                writable: true
            } 
        });

        return form;
    }

	return Validator;   
})(Validator || {})//Validator Module

