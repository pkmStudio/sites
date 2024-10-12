/* Проверка мобильного браузера */
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
	// Добавление класса _touch для HTML если браузер мобильный
	if (isMobile.any()) document.documentElement.classList.add('_touch');
}


const shelfs = document.querySelectorAll('.shelf_of_store');
const cart = document.querySelector('.cart_of_store');
const products = document.querySelectorAll('.product');
let itemAppend;

/** 
 * Для компьютеров
*/
function isThisCart(place) {
    console.log(place.className);
    
    if (place.className == 'cart_of_store') {
        return 1;
    } else {
        return 0;
    }
}

function isThisProduct(item) {   
    if (item == 'product') {
        return 1;
    } else {
        return 0;
    }
}

function deleteNotProduct(cart) {
    let child = cart.lastChild;
    if (child.className != 'product') {
        cart.removeChild(child);
    }

    return;
}

function closeShop() {
    let shop = document.querySelector('.shelfs_of_store');
    let sendButton = document.querySelector('.button');

    shop.classList.add('_close');
    sendButton.classList.add('_active');
    sendButton.addEventListener("click", () => {location.reload();});

    return;
}

function allowOfDrop(event) {
    event.preventDefault();
    return;
}

function drag(item) {
    item.dataTransfer.setData('id', item.target.id);
    item.dataTransfer.setData('class', item.target.className);
    return;
}

function drop(item, place) {
    place.append(document.getElementById(item));
    return;
}

function dropInShop(event) { return; }

function dropInCart(event) {
    let item = event.dataTransfer.getData('class');
    let place = event.target.parentElement; 
    let isCart = isThisCart(place);
    let isProduct = isThisProduct(item);

    if (isCart == 0) {return;}
    let cart = place.querySelector('.cart');

    if (isProduct == 0) { return; }
    let product = event.dataTransfer.getData('id');

    drop(product, cart);
    //deleteNotProduct(cart); 

    if (cart.childNodes.length != 3) { return; }

    closeShop();
    return;
}

/* Для мобильных устройств */  
function dragDrop(event) {
    let item = event.target;
    if (!itemAppend) {return;}
    let inCart = itemAppend.querySelector('.cart');
    itemAppend = undefined;
    inCart.append(item);
    item.classList.remove('_active');
    cart.classList.remove('_active');

    if (inCart.childNodes.length != 3) { return; }
    closeShop();
    return;
}

function dragMove(event) {
    event.preventDefault();
    let item = event.target;
    let container = document.querySelector('.container');
    let touch = event.targetTouches[0];
    let halfWidth = item.offsetWidth/2;
    let halfHeight = item.offsetHeight/2;
    container.append(item);  
    
    
    item.classList.add('_active');
    item.style.left = `${touch.pageX - halfWidth}px`;
    item.style.top = `${touch.pageY - halfHeight}px`;

    getItemAppend(item);
    
}

function getItemAppend(item) {
    if (
        item.getBoundingClientRect().top + item.offsetHeight / 2 < cart.getBoundingClientRect().bottom &&
        item.getBoundingClientRect().left + item.offsetWidth / 2 < cart.getBoundingClientRect().right &&
        item.getBoundingClientRect().bottom + item.offsetHeight / 2 > cart.getBoundingClientRect().top &&
        item.getBoundingClientRect().right + item.offsetWidth / 2 > cart.getBoundingClientRect().left
    ) {
        cart.classList.add('_active');
        itemAppend = cart;
    } else {
        cart.classList.remove('_active');
        itemAppend = undefined;
    }

    return;
}

window.addEventListener("load", () => {
addTouchClass();

cart.ondragover = allowOfDrop;
cart.ondrop = dropInCart;

shelfs.forEach(shelf => {
    shelf.ondragover = allowOfDrop;
    shelf.ondrop = dropInShop;
});

products.forEach(product => {
    product.ondragstart = drag;
    product.addEventListener('touchmove', dragMove, false);
    product.addEventListener('touchend', dragDrop, false);
});
    
});


