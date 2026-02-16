/* Demo request form — redirect to Fillout with email pre-filled */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('form[name="demo-request-form"]').forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.querySelector('input[name="demo-email"]');
      if (!email || !email.value) return;
      var url = "https://brieflee.fillout.com/waitinglist?email=" + encodeURIComponent(email.value);
      window.location.href = url;
    });
  });
});
