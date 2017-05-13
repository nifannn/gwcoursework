var $element = $('input[type="range"]');
var $handle;

$element
  .rangeslider({
    polyfill: false,
    onInit: function() {
      $handle = $('.rangeslider__handle', this.$range);
      updateHandle($handle[0], this.value);
    }
  })
  .on('input', function() {
    updateHandle($handle[0], this.value);
  });

function updateHandle(el, val) {
  el.textContent = " " + val + " ";
  plotBar(val);
}

$(document).ready(function(){
//promo-box
$("#js-promo-box").hide();
$("#promo-link").on("click", function(){
  $("#js-promo-box").slideToggle();
  return false;
});
  
});