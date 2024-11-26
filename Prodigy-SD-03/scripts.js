// Array to store contacts
let contacts = [];

// DOM elements
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const saveBtn = document.getElementById("save-btn");
const contactList = document.getElementById("contact-list");
const formTitle = document.getElementById("form-title");

// Current contact being edited
let editingIndex = -1;

// Save or Edit Contact
saveBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !phone || !email) {
        alert("Please fill out all fields.");
        return;
    }

    if (editingIndex === -1) {
        // Add new contact
        contacts.push({ name, phone, email });
    } else {
        // Edit existing contact
        contacts[editingIndex] = { name, phone, email };
        editingIndex = -1;
        saveBtn.textContent = "Save";
        formTitle.textContent = "Add Contact";
    }

    clearForm();
    renderContacts();
});

// Render Contacts
function renderContacts() {
    contactList.innerHTML = "";
    contacts.forEach((contact, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${contact.name}</strong><br>
                Phone: ${contact.phone}<br>
                Email: ${contact.email}
            </div>
            <div>
                <button class="edit" onclick="editContact(${index})">Edit</button>
                <button class="delete" onclick="deleteContact(${index})">Delete</button>
            </div>
        `;
        contactList.appendChild(li);
    });
}

// Edit Contact
function editContact(index) {
    const contact = contacts[index];
    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;

    editingIndex = index;
    saveBtn.textContent = "Update";
    formTitle.textContent = "Edit Contact";
}

// Delete Contact
function deleteContact(index) {
    if (confirm("Are you sure you want to delete this contact?")) {
        contacts.splice(index, 1);
        renderContacts();
    }
}

// Clear Form
function clearForm() {
    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
}
