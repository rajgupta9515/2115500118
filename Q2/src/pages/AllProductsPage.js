import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, CardContent, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ category: '' });
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://20.244.56.144/test/companies/: companyname/categories/:categoryname/products?top=n&minPrice=p&maxPrice=q", {
          params: { ...filter, sort }
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [filter, sort]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="phone">Phone</MenuItem>
              <MenuItem value="computer">Computer</MenuItem>
              <MenuItem value="tv">TV</MenuItem>
              <MenuItem value="earphone">Earphone</MenuItem>
              <MenuItem value="tablet">Tablet</MenuItem>
              <MenuItem value="charger">Charger</MenuItem>
              <MenuItem value="mouse">Mouse</MenuItem>
              <MenuItem value="keypad">Keypad</MenuItem>
              <MenuItem value="bluetooth">Bluetooth</MenuItem>
              <MenuItem value="pendrive">Pendrive</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="tablet">Speaker</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="priceAsc">Price: Low to High</MenuItem>
              <MenuItem value="priceDesc">Price: High to Low</MenuItem>
              <MenuItem value="ratingAsc">Rating: Low to High</MenuItem>
              <MenuItem value="ratingDesc">Rating: High to Low</MenuItem>
              <MenuItem value="discountAsc">Discount: Low to High</MenuItem>
              <MenuItem value="discountDesc">Discount: High to Low</MenuItem>
              <MenuItem value="availabilityAsc">Availability: Low to High</MenuItem>
              <MenuItem value="availabilityDesc">Availability: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image || 'default-image-url'}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography>{product.company}</Typography>
                <Typography>Price: ${product.price}</Typography>
                <Typography>Rating: {product.rating}</Typography>
                <Link to={`/product/${product.id}`}>View Details</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllProductsPage;
