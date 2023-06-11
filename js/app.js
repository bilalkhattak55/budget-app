class Budget {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  //submit budget method;
  submitBudgetForm() {
    // console.log('bilalll')
    const value = this.budgetInput.value;
    if(value === '' || value < 0) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative!</p>`;
      const newThis = this;
      setTimeout(function() {
         newThis.budgetFeedback.classList.remove('showItem')
      }, 3000)
    }else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
    }
  }


  showBalance() {
    const expense = this.totalExpese();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;
    if(total < 0){
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    }else if (total > 0 ) {
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    }else if (total === 0 ) {
      this.balance.classList.remove('showRed', 'showGreen');
      this.balance.classList.add('showBlack');
    }
    
  }


  //submit expense form
  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    // console.log(expenseValue, amountValue)
    if(expenseValue === '' || amountValue === '' || amountValue < 0 ){
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
      const newThis = this;
      setTimeout(function() {
        newThis.expenseFeedback.classList.remove('showItem')
      }, 3000)
    }else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = '';
      this.amountInput.value = '';

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount,
      };
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      //show balance
      this.showBalance()
    }
  };
  //add expense;
  addExpense(expense) {
 const div = document.createElement('div');
 div.classList.add('expense');
 div.innerHTML = `
 <div class="expense-item d-flex justify-content-between align-items-baseline">

 <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
 <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

 <div class="expense-icons list-item">

  <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
   <i class="fas fa-edit"></i>
  </a>
  <a href="#" class="delete-icon" data-id="${expense.id}">
   <i class="fas fa-trash"></i>
  </a>
 </div>
 `;
this.expenseList.appendChild(div);
  }

  //total expense;
  totalExpese() {
    let total = 0;
    if(this.itemList.length > 0) {
       total = this.itemList.reduce(function(acc, curr) {
        console.log(`total is ${acc} and curr value is ${curr.amount}`);
        acc += curr.amount;
        console.log('acc=>', acc)
        return acc;
       }, 0)
    }
    this.expenseAmount.textContent = total;
    return total;
  }



  //end of class
}

function eventListeners() {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById("expense-list");

  const myBudget = new Budget();

  //budget Form submit
  budgetForm.addEventListener('submit', function(e){
     e.preventDefault()
     myBudget.submitBudgetForm()
  })
  //expense Form submit
  expenseForm.addEventListener('submit', function(e){
     e.preventDefault()
     myBudget.submitExpenseForm();
  })
  //expense click
  expenseList.addEventListener('submit', function(){

  })

}

document.addEventListener('DOMContentLoaded', function(){
  eventListeners()
}) 