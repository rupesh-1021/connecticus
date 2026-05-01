setTimeout(() => {
  document.getElementById("formBox").style.display = "block";
}, 1500);

let selectedRole = "";
let selectedInterest = "";

// DROPDOWN LOGIC
document.querySelectorAll(".dropdown").forEach(dropdown => {
  const trigger = dropdown.querySelector(".dropdown-trigger");
  const items = dropdown.querySelectorAll(".dropdown-item");
  const search = dropdown.querySelector(".dropdown-search");

  trigger.addEventListener("click", () => {
    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("open"));
    dropdown.classList.toggle("open");
  });

  items.forEach(item => {
    item.addEventListener("click", () => {
      const value = item.innerText;

      dropdown.querySelector(".dropdown-trigger span:first-child").innerText = value;

      if (dropdown.id === "roleDropdown") {
        selectedRole = value;

        if (value === "Other") {
          document.getElementById("otherRole").style.display = "block";
        } else {
          document.getElementById("otherRole").style.display = "none";
        }

      } else {
        selectedInterest = value;
      }

      dropdown.classList.remove("open");
    });
  });

  if (search) {
    search.addEventListener("keyup", () => {
      const val = search.value.toLowerCase();
      items.forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(val)
          ? "block"
          : "none";
      });
    });
  }
});

// CLOSE DROPDOWN
document.addEventListener("click", e => {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("open"));
  }
});

function showAlert(message) {
  document.getElementById('alertMessage').innerText = message;
  document.getElementById('customAlert').style.display = 'flex';
}

function closeAlert() {
  document.getElementById('customAlert').style.display = 'none';
}

// 🚀 SUBMIT TO GOOGLE FORM
function submitForm() {


  let finalRole = selectedRole;
  if (selectedRole === "Other") {
    finalRole = document.getElementById("otherRole").value.trim();
    if (!finalRole) return alert("Please enter your role");
  }

  const name = document.getElementById("name").value.trim();
  const company = document.getElementById("company").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();

  if (!name || !company || !email || !mobile ||
      selectedRole === "Your Role?" || 
      selectedInterest === "Interested to work closely with Team?") {
      
    showAlert("Please fill all the fields and select options.");
    return;
  }

  const btn = document.querySelector("button");
  const originalText = btn.innerText;
  btn.innerText = "Submitting...";
  btn.disabled = true;

  // 🔥 YOUR APPS SCRIPT URL
  const scriptURL = "https://script.google.com/macros/s/AKfycbzTV1Hap0qRzPyKRjkBOrG7NnzisyFWEAOd99bDkRMP4nDvV3r91Lj_-xCTTUaCN5HY/exec";

  const formData = new FormData();
  formData.append("name", name);
  formData.append("company", company);
  formData.append("email", email);
  formData.append("mobile", mobile);
  formData.append("role", finalRole);
  formData.append("interest", selectedInterest);

  fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",           // ← This is the key fix for now
    body: formData
  })
  .then(() => {
    // With no-cors we cannot read the response, so we assume success
    document.getElementById("formBox").style.display = "none";
    document.getElementById("inviteMsg").style.display = "block";
  })
  .catch((err) => {
    console.error("Fetch error:", err);
    alert("Submission failed. Please try again.");
  })
  .finally(() => {
    btn.innerText = originalText;
    btn.disabled = false;
  });
}


// CONTACT PANEL
function toggleContactPanel() {
  document.getElementById("contactPanel").classList.toggle("show");
}
