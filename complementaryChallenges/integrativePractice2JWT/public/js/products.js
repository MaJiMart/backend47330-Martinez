(function () {
    fetch('/current')
    .then((response) => response.json())
    .then((data) => {
      const htmlText = 
      `<h1>: Hi ${data.first_name}!</h1>
      <p>Products:</p>
      <p>These are our available products:</p>`
      const span = document.getElementById('spanProducts');
      span.innerHTML = htmlText;
    })
    .catch((error) => {
      console.error('error', error)
    })
  /* 
    fetch('/admin')
    .then((response) => response.json())
    .then((data) => {
      console.log('Admin data', data);
    })
    .catch((error) => {
      console.error('error', error)
    }) */
  })();

document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.getElementById("categorySelect");
    const sortSelect = document.getElementById("sortSelect");

    // Obtener los valores de category y sort de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    const sortParam = urlParams.get("sort");

    // Establecer las opciones seleccionadas en los select según los parámetros de la URL
    if (categoryParam) {
        categorySelect.value = categoryParam;
    }
    if (sortParam) {
        sortSelect.value = sortParam;
    }
    
    //Redirigir URL
    function redirectToNewURL() {
        const selectedCategory = categorySelect.value;
        const selectedSort = sortSelect.value;
        const newURL = `/products?category=${selectedCategory}&sort=${selectedSort}`;
        window.location.href = newURL;
    }

    //Eventos
    categorySelect.addEventListener("change", redirectToNewURL);
    sortSelect.addEventListener("change", redirectToNewURL);
});
