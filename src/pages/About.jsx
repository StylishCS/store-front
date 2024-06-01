import { useContext, useEffect, useState } from "react"
import {
  Card,
  Input,
  Button,
  Typography,
  Alert
} from "@material-tailwind/react";
import http from "../http";

const About = () => {
  const [image, setImage] = useState(null);
  const [viewImage, setViewImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false)
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file)
        const reader = new FileReader();
        reader.onloadend = () => {
          setViewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

  function addProduct(ev){
    ev.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("netPrice", price);
    formData.append("image", image);

    http.POST("/products/add", formData)
    .then((res) => {
      console.log(res);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false); // Hide the alert after 5 seconds
      }, 3000)})
      .catch((err) => {
        alert("Something went wrong");
        console.log(err);
      })
    setName("");
    setPrice("");
    setImage(null);
    setViewImage(null);
    }

  return (
    <>
    {showAlert && (
        <Alert className="fixed mt-8 top-4 left-1/2 transform -translate-x-1/2 z-20" color="green">Product Added Successfully</Alert>
    )}
    <div className="flex justify-center items-center min-h-screen">
      <Card color="transparent" shadow={false} className="w-full max-w-sm p-4">
        <Typography variant="h4" color="blue-gray" className="text-center">
          Add Product
        </Typography>
        
        <form className="mt-8 mb-2 w-full" onSubmit={addProduct}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Product Name
            </Typography>
            <Input
              size="lg"
              placeholder="name"
              value={name}
              onChange={e=>setName(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Product Net Price
            </Typography>
            <Input
              size="lg"
              placeholder="123"
              value={price}
              onChange={e=>setPrice(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {
              image ? (<img
                      src={viewImage}
                      width={500}
                      alt="Uploaded"
                      className="rounded-lg object-cover"
                    />):(<div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} />
                </label>
              </div> )
            }
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Add Product
          </Button>
        </form>
      </Card>
    </div>
    </>
  );
};

export default About;
