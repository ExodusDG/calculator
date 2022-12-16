var x, i, j, l, ll, selElmnt, a, b, c;

x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {

        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {

            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {

        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");

    });
}

function closeAllSelect(elmnt) {

    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

document.addEventListener("click", closeAllSelect);

var data = {
    "100": {
        ARR: 6000,
        Implement: 4875
    },
    "125": {
        ARR: 7500,
        Implement: 4875
    },
    "150": {
        ARR: 9000,
        Implement: 5850
    },
    "200": {
        ARR: 11500,
        Implement: 5850
    },
    "250": {
        ARR: 14250,
        Implement: 6825
    },
    "300": {
        ARR: 17000,
        Implement: 6825
    },
    "350": {
        ARR: 19750,
        Implement: 7800
    },
    "400": {
        ARR: 22500,
        Implement: 7800
    },
    "500": {
        ARR: 28000,
        Implement: 7800
    },
    "750": {
        ARR: 42000,
        Implement: 11700
    },
    "1000": {
        ARR: 42000,
        Implement: 13650
    },
    "1500": {
        ARR: 65000,
        Implement: 15600
    },
    "2000": {
        ARR: 80000,
        Implement: 19500
    },
    "2500": {
        ARR: 90000,
        Implement: 29250
    },
}


//CALC LOGIC

$('.select-items div').click(function() {
    calculate()
})

$('#empcount opton').click(function() {
    calculate()
})

var processors = Number($('#processors').val());

function calculate() {
    processors = Number($('#processors').val());
    let averagefte = Number($('#averagefte').val()) / 1000;
    let benefits = Number($('#benefits').val() / 1000)
    let empcount = Number($('.same-as-selected').text())

    var resultValue = processors * (averagefte + benefits)

    $('#resultValue').text('£' + resultValue + ',000')




    if ($('.select-selected').text() != 'Choose...') {
        if (processors != 0) {
            var FTE = $('.select-selected').text();

            var ARR = Number(data[FTE].ARR)
            var Implement = Number(data[FTE].Implement)


            resultValue = resultValue * 1000;

            var year1 = resultValue - (ARR + Implement);
            var year2 = resultValue - ARR;
            var year3 = resultValue - ARR;

            $('.year1 span').text(year1)
            $('.year2 span').text(year2)
            $('.year3 span').text(year3)
        }

    }

}