# form-validator
A pure javascript module for validating html forms. 

# Demo

To quickly run the demo using gulp: 

1. clone the repository
2. use 'npm install'
3. run 'gulp'

# Methods

###Validator.start(formId, elementsToValidate, invalidCallback)

formId (string) - The ID of the form to validate on submit

elementsToValidate (array) - list of inputs by name to validate

invalidCallback (function) - callback function to be called when form is invalid

Will attatch a submit event listener to the form with the specified ID. On submit the form will be validated and return a form object.
###Example:
---
```javascript
var demoForm = Validator.start('demoForm', ['name','email'], function(){
  alert("error")
});
```
# Single methods
If you want to handle the validation yourself you can use the single methods manually. You can use the returned objects methods to do further validation.  

###Validator.validateForm(formId, elementsToValidate)

formId (string) - The ID of the form to validate on submit

elementsToValidate (array) - list of inputs by name to validate

Validates the form and returns a form object. 
###Example:
---
```javascript
var demoForm = Validator.validateForm('demoForm', ['name','email']);
console.log(demoForm.valid)// true or false
```
###Validator.validateInput(inputName)

inputName (string) - the name of the input to be validated

Validates the input and returns an input object. 
###Example:
---
```javascript
var input = Validator.validateInput('name');
console.log(input.valid)// true or false

