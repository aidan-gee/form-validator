# form-validator
A lightweight(<3kb minified) vanilla javascript module for validating html forms. Supports IE 8+.

# Demo

To quickly run the demo using gulp: 

1. clone the repository
2. use 'npm install'
3. run 'gulp'

# Types of validation

This modules uses the inputs 'name' attribute in order to do some basic validation. ALL inputs return invalid if they are empty. 

### names 

*name* - must contain only a-z characters and more than 1 letter

*email* - standard email validation 

*uk-postcode* - postcode validation for uk addresses

*uk-mobile* - uk mobile number in the form 07123456789 or +447123456789

# Methods

###validator.start(formId, elementsToValidate, invalidCallback)

formId (string) - The ID of the form to validate on submit

*optional* elementsToValidate (array) - list of inputs by name to validate

*optional* invalidCallback (function) - callback function to be called when form is invalid

This will attatch a submit event listener to the form with the specified ID. On submit the form will be validated and return a form object.
###Example:
---
```javascript
var demoForm = validator.start('demoForm', ['name','email'], function(){
  alert("error")
});
```
## Manual validation
If you dont want the validation to happen on submit you can handle this yourself with the following methods.  

###validator.validateForm(formId, elementsToValidate)

formId (string) - The ID of the form to validate on submit

*optional* elementsToValidate (array) - list of inputs by name to validate

Validates the form and returns a form object. 
###Example:
---
```javascript
var demoForm = validator.validateForm('demoForm', ['name','email']);
console.log(demoForm.valid)// true or false
```
###validator.validateInput(inputName)

inputId (string) - the id of the input to be validated

Validates the input and returns an input object. 
###Example:
---
```javascript
var input = validator.validateInput('id');
console.log(input.valid)// true or false

