import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import CartCard from '../components/cartCard';
import http from '../http';


const Services = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [cart, setCart] = useState({});
  const [open, setOpen] = useState(false);
  const [swillam, setSwillam] = useState(false);
  const [salem, setSalem] = useState(false);

  
  useEffect(() => {
    http.GET("/cart")
    .then((res) => {
      setCart(res)
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])
  
  const handleOpen = () => setOpen(!open);

  function checkoutCart(){
    let sellers = "";
    if(swillam){
      sellers += "swillam ";
    }
    if(salem){
      sellers+= "salem";
    }
    if(!sellers){
      alert("Select The Sellers Ya 8aby")
    }
    http.POST("/cart/checkout", {
      seller: sellers
    }).then((res) => {
      console.log(res);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      window.location.reload();
    }).catch((err) => {
      console.log(err)
      alert("Something went wrong");
    })
    handleOpen();
  }
  return(
    <>
    {showAlert && (
        <Alert className='fixed mt-8 top-4 left-1/2 transform -translate-x-1/2 z-20' color="green">Invoice Created Successfully</Alert>
    )}
    <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Seller</DialogHeader>
        <DialogBody>
          <Card>
      <List>
        <ListItem className="p-0">
          <label
            htmlFor="vertical-list-react"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-react"
                value={swillam}
                onChange={e=> setSwillam(e.target.checked)}
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              Sold By Swillam
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="vertical-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-vue"
                value={swillam}
                onChange={e=> setSalem(e.target.checked)}
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              Sold By Salem
            </Typography>
          </label>
        </ListItem>
      </List>
    </Card>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={checkoutCart}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {/* Cart items */}
        {cart.products && cart.products.map((item) => (
          <CartCard data={item} key={item.prodId._id} />
        ))}
        {/* Subtotal */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{cart.totalPrice} EGP</p>
          </div>
          <hr className="my-4" />
          <button onClick={handleOpen} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Services;
