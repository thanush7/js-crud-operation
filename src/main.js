import './style.css';

const listData = []; // Stores the data objects

// DOM Elements
const openPopUp = document.getElementById('btn');
const pop = document.getElementById('popup');
const form = document.getElementById('formId');
const dataList = document.getElementById('dataList');
const nameInput = document.getElementById('name');
const activeInput = document.getElementById('box');

let editIndex = null; // Tracks the index of the item being edited

// Open popup to add/edit item
openPopUp.addEventListener('click', () => {
  form.reset(); // Clear the form
  editIndex = null; // Reset edit index
  pop.classList.add('active');
});

// Close popup on form submission or cancel
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const active = activeInput.checked;

  if (editIndex !== null) {
    // Update existing entry
    listData[editIndex] = { name, active };
    editIndex = null;
  } else {
    // Add new entry
    listData.push({ name, active });
  }

  updateList(); // Refresh the table
  form.reset(); // Clear form
  pop.classList.remove('active'); // Hide popup
});

// Function to update the table
function updateList() {
  dataList.innerHTML = ''; // Clear existing rows

  listData.forEach((data, index) => {
    const row = document.createElement('tr');

    // Name column
    const nameCell = document.createElement('td');
    nameCell.textContent = data.name || 'N/A';
    row.appendChild(nameCell);

    // Active column
    const activeCell = document.createElement('td');
    activeCell.textContent = data.active ? 'Yes' : 'No';
    row.appendChild(activeCell);

    // Edit button
    const editCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', () => {
      editIndex = index; // Track the index being edited
      nameInput.value = data.name;
      activeInput.checked = data.active;
      pop.classList.add('active'); // Open popup for editing
    });
    editCell.appendChild(editButton);
    row.appendChild(editCell);

    // Delete button
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
      listData.splice(index, 1); // Remove item from array
      updateList(); // Refresh the table
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    // Append row to table body
    dataList.appendChild(row);
  });
}
