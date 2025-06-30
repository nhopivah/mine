const categories = [
  { name: "RUMAH", file: "rumah.csv" },
  { name: "FASHHION", file: "fashion.csv" },
  // ... kategori lain jika ada
];

const categoryList = document.getElementById('category-list');
const productList = document.getElementById('product-list');
const productSection = document.getElementById('products');
const productTitle = document.getElementById('product-title');
const categoriesSection = document.getElementById('categories');
const backBtn = document.getElementById('back-to-categories');

categories.forEach(category => {
  const li = document.createElement('li');
  li.textContent = category.name;
  li.onclick = () => loadProducts(category.name, `assets/csv/${category.file}`);
  categoryList.appendChild(li);
});

let openedDetail = null;

function loadProducts(title, file) {
  productTitle.textContent = title;
  // Hide categories, show products and back button
  categoriesSection.style.display = 'none';
  productSection.style.display = 'block';
  backBtn.style.display = 'block';

  productList.innerHTML = '';
  fetch(file)
    .then(res => res.text())
    .then(data => {
      const lines = data.split('\n').slice(1); // skip header
      lines.forEach(line => {
        const [no, judul, deskripsi, gambar, link] = line.split(',');
        if (!judul) return;
        const item = document.createElement('li');
        item.classList.add('product-item');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('product-title');
        titleDiv.innerHTML = `<strong>${no}. ${judul}</strong>`;
        item.appendChild(titleDiv);

        const detailDiv = document.createElement('div');
        detailDiv.classList.add('product-detail');
        
        // <p>${deskripsi}</p>
        // <img src="assets/images/blender.jpg" alt="${judul.trim()}" />
        detailDiv.innerHTML = `
        <img src="assets/images/${gambar.trim()}" alt="${judul.trim()}" />
          <a href="${link}" target="_blank" style="color: #5b9cdc;"><i class="material-icons">attachment</i> Lihat Produk</a>
        `;
        item.appendChild(detailDiv);

        // titleDiv.onclick = () => {
        //   if (openedDetail && openedDetail !== detailDiv) openedDetail.style.display = 'none';
        //   const isVisible = detailDiv.style.display === 'block';
        //   detailDiv.style.display = isVisible ? 'none' : 'block';
        //   openedDetail = detailDiv.style.display === 'block' ? detailDiv : null;
        // };

        productList.appendChild(item);
      });
    });
}

// Kembali ke kategori
backBtn.onclick = () => {
  productSection.style.display = 'none';
  backBtn.style.display = 'none';
  categoriesSection.style.display = 'block';
  productList.innerHTML = '';
  productTitle.textContent = '';
  openedDetail = null;
};
