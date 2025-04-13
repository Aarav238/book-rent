const API_URL = 'https://book-rent-o321.onrender.com/api';

export const getAllBooks = async (filterParams = {}) => {
  let url = `${API_URL}/book`;
  
  // Add query params for filtering if provided
  const params = new URLSearchParams();
  if (filterParams.genre) params.append('genre', filterParams.genre);
  if (filterParams.title) params.append('title', filterParams.title);
  if (filterParams.location) params.append('location', filterParams.location);
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  
  return response.json();
};

export const getBookById = async (id) => {
  const response = await fetch(`${API_URL}/book/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch book');
  }
  
  return response.json();
};

export const addBook = async (bookData) => {
  const response = await fetch(`${API_URL}/book/addBook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add book');
  }
  
  return response.json();
};

export const updateBook = async (id, bookData) => {
  const response = await fetch(`${API_URL}/book/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update book');
  }
  
  return response.json();
};

export const deleteBook = async (id) => {
  const response = await fetch(`${API_URL}/book/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete book');
  }
  
  return response.json();
};

export const updateBookStatus = async (id) => {
  const response = await fetch(`${API_URL}/book/${id}/status`, {
    method: 'PATCH',
  });
  
  if (!response.ok) {
    throw new Error('Failed to update book status');
  }
  
  return response.json();
};