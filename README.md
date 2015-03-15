# form-validator
A pure javascript module for validating html forms. 

# Methods

###Validator.start(formId, elementsToValidate, invalidCallback)

formId (string) - The ID of the form to validate on submit

elementsToValidate (array) - list of inputs by name to validate

invalidCallback (function) - callback function to be called when form is invalid

###Example:
---
```javascript
var demoForm = Validator.start('demoForm', ['name','email'], function(){
  alert("error")
});
```

