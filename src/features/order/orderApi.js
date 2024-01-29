import Orders from "@/app/admin/orders/page";

export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:5000/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:5000/orders/' + order.id, {
      method: 'PATCH',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(pagination) {
  console.log('pagination', pagination)
  let queryString = '';

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      'http://localhost:5000/orders?' + queryString
    );
    const data = await response.json();
    resolve({ data: { orders: data } });
  });
}

export function deleteOrdersById(val) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:5000/orders/delete/' + val.id, {
      method: 'DELETE',
    });
    const data = await response.json();
    resolve({ data });
  });
}