var JsEventAggregator = function(queueHandler) {
    this._queueHandler = queueHandler || new AsyncQueue();
    this._aggregator = {};
};

JsEventAggregator.prototype.iListenTo = function(message, action, self) {
    var messageType = new message().type;
    if (!this._aggregator[messageType]) {
        this._aggregator[messageType] = [];
    }
    this._aggregator[messageType].push({"action":action, "self":self});
};

JsEventAggregator.prototype.sendMessage = function(message) {
    var messageType = message.type;

    if (this._aggregator[messageType]) {
        for (var i = 0, length = this._aggregator[messageType].length; i < length; i++) {
            var listner = this._aggregator[messageType][i];
            listner.action.call(listner.self, message);
        }
    }
};