import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  Input,
  Alert
} from "@material-tailwind/react";
import http from '../http'

export function ProductCard({ product }) {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  function handleOpen(id) {
    setSelectedId(id);
    setPrice(0);
    setQuantity(0);
    setOpen((cur) => !cur);
  }

function addToCart(id) {
  if (price !== 0 && quantity !== 0 && id) {
    console.log(id);
    http.POST(`/cart/${id}`, {
      sellPrice: price,
      quantity: quantity
    })
      .then((res) => {
        console.log(res);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  }
}
  return (
    <>
    {showAlert && (
        <Alert className="fixed mt-8 top-4 left-1/2 transform -translate-x-1/2 z-20" color="green">Product Added Successfully</Alert>
    )}
    <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
      <CardHeader shadow={false} floated={false} className="h-60">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {product.name}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            ${product.netPrice}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          Items Sold: {product.sold}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={()=> handleOpen(product._id)}
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
    <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add To Cart
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Sell Price
            </Typography>
            <Input label="Price" value={price} onChange={e=>setPrice(e.target.value)} size="lg" />
            <Typography className="-mb-2" variant="h6">
              Quantity
            </Typography>
            <Input label="Quantity" value={quantity} onChange={e=>setQuantity(e.target.value)} size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={e=>{
              addToCart(selectedId)
              handleOpen(null);
            }} fullWidth>
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
