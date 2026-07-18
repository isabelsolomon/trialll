function calculateproduct(product, fullsell, fullcost, halfsell, halfcost, quartersell, quartercost){

    let fullqty = Number(document.getElementById(product + "fullqty").value);
    let halfqty = Number(document.getElementById(product + "halfqty").value);
    let quarterqty = Number(document.getElementById(product + "quarterqty").value);

    let total = ((fullsell-fullcost)*fullqty) +
                ((halfsell-halfcost)*halfqty) +
                ((quartersell-quartercost)*quarterqty);

    document.getElementById(product + "profit").innerText = total;

    calculategrandtotal();
}


function calculategrandtotal(){

    let profits = document.querySelectorAll("[id$='profit']");

    let grandtotal = 0;

    profits.forEach(profit => {
        grandtotal += Number(profit.innerText);
    });

    document.getElementById("grandtotal").innerText = grandtotal;
}



// ============================
// INDEXED DATABASE
// ============================

let db;


let request = indexedDB.open("ProfitCalculatorDB", 1);


request.onupgradeneeded = function(event){

    db = event.target.result;


    let store = db.createObjectStore("profits", {
        keyPath: "id",
        autoIncrement: true
    });


    store.createIndex("date", "date", {
        unique: false
    });

};



request.onsuccess = function(event){

    db = event.target.result;

    // show saved total when app opens
    getTotalSavedProfit();

};



// ============================
// SAVE TODAY'S PROFIT
// ============================

function saverecord(){

    let total = Number(document.getElementById("grandtotal").innerText);

    let date = new Date().toLocaleDateString();


    let transaction = db.transaction(
        ["profits"],
        "readwrite"
    );


    let store = transaction.objectStore("profits");


    store.add({
        date: date,
        profit: total
    });


    transaction.oncomplete = function(){

        alert("Profit saved!");

        getTotalSavedProfit();

    };

}



// ============================
// CALCULATE ALL SAVED PROFITS
// ============================

function getTotalSavedProfit(){


    if(!db) return;


    let transaction = db.transaction(
        ["profits"],
        "readonly"
    );


    let store = transaction.objectStore("profits");


    let request = store.getAll();



    request.onsuccess = function(){


        let records = request.result;


        let total = 0;


        records.forEach(record => {

            total += record.profit;

        });


        document.getElementById("savedtotal").innerText = total;

    };

}



// ============================
// DELETE ALL SAVED PROFITS
// ============================

function clearrecords(){


    let transaction = db.transaction(
        ["profits"],
        "readwrite"
    );


    let store = transaction.objectStore("profits");


    store.clear();



    transaction.oncomplete = function(){

        alert("All records deleted");

        document.getElementById("savedtotal").innerText = 0;

    };

}



// ============================
// CLEAR INPUTS
// ============================

function clearinputs(){


    let inputs = document.querySelectorAll("input");


    inputs.forEach(input => {

        input.value = "";

    });



    let profits = document.querySelectorAll("[id$='profit']");


    profits.forEach(profit => {

        profit.innerText = "0";

    });



    document.getElementById("grandtotal").innerText = "0";

}