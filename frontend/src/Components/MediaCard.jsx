import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import products from '../data/product';

export default function MediaCard() {
  return (
    <div className='d-flex flex-wrap space-evenly gap-2  mt-5 '>

      {products.map((product) =>

        <Card className='mx-5 mb-5 media-card'>
          <CardMedia
            sx={{
              height: 100,

              borderRadius: 2,
              boxShadow: 3
            }}
            image={product.image}
            title={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {product.variety}
            </Typography>
            <p>{product.price}</p>
          </CardContent>
          <CardActions>
            <Button size="small"></Button>
            <Button size="small"></Button>
          </CardActions>
        </Card>

      )}

    </div>
  );
}
