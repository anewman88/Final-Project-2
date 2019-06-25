const pairing = Array.from(document.querySelectorAll('.pairing'));
const checkout = document.querySelector('.checkout');
const storeItem = Array.from(document.querySelectorAll('.store-item'));
const buyMe = Array.from(document.querySelectorAll('.buy-me'));
let purchasedItems = document.querySelector('.purchased-items');
let salesDetails = document.querySelector('.sales-details');
let dateTime = document.querySelector('.date-time');
let purchasedString = ``;
let subTotal = 0;


// STORE ITEMS
for (let item of storeItem) {
  item.addEventListener('mouseover', function(event) {
    event.target.nextElementSibling.style.display = "block";
  });

  item.addEventListener('click', function(event) {
      if(event.target.classList.contains('item-one')) {
            purchasedString += `
            The Hunger Games $10.39 <br>`;
            subTotal += 10.39;
            console.log(subTotal);
      } else if(event.target.classList.contains('item-two')) {
            purchasedString += `
            Thinking Putty $3.79 <br>`;
            subTotal += 3.79;
            console.log(subTotal);
      } else if(event.target.classList.contains('item-three')) {
            purchasedString += `
            Settlers of Catan $48.95 <br>`;
            subTotal += 48.95;
            console.log(subTotal);
      } else if(event.target.classList.contains('item-four')) {
            purchasedString += `
            Journal $9.98 <br>`;
            subTotal += 9.98;
            console.log(subTotal);
      } else if(event.target.classList.contains('item-five')) {
            purchasedString += `
            Charmander Nanoblocks $27.95 <br>`;
            subTotal += 27.95;
            console.log(subTotal);
      }
  });
  
  item.addEventListener('mouseout', function(event) {
    event.target.nextElementSibling.style.display = "none";
  });
}


// HIDE STORE ITEMS
for (let item of pairing) {
    item.addEventListener('click', function() {
        item.classList.add('hidden');
    });
}



// CHECKOUT EVENT
checkout.addEventListener('click', function(event) {

    let itemDisplay = document.querySelector('.item-display');
    itemDisplay.innerHTML = '<h1> Thank You for Your Purchase!<br> View Your receipt below!</h1>';
    itemDisplay.style.fontSize = '35px';
    checkout.style.display = 'none';


    // RECEIPT DETAILS
    purchasedItems.style.display = 'block';
    purchasedItems.style.textAlign = 'center';
    purchasedItems.innerHTML = purchasedString;

    let giftCard = 150;
    let salesTax = (subTotal * 0.08);
    salesTax = Number(salesTax.toFixed(2));
    let total = salesTax + subTotal;
    total = Number(total.toFixed(2));
    let remainingBalance = giftCard - total;
    remainingBalance = remainingBalance.toFixed(2);
    let memberSavings = total * 0.1;
    memberSavings = memberSavings.toFixed(2);

    // TOTALS DISPLAY ON RECEIPT
    salesDetails.style.display = 'block';
    salesDetails.style.textAlign = 'center';
    salesDetails.style.marginTop = '8px';
    salesDetails.innerHTML = ` 
    Subtotal $${Number(subTotal.toFixed(2))} <br>
    Sales Tax (8%) $${salesTax} <br><br>
    <strong> TOTAL $${total} </strong> <br><br>
    <strong> PAYMENT TYPE: GIFTCARD $${giftCard} </strong> <br>
    <strong> GIFTCARD REMAINING BALANCE $${remainingBalance} </strong> <br><br>
    A MEMBER WOULD HAVE SAVED $${memberSavings}`;

    // DATE AND TIME 
    let currentDate = new Date();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let minutes = currentDate.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    

    let dateString = `<h4>${month + 1}/${day}/${year}&nbsp&nbsp&nbsp&nbsp&nbsp${hours}:${minutes}${suffix}</h4>`;
    dateTime.innerHTML = dateString;
    dateTime.style.fontSize = '17px';
});
