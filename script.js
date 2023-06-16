const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");

let transactions = [];

const transactionStorage = JSON.parse(localStorage.getItem('trans'));
if (transactionStorage !== null) {
  transactions = transactionStorage;
}

function updateLocalStorage() {
  localStorage.setItem('trans', JSON.stringify(transactions));
}

function loadTransactionDetails(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "exp" : "inc");

  item.innerHTML = `${transaction.description}<span>${sign} ${Math.abs(
    transaction.amount
  )}</span>
    <button class='btn-del' onclick='removeTrans(${
  transaction.id
  })'>x</button>`;

  trans.appendChild(item);
}

function removeTrans(id) {
  if (confirm("Are you sure to delete the transaction?")) {
    transactions = transactions.filter((transaction) => {
      return transaction.id != id;
    });
    config();
    updateLocalStorage();
  } else {
    return;
  }
}

function updateAmount() {
  const amounts = transactions.map((transaction) => {
    return transaction.amount;
  });

  const total = amounts.reduce((acc, i) => acc + i, 0).toFixed(2);
  balance.textContent = `₹${total}`;

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, i) => acc + i, 0)
    .toFixed(2);
  inc_amt.innerHTML = `₹${income}`;

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, i) => acc + i, 0)
    .toFixed(2);
  exp_amt.innerHTML = `₹${Math.abs(expense)}`;
}

function config() {
  trans.innerHTML = "";
  transactions.forEach(loadTransactionDetails);
  updateAmount();
}

function addTransaction(e) {
  e.preventDefault();
  if (description.value.trim() == "" || amount.value.trim() == "") {
    alert("Please enter description and amount");
  } else {
    const transaction = {
      id:uniqueId(),
      description: description.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    loadTransactionDetails(transaction);
    description.value = "";
    amount.value = "";
    updateAmount();
    updateLocalStorage();
  }
}

function uniqueId(){
    return Math.floor(Math.random()*1000);
}

form.addEventListener("submit", addTransaction);

window.addEventListener("load", function () {
  config();
});
