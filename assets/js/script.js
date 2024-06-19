// Opacity for the navbar
// window.addEventListener("scroll", function () {
//   var navbar = document.querySelector(".navbar");
//   if (window.scrollY > 0) {
//     navbar.style.opacity = "0.95";
//   } else {
//     navbar.style.opacity = "1";
//   }
// });

// Contact Us Form
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxzKTlh8C8QI9gbVmAI1smNS5dAi7ODB_z0phqQg92464uTvlYFuSkS5BtsE68-BuxhcQ/exec";
const form = document.forms["csb-contact-form"];
const submitButton = form.querySelector('button[type="submit"]');
const spinner = submitButton.querySelector("span");
const contactResult = document.getElementById("contact-result");
const resultMessage = contactResult.querySelector("strong");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitButton.disabled = true;
  spinner.className = "spinner-border spinner-border-sm";
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => response.json())
    .then((response) => {
      if (response.result === "success") {
        contactResult.className = "alert alert-success mt-3";
        resultMessage.textContent = "شكرا لك تم الإرسال بنجاح";
        form.reset();
      } else {
        throw new Error(response.error);
      }
    })
    .catch((error) => {
      console.error("خطأ في الإرسال!", error.message);
      contactResult.className = "alert alert-danger mt-3";
      resultMessage.textContent = "خطأ في الإرسال!";
    })
    .finally(() => {
      submitButton.disabled = false;
      spinner.className = "";
    });
});

// Upload files form
// URL of your Google Apps Script
document.getElementById("uploadfile").addEventListener("change", function () {
  var file = this.files[0];
  var fr = new FileReader();
  fr.fileName = file.name;
  fr.onload = function (e) {
    var html =
      '<input type="hidden" name="data" value="' +
      e.target.result.replace(/^.*,/, "") +
      '" >';
    html += '<input type="hidden" name="mimetype" value="' + file.type + '" >';
    html += '<input type="hidden" name="filename" value="' + file.name + '" >';
    document.getElementById("data").innerHTML = html;
  };
  fr.readAsDataURL(file);
});

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting the traditional way
  var formData = new FormData(document.getElementById("form"));

  var xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "https://script.google.com/macros/s/AKfycbxdPwrqiacxq-aOzaqjcKEY_TH0iaMFgz7wdBceY44VKcM97LUtPIjNA4JNzghNxTo9Nw/exec",
  );

  xhr.onload = function () {
    if (xhr.status === 200) {
      try {
        var response = JSON.parse(xhr.responseText);
        if (response.result === "success") {
          document.getElementById("response").innerHTML =
            "<b>File uploaded successfully!</b>";
        } else {
          document.getElementById("response").innerHTML =
            "<b>File upload failed!</b>";
        }
      } catch (e) {
        document.getElementById("response").innerHTML =
          "<b>File upload encountered an error, but it may have been uploaded successfully. Please check the Google Sheet.</b>";
      }
    } else {
      document.getElementById("response").innerHTML =
        "<b>File upload encountered an error, but it may have been uploaded successfully. Please check the Google Sheet.</b>";
    }
  };

  xhr.onerror = function () {
    document.getElementById("response").innerHTML =
      "<b>File upload encountered an error, but it may have been uploaded successfully. Please check the Google Sheet.</b>";
  };

  xhr.send(formData);
});
