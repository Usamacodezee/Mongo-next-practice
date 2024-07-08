import moment from "moment";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { addReviewAsync } from "@/redux/products/productSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import "@/app/globals.css";
import axios from "axios";
import { InputTextarea } from "primereact/inputtextarea";
import ReviewDataTable from "./ReviewComponent/ReviewDataTable";

interface ReviewComponentProps {
  ProductReview: any;
  setReviewModalOff: () => void;
  setReviewModalOn: () => void;
  setProductReview: (product: any) => void;
  fetchData: () => void;
}

interface ReviewDataTypes {
  rating: number | null;
  comment: string;
  date: Date | string;
  reviewerName: string;
  reviewerEmail: string;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({
  ProductReview,
  setReviewModalOff,
  setProductReview,
  fetchData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [UserDetails, setUserDetails] = useState("");
  const [newReview, setNewReview] = useState<ReviewDataTypes>({
    rating: null,
    comment: "",
    date: moment().format(),
    reviewerName: "",
    reviewerEmail: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReview((prevReview: any) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleRatingChange = (e: any) => {
    setNewReview((prevReview: any) => ({
      ...prevReview,
      rating: e.value,
    }));
  };

  useEffect(() => {
    const GetUserCredentials = async () => {
      try {
        const res = await axios.get("/api/admin/me");
        const user = res.data.data;
        setUserDetails(user);
        setNewReview((prevReview) => ({
          ...prevReview,
          reviewerName: user.username,
          reviewerEmail: user.email,
        }));
      } catch (error) {
        console.error("failed to fetch user credentials", error);
      }
    };
    GetUserCredentials();
  }, []);

  const handleAddReview = () => {
    const { reviewerName, reviewerEmail, comment, rating } = newReview;
    const review = {
      reviewerName,
      reviewerEmail,
      comment,
      rating,
      date: new Date(),
    };
    const productId = ProductReview._id;
    if (productId) {
      dispatch(addReviewAsync({ productId, review }))
        .unwrap()
        .then((updatedProduct: any) => {
          console.log("Review added successfully:", updatedProduct);
          setReviewModalOff();
          setNewReview({
            reviewerName: "",
            reviewerEmail: "",
            comment: "",
            rating: null,
            date: new Date(),
          });
          fetchData();
          setProductReview(updatedProduct);
        })
        .catch((error) => {
          console.error("Failed to add review:", error);
        });
    } else {
      console.error("Product ID is not defined");
    }
  };

  return (
    <>
      <div className="container" style={{ padding: "10px 25px" }}>
        <strong
          className="mt-2"
          style={{ fontSize: "1.8rem", fontWeight: "600", color: "#1c6ab9" }}
        >
          {ProductReview.name}'s reviews
        </strong>
        <div className="" style={{ display: "flex" }}>
          <div className="mx-2 mt-2" style={{ width: "30%", height: "45%" }}>
            <div
              className="mx-2 my-1"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <strong>Reviewer's name:</strong>
              <InputText
                variant="filled"
                name="reviewerName"
                placeholder="Your Name"
                value={UserDetails?.username}
                onChange={handleChange}
                className=" mb-3 px-2 py-1"
                style={{ pointerEvents: "none", opacity: "0.5" }}
              />

              <strong>Reviewer's email:</strong>
              <InputText
                variant="filled"
                name="reviewerEmail"
                placeholder="Your Email"
                value={newReview.reviewerEmail}
                onChange={handleChange}
                className=" mb-3 px-2 py-1"
                style={{ pointerEvents: "none", opacity: "0.5" }}
              />

              <strong>Description:</strong>
              <InputTextarea
                name="comment"
                placeholder="Provide description"
                value={newReview.comment || ""}
                onChange={handleChange}
                className=" mb-3 px-2 py-1"
                style={{ height: "8rem" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Rating
                  value={newReview.rating || 0}
                  onChange={handleRatingChange}
                  cancel={false}
                  className="px-2 py-1"
                />
              </div>
              <Button
                label="Add Review"
                onClick={handleAddReview}
                className=" mt-3 p-2"
                style={{ height: "3rem", borderRadius: "8px" }}
              />
            </div>
          </div>
          <div
            className="mx-2 mt-2"
            style={{ width: "70%", height: "44vh", overflow: "hidden scroll" }}
          >
            <ReviewDataTable ProductReview={ProductReview} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewComponent;
