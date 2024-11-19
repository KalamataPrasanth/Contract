document.getElementById("contract-date").textContent = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
});

// Handle form submission and finalize the agreement
document.getElementById("submit-btn").addEventListener("click", () => {
    const partyASign = document.getElementById("party-a-sign").value.trim();
    const partyBSign = document.getElementById("party-b-sign").value.trim();
    const witness1Sign = document.getElementById("witness-1-sign").value.trim();
    const witness2Sign = document.getElementById("witness-2-sign").value.trim();

    if (partyASign && partyBSign && witness1Sign && witness2Sign) {
        document.getElementById("status-msg").style.color = "green";
        document.getElementById("status-msg").textContent = "Agreement finalized and signed successfully!";

        // Make PDF download button visible
        document.getElementById("download-pdf-btn").style.display = "block";

        // Store signatures and finalization status
        document.getElementById("party-a-sign-display").textContent = "Kalamata Prasanth: " + partyASign;
        document.getElementById("party-b-sign-display").textContent = "Likhit Venkatesh Pativada: " + partyBSign;
        document.getElementById("witness-1-sign-display").textContent = "B Bhanu Kiran: " + witness1Sign;
        document.getElementById("witness-2-sign-display").textContent = "Aishanya Pattanaik: " + witness2Sign;

        // Disable all signature fields
        lockForm();
    } else {
        document.getElementById("status-msg").style.color = "red";
        document.getElementById("status-msg").textContent = "All fields must be signed to finalize the agreement.";
    }
});

function lockForm() {
    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach(input => input.disabled = true);
    document.getElementById("submit-btn").disabled = true;
}

// Generate PDF on clicking the download button
document.getElementById("download-pdf-btn").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const contractText = `
        Contract Agreement

        Date: ${new Date().toLocaleString()}

        We agree to the terms.
        
        Signed by:
        Kalamata Prasanth: ${document.getElementById("party-a-sign-display").textContent}
        Likhit Venkatesh Pativada: ${document.getElementById("party-b-sign-display").textContent}
        B Bhanu Kiran: ${document.getElementById("witness-1-sign-display").textContent}
        Aishanya Pattanaik: ${document.getElementById("witness-2-sign-display").textContent}
    `;

    // Use splitTextToSize to break long text into multiple lines that fit within the page width
    const lines = doc.splitTextToSize(contractText, 180); // 180px is roughly the width of the page
    doc.text(lines, 10, 10);

    // Save the PDF file
    doc.save('contract-agreement.pdf');
});
