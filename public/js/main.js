
// websocket communication scripts
const socket = io();

socket.on('message', message => {
    console.log(message);
});

socket.on('checkDOMStatus', storeStatus => {
    updateStatusStore(storeStatus);
})

const ledStatus = document.querySelector("#ledStatus");
const statusText = document.querySelector("#textStatus");

function updateStatusStore(storeStatus){
    if(storeStatus == true){
        // ledStatus.classList.add("ledActivated");
        ledStatus.style = "background-color: green";
        statusText.innerText = "Loja aberta para pedidos :D"
    } else {
        // ledStatus.classList.remove("ledActivated");
        ledStatus.style = "background-color: red";
        statusText.innerText = "Loja fechada para pedido :("
    }
}

// -----------------------
//      sidebar scripts
// -----------------------

const menuBtn = document.querySelector('#menu');
const sideNavBar = document.querySelector('.side-navbar-container');

menuBtn.onclick = (e) => {
    e.preventDefault();
    sideNavBar.classList.toggle("hide-side-nav");
};



// -----------------------
//      cardapio scripts
// -----------------------


const itemCardap = document.querySelectorAll(".item-sect-cardap");

itemCardap.forEach(item => {
    item.onclick = (e) => {
        item.querySelector(".info-card").classList.toggle("info-card-exp");
    }
})

itemCardap.onclick = (e) => {
    cardItem.classList.toggle("info-card-exp");
}