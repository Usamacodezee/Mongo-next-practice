/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Galleria, GalleriaResponsiveOptions } from "primereact/galleria";

export default function GalleryComponent() {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        const res = await axios.get("/api/products");
        setImages(res.data.data);
      } catch (error) {
        console.error("Failed to fetch product information", error);
      }
    };
    getProductInfo();
  }, []);

  const responsiveOptions: GalleriaResponsiveOptions[] = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];

  const itemTemplate = (item: any) => {
    return (
      <Image
        src={item.image}
        alt={item.alt}
        width={640}
        height={480}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  const thumbnailTemplate = (item: any) => {
    return (
      <Image
        src={item.image}
        alt={item.alt}
        width={100}
        height={100}
        style={{ display: "block", backgroundColor: "white" }}
      />
    );
  };

  const caption = (item: any) => {
    return (
      <React.Fragment>
        <div className="text-xl mb-2 font-bold">{item.name}</div>
        <p className="text-white">Rs. {item.price} /-</p>
      </React.Fragment>
    );
  };

  return (
    <div className="card">
      <Galleria
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        caption={caption}
        style={{ maxWidth: "640px", backgroundColor: "white" }}
      />
    </div>
  );
}
