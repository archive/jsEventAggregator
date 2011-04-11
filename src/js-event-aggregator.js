var JsEventAggregator = function() {
  this.aggregator = {};
};

JsEventAggregator.prototype.iListenTo = function(message, action, self) {
  var messageType = new message().type;
  if(!this.aggregator[messageType]) {
    this.aggregator[messageType] = [];
  }
  this.aggregator[messageType].push({"action":action, "self":self});
};

JsEventAggregator.prototype.sendMessage = function(message) {
  var messageType = message.type;

  if(this.aggregator[messageType]) {
    for(var i=0, length = this.aggregator[messageType].length; i<length;i++){
        var listner = this.aggregator[messageType][i];
        listner.action.call(listner.self, message);  
    }
  }
};