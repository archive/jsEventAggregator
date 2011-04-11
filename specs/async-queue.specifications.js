describe("AsyncQueue Specifications", function(){

    describe("when queueing two actions", function(){
    
        var queue;
        var firstActionWasCalled = false;
        var secondActionWasCalled = false;
        var callOrder = [];
    
        beforeEach(function(){
            setTimeout = function(action){action();}
            
            queue = new AsyncQueue(function(action){action();});
            queue.add(function(){ 
                firstActionWasCalled = true;
                callOrder.push("firstAction"); 
            });
            queue.add(function(){ 
                secondActionWasCalled = true;
                callOrder.push("secondAction"); 
            });  
        });
        
        it("the first action should be called when processing the queue", function(){
            queue.run();            
            
            expect(firstActionWasCalled).toBeTruthy(); 
        });
        
        it("the first action should be called when processing the queue", function(){
            queue.run();            
                        
            expect(secondActionWasCalled).toBeTruthy();
        });
        
        it("the action should be called in the same order as added", function(){
            expect(callOrder[0]).toEqual("firstAction");
            expect(callOrder[1]).toEqual("secondAction");
        });
        
    });
    
});