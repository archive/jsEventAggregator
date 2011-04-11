var AsyncQueue = function(ownSetTimeout) {
    this._queue = [];
    this._sleepTime = 25;
    setTimeout = ownSetTimeout || setTimeout;
};

AsyncQueue.prototype.add = function(action, target) {
    this._queue.push({
                "action": action,
                "target": target
            });
};

AsyncQueue.prototype.run = function() {
    var queue = this._queue;
    var sleepTime = this._sleepTime;
    setTimeout(function xxx() {
        if (queue.length) {
            var item = queue.shift();
            item.action.call(item.target);
            setTimeout(function() {
                xxx();
            }, sleepTime);
        }
    }, sleepTime);
};

AsyncQueue.prototype.clear = function() {
    this._queue = [];
};