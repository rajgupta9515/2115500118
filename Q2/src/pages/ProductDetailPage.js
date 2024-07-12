import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Card, CardMedia, CardContent } from '@mui/material';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=1
0000${id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          image={product.image || 'default-image-url'}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
          <Typography>Company: {product.company}</Typography>
          <Typography>Category: {product.category}</Typography>
          <Typography>Price: ${product.price}</Typography>
          <Typography>Rating: {product.rating}</Typography>
          <Typography>Discount: {product.discount}%</Typography>
          <Typography>Availability: {product.availability}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetailPage;
