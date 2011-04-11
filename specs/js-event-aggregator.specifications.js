describe("JsEventAggregator Specifications", function(){

    describe("when a message is sent", function(){
    
        var aggregator;
        var numberOfCalls = 0;
        
        var CountryHasChangedMessage = function(_countryId){
            this.type = "CountryHasChangedMessage";
            this.countryId = _countryId;            
        };
        
        var shouldBeCalled = function(message){ 
            numberOfCalls++;
            countryIdFromSentMessage = message.countryId; 
        };        
    
        beforeEach(function(){
            aggregator = new JsEventAggregator();
            
            aggregator.iListenTo(CountryHasChangedMessage, shouldBeCalled, this);
            aggregator.iListenTo(CountryHasChangedMessage, shouldBeCalled, this);              
        });
        
        it("all the defined listeners should receive it", function(){
            var message = new CountryHasChangedMessage(100);
            aggregator.sendMessage(message);
                        
            expect(numberOfCalls).toEqual(2); 
        });
        
        it("the message value should not be lost", function(){
            var message = new CountryHasChangedMessage(100);
            aggregator.sendMessage(message);
                        
            expect(countryIdFromSentMessage).toEqual(100); 
        });
        
    });
    
});