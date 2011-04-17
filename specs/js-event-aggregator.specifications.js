describe("JsEventAggregator Specifications", function() {

    var queueHandler = new AsyncQueue(function(action){action();}); // this should be changed to a real stub

    describe("when a message is sent", function() {

        var aggregator;
        var firstMethodToCall;
        var secondMethodToCall;

        var SomeMessage = function(someValue) {
            this.type = "SomeMessage";
            this.someValue = someValue;
        };

        beforeEach(function() {
            firstMethodToCall = jasmine.createSpy("first");
            secondMethodToCall = jasmine.createSpy("second");

            aggregator = new JsEventAggregator(queueHandler);
            aggregator.iListenTo(SomeMessage, firstMethodToCall, this);
            aggregator.iListenTo(SomeMessage, secondMethodToCall, this);
        });

        it("all the defined listeners should receive it", function() {
            var message = new SomeMessage(100);
            aggregator.sendMessage(message);

            expect(firstMethodToCall).toHaveBeenCalled()
            expect(secondMethodToCall).toHaveBeenCalled()
        });

        it("the message value should not be lost", function() {
            var message = new SomeMessage(100);
            aggregator.sendMessage(message);

            expect(firstMethodToCall).toHaveBeenCalledWith(message);
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