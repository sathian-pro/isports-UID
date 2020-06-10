var reduction = 1;

function RemoveSelf(id) {
    var element = id.parentNode.removeChild(id);
    element.parentNode.removeChild(element);
}

function RemoveParent(id) {
    var parent = id.parentNode;
    parent.parentNode.removeChild(parent);
}

function Remove(id) {
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
    ReCalc();
}

function ReCalc() {
    var element = document.getElementsByClassName('$subtotal$');
    var total_sum = 0;
    for (each in element)
        if (!isNaN(element[each].innerHTML))
            total_sum += parseFloat(element[each].innerHTML);

    if (total_sum) {
        document.getElementById('basket-subtotal').innerHTML = total_sum.toFixed(2);
        if (reduction)
            document.getElementById('basket-total').innerHTML = (total_sum * reduction).toFixed(2);
        else
            document.getElementById('basket-total').innerHTML = 'FREE';
    }
    else {
        document.getElementById('basket-subtotal').innerHTML = 'FREE';
        document.getElementById('basket-total').innerHTML = 'FREE';
    }
}

function ChangeQuantity(num) {
    var quant = parseInt(document.getElementById('quantity#' + num).value);
    var right = parseFloat(document.getElementById('unit#' + num).innerHTML);
    document.getElementById('price#' + num).innerHTML = (right * quant).toFixed(2);

    quant = Math.abs(quant);
    if (!quant) quant = 1;
    if (!isNaN(quant))
        document.getElementById('quant#' + num).innerHTML = quant;
   ReCalc();
}

function CheckCoupon() {
    var code = document.getElementById('promo-code').value;
    var output;
    if (code == '10OFF') {
        output = 'Coupon has been successfully applied:\n10% discount on current purchase';
        reduction -= 0.1;
    }
    else if (code == 'FREE')
    {
        output = 'Coupon has been successfully applied:\nCurrent purchase is completely free!';
        reduction = 0;
    }
    else
        output = "Coupon not found";
    alert(output);
    ReCalc();
}
