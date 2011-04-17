var TheMessage = function(){
    this.type = "TheMessage"; // the type of the message, this will be used for finding listeners
    this.someValueToSendToTheListners = "";
};

// Example:
var CountryHasChangedMessage = function(){
    this.type = "CountryHasChangedMessage";
    this.oldValue = 1;
    this.newValue = 2;
};