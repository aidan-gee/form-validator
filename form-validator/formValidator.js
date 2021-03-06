/*  Validator Module for html forms
*
* API - Validator.start((string)idOfForm, (array)nameOfElements));
*
*		Validator.validateInput((string)nameOfInput);
*
*       Validator.validateForm((string)formId, (array)nameOfElements);
*
* Copyright 2015 by Aidan Gee
* Free to use as you like
*
* Web: http://aidangee.co.uk
* Email: aidangeewd@gmail.com
*
*/

var validator = (function(validator){

    /*  Pass in a string 
    *   Test the string again a regular expression to verify it is in correct email format
    *   Returns true or false
    */
    var validateEmail = function(emailAddress){
        var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
         return pattern.test(emailAddress);
    }

    /*  Pass in a string 
    *   Test the string again a regular expression to verify it is in correct UK postcode format
    *   Returns true or false
    */
    var validateUkPostcode = function(postcode) {
        var pattern = new RegExp(/^([a-zA-Z]){1}([0-9][0-9]|[0-9]|[a-zA-Z][0-9][a-zA-Z]|[a-zA-Z][0-9][0-9]|[a-zA-Z][0-9]){1}([ ])*([0-9][a-zA-z][a-zA-z]){1}$/);
        return pattern.test(postcode);
    }

    /*  Pass in an input element object 
    *   Will return false if its value is empty
    */
    var isEmpty = function(element){
        if (element.hasOwnProperty('value')){
            var value = element.value;
            if (typeof value == 'undefined' || value == "") return true;
        }
        return false;
    }

    /*  Pass in a string 
    *   Test the string again a regular expression to verify it is a-z chars
    *   Returns true or false
    */
    var validateName = function(name) {
        var pattern = new RegExp(/^[A-Za-z ]+$/);
        return pattern.test(name);
    }

    /*  Pass in an item object 
    *   Will take the items element and validate it based on the elements name / type
    *   returns the item object 
    */
	var validateInput = function(item){

        var element = item.el;

        // Before checking specific cases check its not empty
        if(isEmpty(item.el)){
            item.setInvalid();
            return item;
        }
        else item.setValid();

        switch(element.name){
            case "first-name":
            case "last-name":
            case "name":
                 if(!validateName(element.value)){
                    item.setInvalid();
                }
                else item.setValid();
                break;
            case "uk-postcode":
            	 if(!validateUkPostcode(element.value)){
                    item.setInvalid();
                }
                else item.setValid();
        		break;
            case "email":
                if(!validateEmail(element.value)){
                    item.setInvalid();
                }
                else item.setValid();
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

    function walkTheDOM(node, func) {
        func(node);
        node = node.firstChild;
        while (node) {
            walkTheDOM(node, func);
            node = node.nextSibling;
        }
    }

    /*  
    *   Item factory function
    */
    var createItem = function(name, element){
        var item = {
            setInvalid : function(){
                this.valid = false;
                if (this.el.className.indexOf("invalid") == -1){
                    this.el.className += ' invalid';
                }
            },
            setValid : function(){
                this.valid = true;
                this.el.className = this.el.className .replace("invalid", "");
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
                value:true,
                writable: true
            }
        });

        return item;
    }

    /*  
    *   Form factory function
    */
    var createForm = function(elementsToValidate, formElement){
        var items = [];
        if (elementsToValidate.constructor === Array && elementsToValidate.length > 0){
            for (var i = elementsToValidate.length - 1; i >= 0; i--) {
                // get all inputs in the form
                // loop through inputs and store the matching ones
                walkTheDOM(formElement,function(node){
                    if (node.name == elementsToValidate[i] && (node.tagName == 'SELECT' || node.tagName == 'INPUT')){
                        var item = createItem(elementsToValidate[i], node);   
                        items.push(item); 
                    }
                });
            }
        }
        else{
            walkTheDOM(formElement,function(node){
                if (node.tagName == 'SELECT' || node.tagName == 'INPUT'){
                    var item = createItem(elementsToValidate[i], node);   
                    items.push(item); 
                }
            });
        }

        var form = {
            validateForm: function(){
                validateForm(this);
            }, 
            validateInput: function(name){
                this.items.forEach(function(item, index){
                    if(item.el.name == name){
                        item = validateInput(item);
                    }
                });
            },
            getInvalid: function(){
                var errors = [];
                for (var i = 0; i < this.items.length; i++) {
                    // if not a valid Item 
                    if(!this.items[i].valid){
                        errors.push(items[i]);
                    }
                }
                return errors;
            } 
        };

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

    // Allows the validation of a single input by ID
    validator.validateInput = function(elementId){
        var el, name;
        el = document.getElementById(elementId);
        // if element has a name set it
        (typeof el.name !== 'undefined') ? name = el.name : name = undefined;
        var item = createItem(name, el);
    
        return validateInput(item);
    }//validateInput

    // Validate a form 
    // pass in the id of the form and an array of names(strings) as identifiers
    // of which elements of the form to validate
    validator.validateForm = function(formId, elementsToValidate){
        var formEl = document.getElementById(formId);
        var form = createForm(elementsToValidate, formEl);        

        return validateForm(form);
    }//validateForm

    //  (string)Id of the form to validate and (array) of input names to validate
    //  Validates the form on submit
    //  returns the form object
    validator.start = function(formId, elementsToValidate, errorCallback){
            var that = this;
            //get form an attatch submit handler
            var formEl = document.getElementById(formId);
            
            var form = createForm(elementsToValidate, formEl);

            formEl.addEventListener("submit", function(e){
                var validatedForm = validateForm(form);
                if (validatedForm.valid){
                    return true;
                }else {
                    e.preventDefault();
                    if (typeof errorCallback == "function" ){
                        errorCallback(validatedForm);
                    }
                }
            });

            return form;
    }//validate.start

	return validator;   
})(validator || {})//Validator Module

