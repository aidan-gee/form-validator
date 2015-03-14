/*  Validator Module for html forms
*
* API - Validator.activate((string)idOfForm, (array)nameOfElements));
*
*		Validator.validatePostcode(nameOfInput or string(postcode))
*/

var Validator = (function(Validator){

    Validator.validateEmail = function(emailAddress){
        var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
         return pattern.test(emailAddress);
    }

    Validator.isEmpty = function(element){
        var value = element[0].value;
        if (typeof value == 'undefined' || value == "") return true;

        return false;
    }

	Validator.validateInput = function(item){
		console.log('item', item.el);

        var element = item.el[0];

        // Before checking specific cases check its not empty
        if(this.isEmpty(item.el)){
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
    }//validateForm

	Validator.validateForm = function(items){
		var inputs = arguments;
            // no arguments supplied to validate so return true
            if (items.length < 1) return true;

            for (var i = items.length - 1; i >= 0; i--) {
                var input = this.validateInput(items[i]);
                console.log(input.valid);
                // Not a valid input
            	if(!input.valid){
                    return false;
                }
            };
            
            return items;
    }//validateForm

	Validator.start = function(formId, elementsToValidate){
			var that = this;
			//get form an attatch submit handler
            var formEl = document.getElementById(formId);
            var items = [];

            // Get element nodes to be validated and store in items
        	for (var i = elementsToValidate.length - 1; i >= 0; i--) {
        		var el = document.getElementsByName(elementsToValidate[i]);
        		// check if multiple items with the same name
        		if (el.constructor === Array){
        			for (var x = el.length - 1; x >= 0; x--) {
        				var item = {
		        			el: el[x],
		        			valid: false,
                            setInvalid: function(){
                                this.valid = false;
                                console.log("set this element false", this.el[0]);
                            },
                            setValid: function(){
                                this.valid = true;
                            }
		        		}
		        		items.push(item);
        			}
        		}

        		var item = {
        			el: document.getElementsByName(elementsToValidate[i]),
		        	valid: false,
                    setInvalid: function(){
                        this.valid = false;
                        console.log("set this element false", this.el[0]);
                    },
                    setValid: function(){
                        this.valid = true;
                    }
        		}

        		items.push(item);
        	};

        	formEl.addEventListener("submit", function(e){
                e.preventDefault();
                if (that.validateForm(items)){
                    console.log(e);
                }
            });
            
            var form = {

            };

            Object.defineProperties(form, {
            	items : {
            		value: items
            	}
            })

            return form;
    }//validateForm

	return Validator;   
})(Validator || {})//Validator Object


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
//     this.validateInput = function(input, element){
//         // input - name of the element as an identifier for what type of validation is needed
//         // element - jquery element
//         if(this.isValidInput(element)){
//             //get current value
//             var value = element.val();

//              switch(input){
//                 case "firstName":
//                     if(!this.isValidName(value)){
//                        this.setInvalid(element, "First Name");
//                     }else this.setValid(element);
//                     break
//                 case "lastName":
//                     if(!this.isValidName(value)){
//                        this.setInvalid(element, "Last Name");
//                     }else this.setValid(element);
//                     break
//                 case "email":
//                     if(!this.isValidEmailAddress(value)){
//                          this.setInvalid(element, input);
//                     }else this.setValid(element);
//                     break
//                 case "postcode":
//                     // If Uk is selected use uk postcode validation
//                     // else do standard empty validation
//                     var countrySelected = $('[name="country"]');
//                     if(countrySelected.length && countrySelected.val() == 'United Kingdom|gb'){
//                         if(!this.isValidUKPostcode(value)){
//                              this.setInvalid(element, input);
//                         }else this.setValid(element);
//                     }//countrySelectedUK
//                     else{
//                         if(this.isEmptyOrUndefined(value)){

//                             this.setInvalid(element, input);
//                         }else this.setValid(element);
//                     }
//                     break
//                 case "password":
//                     if(!this.isValidPassword(value)){
//                          this.setInvalid(element, input);
//                     }else this.setValid(element);
//                     break
//                 default:
//                     //if not one of the cases above default to check it exists
//                     if(this.isEmptyOrUndefined(value)){
//                          this.setInvalid(element, input);
//                     }else this.setValid(element);
//                     break

//             }//switch
//         }//if
//         else{
//             console.log('invalid input type was supplied', input);
//         }
//     }
//     // GENERAL METHOD FOR VALIDATING FORMS
//     // pass in inputs by name to be validated
//     this.validateForm = function(){
//             var that = this;
//             var inputs = arguments;
//             // no arguments supplied to validate so return true
//             if (inputs.length < 1) return true;
//                 //loop through all args
//                 for (var i = 0; i < inputs.length; i++) {
//                     // Get element
//                     var element = $('[name="'+inputs[i]+'"]');

//                     if (typeof element == 'undefined' || !element.length){
//                         // doesnt exist
//                         console.log('Incorrect arguement supplied to validator.');
//                         return false;
//                     }

//                     // Allow multiple inputs with the same name to be validated
//                     // or handled so they are not validated
//                     if(element.length > 1){
//                         //check each element in the array
//                         element.each(function( index ) {
//                             //validate each input
//                             that.validateInput(inputs[i], $(this));
//                         });

//                     }
//                     else{
//                        this.validateInput(inputs[i], element);
//                     }

//                 }//for arguements
//             //if the form is not valid show a notifier message
//             if (!valid){
//                 var notifier = new Notifier();
//                 notifier.showPopup("Invalid Formz", this.buildErrorMessage(), "OK");
//             }
//             return valid;
//     },//validateForm
//     this.setInvalid = function(element, name){
//         valid = false;
//         errors.push(name);
//         element.addClass('invalid');
//     },
//     this.setValid = function(element){
//         element.removeClass('invalid');
//     },
//     this.isValidInput = function(element){
//         try {
//             element.is("input, textarea, select")
//         }
//         catch(err) {
//             if (typeof err !== 'undefined'){
//                 console.log(element + "caused an error");
//                 return false;
//             }
//         }
//         if(element.is("input, textarea, select")){
//             return true;
//         }
//         // Cannot validate
//         console.log('Cannot validate this type of input', element);
//         return false;
//     },
//     this.buildErrorMessage = function(){
//         var message ="";
//         for (var i = errors.length - 1; i >= 0; i--) {
//                 message+= "Invalid field " + errors[i].capitalize() + "</br>";
//         };
//         //clear errors
//         errors =[];
//         return message;
//     }