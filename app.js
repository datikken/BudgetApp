const budgetController = (function(){

    Expense = function(id, description, value) {
        this.id = id;
        this.description = description
        this.value = value
    }

     Income = function(id, description, value) {
        this.id = id;
        this.description = description
        this.value = value
    }

    const data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        }
    }
    return {
        addItem: function(type, des, val) {
            var newItem, ID
            //create new id
            if(data.allItems[type].length > 0) {
               ID = data.allItems[type][data.allItems[type].length - 1].id + 1
            } else {
                ID = 0
            }
            //create new item based on
            if(type === 'exp') {
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }
            //push it into our data
            data.allItems[type].push(newItem)
            //return the new elem
            return newItem;
        },
        testing: function() {
            console.log(data)
        }

    }

})();

const UIController = (function() {
    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }           
        },
        getDOMstrings: function() {
            return DOMstrings
        },
        addListItem: function(obj, type) {  
            var html, newHtml, element

            if(type === 'inc'){
            //create html string with placeholder
            element = DOMstrings.incomeContainer
            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if(type === 'exp') {
            element = DOMstrings.expensesContainer
            //insert the html to the dom
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }
            newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', obj.value)
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
      }
    }
})();

const controller = (function(budgetCtrl, UIctrl) {
    const setupEventListeners = function() {
        const DOM = UIController.getDOMstrings()

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)
        document.addEventListener('keypress', function(e) {
             if(event.keyCode === 13 || event.which === 13) {
                 ctrlAddItem();
             }
         })
    }

    const ctrlAddItem = function() {
        var input, newItem
        //get the field input data
        input = UIController.getInput()
        console.log(input)
        //add item to the budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value)
        //add the new item to the ui
        UIController.addListItem(newItem, input.type)
        //calculate the budget 
        //display budget
    }
    return {
        init: function() {
            console.log('Application has started')
            setupEventListeners()
        }
    }
})(budgetController, UIController);

controller.init()