document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("payment-form");
    const cardNumberInput = document.getElementById("card-number");
    const expiryInput = document.getElementById("expiry");
    const cvvInput = document.getElementById("cvv");
  
    cardNumberInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      value = value.match(/.{1,4}/g)?.join(" ") || "";
      e.target.value = value;
    });
  
    expiryInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      e.target.value = value;
    });
  
    cvvInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3);
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      if (!validateForm()) {
        alert("Please fill in all fields correctly.");
        return;
      }
  
      // Open success window if validation passes
      openSuccessWindow();
    });
  
    // Function to open a new window with a full-screen success message
    function openSuccessWindow() {
      const successWindow = window.open("", "_blank", "fullscreen=yes");
  
      // HTML content for the success window
      const successHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Payment Successful</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
            }
            .success-container {
              text-align: center;
              background-color: #fff;
              padding: 2rem;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            .success-container h2 {
              color: #28a745;
              margin-bottom: 1rem;
            }
            .success-container p {
              color: #555;
            }
            .success-container button {
              margin-top: 1.5rem;
              padding: 0.5rem 1rem;
              background-color: #007bff;
              color: #fff;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }
            .success-container button:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="success-container">
            <h2>Payment Successfully Submitted!</h2>
            <p>Thank you for your payment. Your transaction has been processed.</p>
            <button onclick="window.close()">Close</button>
          </div>
        </body>
        </html>
      `;
  
      // Write the HTML content to the new window
      successWindow.document.write(successHTML);
      successWindow.document.close(); // Ensure the content is rendered
    }
  
    function validateForm() {
      const cardNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
      const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvPattern = /^\d{3}$/;
  
      return (
        cardNumberPattern.test(cardNumberInput.value) &&
        expiryPattern.test(expiryInput.value) &&
        cvvPattern.test(cvvInput.value)
      );
    }
  });