const budgetController = (function(){
    const x = 23
    const add = function(a) {
        return x + a
    }

    return {
        publicTest: function(b) {
            return add(b)
        }
    }
})();

const UIController = (function() {

})();


const controller = (function(budgetCtrl, UIctrl) {

    const ctrlAddItem = function() {
        //get the field input data
        //add item to the budget controller
        //add the new item to the ui
        //calculate the budget 
        //display budget
        console.log('works')
    }

   document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)
   
   document.addEventListener('keypress', function(e) {
        if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    })
    
})(budgetController, UIController);

