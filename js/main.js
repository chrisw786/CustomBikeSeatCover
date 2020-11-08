var sideColorPrice = 10;
var topColorPrice = 10;
var ribColorPrice = 10;
var total = sideColorPrice + topColorPrice + ribColorPrice;

function changeImage(id) {
    document.getElementById(id).onclick = function () {
        var select = document.getElementById('select');
        var options = this.querySelectorAll('#'+ id + ' option:checked');
    
        document.getElementById(options[0].dataset.category).src = "img/" + options[0].dataset.category + "/" + options[0].dataset.img + ".jpg";

        if(options[0].dataset.category == 'side-color') {
            sideColorPrice = options[0].dataset.price;
            total = parseFloat(sideColorPrice) + parseFloat(topColorPrice) + parseFloat(ribColorPrice);
        } else if(options[0].dataset.category == 'top-color') {
            topColorPrice = options[0].dataset.price;
            total = parseFloat(sideColorPrice) + parseFloat(topColorPrice) + parseFloat(ribColorPrice);
        } else if(options[0].dataset.category == 'rib-color') {
            ribColorPrice = options[0].dataset.price;
            total = parseFloat(sideColorPrice) + parseFloat(topColorPrice) + parseFloat(ribColorPrice);
        }

        document.getElementById('custom-seat-price').innerHTML = total;
    }
}