const name = document.querySelector('#name');
const saleValue = document.querySelector('#value');
const sales = document.querySelector('#sales');
const btnAddSale = document.querySelector('#add_sale');
const btnEditSale = document.querySelector('#edit_sale');
let listSales = JSON.parse(localStorage.getItem('listSales')) || [];
let auxIndex;
  
btnAddSale.addEventListener('click', addSale);
btnEditSale.addEventListener('click', confirmEditSale);

function changeButtons(e) {
  document.querySelectorAll('.edit_btn').forEach(item => {
    item.disabled = false;
  });
  if(e.target.id !== 'edit_sale')
    e.type === 'click' ? e.target.disabled = true : e.target.children[0].children[0].disabled = true;
  if(!btnAddSale.classList.contains('hide')) {
    btnAddSale.classList.add('hide');
    btnEditSale.classList.remove('hide');
  } else {
    if(e.target.id === 'edit_sale') {
      btnAddSale.classList.remove('hide');
      btnEditSale.classList.add('hide');
    }
  }
}

function clearInput() {
  name.value = '';
  saleValue.value = '';
}

function deleteSale(e) {
  const sale = e.target.parentNode.parentNode.textContent;
  listSales.forEach((item, index) => {
    if(sale.includes(item.id))
      listSales.splice(index, 1);
  });
  localStorage.setItem('listSales', JSON.stringify(listSales));
  showSales();
}

function confirmEditSale(e) {
  e.preventDefault();
  listSales.forEach((item, index) => {
    if(index === auxIndex) {
      for(key in item) {
        if(key !== 'id')
          item[key] = document.querySelector(`#${key}`).value;
      }
    }
  });
  localStorage.setItem('listSales', JSON.stringify(listSales));
  changeButtons(e);
  clearInput();
  showSales();
}

function editSale(e) {
  changeButtons(e);
  const sale = e.type === 'click' ? e.target.parentNode.parentNode.textContent : e.target.textContent;
  listSales.forEach((item, index) => {
    if(sale.includes(item.id)) {
      name.value = item.name;
      saleValue.value = item.value;
      auxIndex = index;
    }
  });
}

function generateButtons() {
  const div = document.createElement('div');
  const btnDelete = document.createElement('button');
  btnDelete.textContent = '❌';
  btnDelete.addEventListener('click', (e) => deleteSale(e));
  const btnEdit = document.createElement('button');
  btnEdit.textContent = '🖊️';
  btnEdit.setAttribute('class', 'edit_btn');
  btnEdit.addEventListener('click', (e) => editSale(e));
  div.appendChild(btnEdit);
  div.appendChild(btnDelete);

  return div;
}

function generateId() {
  let id = Math.floor((Math.random() + 100) * 1000);
  listSales.forEach(item => {
    item.id === id ? id = Math.floor((Math.random() + 100) * 1000) : id;
  });
  return id;
}

function addSale(e) {
  if(name.value.length && saleValue.value.length) {
    e.preventDefault();
    listSales.push({ name: name.value, value: saleValue.value, id: generateId() });
    localStorage.setItem('listSales', JSON.stringify(listSales));
    showSales();
    clearInput();
  }
}

function showSales() {
  sales.innerHTML = '';
  listSales.forEach(item => {
    const li = document.createElement('li');
    li.setAttribute('title', 'Clique 2x para Editar');
    li.addEventListener('dblclick', (e) => editSale(e));
    li.textContent = `N.º: ${item.id} | Cliente: ${item.name} | R$ ${item.value}`;
    li.appendChild(generateButtons());
    sales.appendChild(li);
  });
}

showSales();
