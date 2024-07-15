/* eslint-disable react/no-unescaped-entities */
import moment from "moment";
import { Card } from "primereact/card";
import { DataView } from "primereact/dataview";
import { Rating } from "primereact/rating";
import NotFound from "../../../../../public/notfound.svg";
import Image from "next/image";
import React from "react";

interface ReviewDataTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ProductReview: any;
}

// eslint-disable-next-line react/prop-types
const ReviewDataTable: React.FC<ReviewDataTableProps> = ({ ProductReview }) => {
  // eslint-disable-next-line react/prop-types
  const ReviewsCount = ProductReview?.reviews?.length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemTemplate = (Reviews: any) => {
    return (
      <Card key={Reviews._id} className="ReviewsComponent m-1">
        <div
          className="m-1 p-2"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ maxWidth: "50%" }}>
            <p
              className="p-0 m-0"
              style={{ fontSize: "1.1rem", fontWeight: "500" }}
            >
              {Reviews.reviewerName}
            </p>
            <p
              className="p-0 m-0"
              style={{
                fontSize: "1rem",
                fontWeight: "400",
              }}
            >
              {Reviews.comment}
            </p>
          </div>
          <div
            className="mx-2"
            style={{
              maxWidth: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Rating
              style={{ display: "flex", justifyContent: "center" }}
              value={Reviews.rating}
              readOnly
              cancel={false}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
              }}
            >
              <p
                className="p-0 m-0"
                style={{ fontSize: "0.9rem", fontWeight: "400" }}
              >
                {`Reviewed on ${moment(Reviews.date).format("Do MMM YY")} by`}
              </p>
              <p
                className="p-0 m-0"
                style={{ fontSize: "0.9rem", fontWeight: "400" }}
              >
                {Reviews.reviewerEmail}
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <>
      {ReviewsCount === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={NotFound}
            alt="No records found"
            // height="100"
            // width="100"
            style={{
              width: "50%",
              height: "50%",
            }}
          />
          <p className="fw-bold">
            There aren't any Reviews regarding this product
          </p>
        </div>
      ) : (
        <div
          className="card"
          style={{ width: "100%", minHeight: "44vh", display: "flex" }}
        >
          <DataView
            className="d-flex"
            style={{
              height: "43.5vh",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            value={ProductReview.reviews}
            itemTemplate={itemTemplate}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50, ReviewsCount]}
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink  RowsPerPageDropdown NextPageLink LastPageLink"
            currentPageReportTemplate="{first} - {last} out of {totalRecords}"
          />
        </div>
      )}
    </>
  );
};

export default ReviewDataTable;
