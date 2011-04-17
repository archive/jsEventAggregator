describe("JsEventAggregator Specifications", function() {

    var queueHandler = new AsyncQueue(function(action){action();}); // this should be changed to a real stub

    describe("when a message is sent", function() {

        var aggregator;
        var numberOfCalls = 0;
        var someValue;

        var SomeMessage = function(someValue) {
            this.type = "SomeMessage";
            this.someValue = someValue;
        };

        var shouldBeCalled = function(message) {
            numberOfCalls++;
            someValue = message.someValue;
        };

        beforeEach(function() {
            aggregator = new JsEventAggregator(queueHandler);

            aggregator.iListenTo(SomeMessage, shouldBeCalled, this);
            aggregator.iListenTo(SomeMessage, shouldBeCalled, this);
        });

        it("all the defined listeners should receive it", function() {
            var message = new SomeMessage(100);
            aggregator.sendMessage(message);

            expect(numberOfCalls).toEqual(2);
        });

        it("the message value should not be lost", function() {
            var message = new SomeMessage(100);
            aggregator.sendMessage(message);

            expect(someValue).toEqual(100);
        });

    });

    describe("when a message is sent", function() {

        var aggregator;
        var mock = {};

        var SomeMessage = function() {
            this.type = "SomeMessage";
        };

        var SomeOtherMessage = function() {
            this.type = "SomeOtherMessage";
        };

        beforeEach(function() {
            mock.someFunction = jasmine.createSpy();

            aggregator = new JsEventAggregator(queueHandler);
            aggregator.iListenTo(SomeMessage, mock.someFunction, mock)
        });

        it("if there is no defined listeners, no one should get it", function() {
            var message = new SomeOtherMessage();
            aggregator.sendMessage(message);

            expect(mock.someFunction).not.toHaveBeenCalled();
        });

    });


});