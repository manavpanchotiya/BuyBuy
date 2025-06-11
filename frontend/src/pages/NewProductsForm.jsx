import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NewProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price_in_cents: '',
    image: '',
    category_id: '',
    user_id: 3,
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Error loading categories:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation: Ensure required fields are filled
    if (!formData.name || !formData.price_in_cents || !formData.category_id) {
      alert("Please fill in all required fields.");
      return;
    }

    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to create product');
        return res.json();
      })
      .then(() => {
        alert('Product created successfully!');
        navigate('/seller'); 
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('Error creating product');
      });
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <input name="name" placeholder="Name" onChange={handleChange} required /><br />
        <input name="description" placeholder="Description" onChange={handleChange} /><br />
        <input name="price_in_cents" placeholder="Price in cents" onChange={handleChange} required /><br />
        <input name="image" placeholder="Image URL" onChange={handleChange} /><br />
        
        <select name="category_id" onChange={handleChange} required>
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select><br />

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default NewProduct;
