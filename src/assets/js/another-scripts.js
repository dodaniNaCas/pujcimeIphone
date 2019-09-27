function toggleModal(id, ids) {
  $('#' + id).modal('toggle');
  if (ids) {
    var idsToRemove = new Array(ids);
    for (var item in idsToRemove["0"]) {
      document.getElementById(idsToRemove["0"][item]).value = null;
    }
  }
}

$(document).ready(function () {
  $(".close-nav").click(function (event) {
    $("#navbarDefault").collapse('hide');
  });
  $(".navbar-toggler.collapsed").click(function (event) {
    $("#navbarDefault").collapse();
  });
});


function showSliderValue(t, e, n, i, input) {
  var r = document.getElementById("rs-range-line"),
    o = document.getElementById("rs-bullet"),
    s = document.getElementById("rs-sum"),
    a = document.getElementById("rs-day");
  if (input) {
    if (o.value > 31) {
      o.value = 31;
    }
    r.value = o.value, o.style.left = r.value / r.max * 375 + "px", r.value <= 7 ? (a.innerHTML = t, s.innerHTML = r.value * a.innerHTML + " K\u010d", a.innerHTML += " K\u010d") : r.value > 7 && r.value <= 14 ? (a.innerHTML = e, s.innerHTML = r.value * a.innerHTML + " K\u010d", a.innerHTML += " K\u010d") : r.value > 14 && r.value < 22 ? (a.innerHTML = n, s.innerHTML = r.value * a.innerHTML + " K\u010d", a.innerHTML += " K\u010d") : r.value >= 22 && (a.innerHTML = i, s.innerHTML = r.value * a.innerHTML + " K\u010d", a.innerHTML += " K\u010d");
  }
  else {
    o.value = r.value, o.style.left = r.value / r.max * 375 + "px", r.value <= 7 ? (a.innerHTML = t, s.innerHTML = r.value * a.innerHTML + " K\u010d", a.innerHTML += " K\u010d") : r.value > 7 && r.value <= 14 ? (a.innerHTML = e, s.innerHTML = r.value * a.innerHTML + " K\u010d", a.innerHTML += " K\u010d") : r.value > 14 && r.value < 22 ? (a.innerHTML = n, s.innerHTML = r.value * a.innerHTML + " K\u010d", a.innerHTML += " K\u010d") : r.value >= 22 && (a.innerHTML = i, s.innerHTML = r.value * a.innerHTML + " K\u010d", a.innerHTML += " K\u010d");
  }
}

function digitsAndSlash(evt) { var charCode = (evt.which) ? evt.which : evt.keyCode; return charCode === 44 || (charCode >= 48 && charCode <= 57) || (charCode === 191); } 
