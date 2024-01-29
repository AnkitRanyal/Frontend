import axios from "axios"

export function createProduct(product) {
  return new Promise(async (resolve, reject) => {
    const data = await axios.post("http://localhost:5000/products", product);
    resolve({ data })
  })
}

export function fetchAllProducts() {
  return new Promise(async (resolve, reject) => {
    const resp = await axios.get("http://localhost:5000/products");
    resolve({ data: { products: resp, totalItems: resp } })
  })
}

export function fetchCarouselProducts() {
  return new Promise(async (resolve, reject) => {
    const resp = await axios.get("http://localhost:5000/products");
    resolve({ data: { carouselproducts: resp, totalItems: resp } })
  })
}



export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    const data = await axios.get("http://localhost:5000/products/" + id);
    resolve({ data })
  })
}

export function updateProduct(update) {
  return new Promise(async (resolve, reject) => {
    const data = await axios.patch(`http://localhost:5000/products/${update.id}`, update);
    resolve({ data })
  })
}

export function fetchProductsByFilters(categoryfilter, orderfilter, sort, pagination, admin) {
  var querystring = "";
  if (categoryfilter) {
    for (let key in categoryfilter) {
      const categoryValues = categoryfilter[key];
      if (categoryValues.length) {
        querystring += `${key}=${categoryValues}`

      }
    }
  }

  for (let key in orderfilter) {
    const orderValues = orderfilter[key];
    if (orderValues.length) {
      querystring += `${key}=${orderValues}`

    }

  }

  if (sort) {
    for (let key in sort) {
      querystring += `${key}=${sort[key]}&`;
    }
  }

  if (pagination) {
    for (let key in pagination) {
      querystring += `${key}=${pagination[key]}&`;
    }
  }
  if (admin) {
    querystring += `admin=true`;
  }
  return new Promise(async (resolve, reject) => {
    const resp = await axios.get("http://localhost:5000/products?" + querystring);
    resolve({ data: { products: resp, totalItems: resp } });
  })
}

export function fetchBrandsByFilters(orderfilter, sort, pagination, admin) {
  let querystring = "";
  for (let key in orderfilter) {
    const orderValues = orderfilter[key];
    if (orderValues.length) {
      querystring += `${key}=${orderValues}`
      return new Promise(async (resolve, reject) => {
        const resp = await axios.get("http://localhost:5000/brands/name?" + querystring);
        resolve({ data: { products: resp, totalItems: resp } });
      })

    }

  }
}


export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:5000/categories');
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:5000/brands');
    const data = await response.json();
    resolve({ data });
  });
}


export function deleteProductBYId(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:5000/products/delete/' + itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}