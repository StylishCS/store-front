import React, { useEffect, useState } from 'react';
import { Card, Typography,Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
 } from "@material-tailwind/react";
import http from '../http';
 
const TABLE_HEAD = ["Seller", "Sell Price", "Net Price", "Profit", "Date", "Preview"];
 
// const TABLE_ROWS = [
//   {
//     Seller: "John Michael",
//     SellPrice: 0,
//     NetPrice: 0,
//     Profit: 0,
//     Date: "23/04/18"
//   }
// ];

function Contact() {
  const [invoices, setInvoices] = useState({});
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const handleOpen = () => setOpen(!open);
  useEffect(() => {
    http.GET("/invoices").then((res) => {
      setInvoices(res);
      return res
    }).then((res) => {
      const formattedRows = res.map((invoice) => ({
        id: invoice._id,
        Seller: invoice.seller,
        SellPrice: invoice.sellPrice,
        NetPrice: invoice.netPrice,
        Profit: invoice.profit,
        Date: new Date(invoice.createdAt).toLocaleDateString(),
      }));
      setTABLE_ROWS(formattedRows);
    }).catch((err) => {
      console.log(err);
      alert("Something went wrong");
    })
  }, [])

  function viewInvoice(id){
    setSelectedId(id);
    http.GET(`/invoices/${id}`).then((res) => {
      console.log(res);
      setSelectedInvoice(res);
    }).then(() => {
      setOpen(!open)
    }).catch((err) => {
      console.log(err)
    })
  }
  
  return (
    <>
    <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Invoice {selectedId}</DialogHeader>
        <DialogBody>
          Seller: {selectedInvoice.seller} <br/>
          Sell Price: {selectedInvoice.sellPrice}<br/>
          Net Price: {selectedInvoice.netPrice}<br/>
          Profit: {selectedInvoice.profit}<br/>
          Products: 
          <ul>
            {selectedInvoice.products && selectedInvoice.products.map((item, index) => (
              <li key={index}>
                {item.prodId.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          Issued At: {selectedInvoice.createdAt}
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ id, Seller, SellPrice, NetPrice, Profit, Date }, index) => (
            <tr key={id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {Seller}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {SellPrice}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {NetPrice}
                </Typography>
              </td>
              <td className="p-4">
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  {Profit}
                </Typography>
              </td>
              <td className="p-4">
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  {Date}
                </Typography>
              </td>
              <td className="p-4">
                <Typography as="a" onClick={()=>viewInvoice(id)} variant="small" color="blue-gray" className="font-medium">
                  View
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
    </>
  );
}

export default Contact;