/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductForm, { ProductTypes } from "@/app/common/ProductFormData";
import moment from "moment";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { Message } from "primereact/message";
import { Formik, Form, Field } from "formik";
import {
  addProductAsync,
  updateProductAsync,
} from "@/redux/products/productSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import ProductvalidationSchema from "@/app/common/ProductValidationSchema";
import { Button } from "primereact/button";
import ResetButton from "./ResetButton";
import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import "@/app/globals.css";

const initialValues: ProductTypes = {
  _id: null,
  name: "",
  description: "",
  category: "",
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  tags: [],
  brand: "",
  sku: "RCH45Q1A",
  weight: 2,
  warrantyInformation: "",
  shippingInformation: "",
  availabilityStatus: "",
  returnPolicy: "",
  orderQuantity: 0,
  reviews: [],
  meta: {
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  image: "",
};

interface ProductFormProps {
  EditableData: ProductTypes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isEditMode: boolean;
  fetchData: () => void;
  onClose: () => void;
  setLoading: (loading: boolean) => void;
  FetchUpdatedData: () => void;
  setFormModalOff: () => void;
  setIsEditModeOff: () => void;
  HandleClose: () => void;
  setLoadingon: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setEditableData: (data: ProductTypes | null) => void;
}

const ProductFormComponnent: React.FC<ProductFormProps> = ({
  EditableData,
  isEditMode,
  fetchData,
  setFormModalOff,
  setIsEditModeOff,
  HandleClose,
  setLoadingon,
  setEditableData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useRef<Toast>(null);
  const showToast = (
    severity: "success" | "info" | "warn" | "error" | undefined,
    summary: string,
    detail: string
  ) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fieldComponents: any = {
    // eslint-disable-next-line react/react-in-jsx-scope, @typescript-eslint/no-explicit-any
    InputText: (props: any) => <InputText {...props} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    InputTextarea: (props: any) => (
      <InputTextarea style={{ height: "10rem" }} {...props} />
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Checkbox: (props: any) => {
      const value =
        ProductForm.find((item) => item?.name === props?.name)?.value || [];
      return (
        <div className="flex flex-column gap-3">
          {value.map((category) => {
            return (
              <div key={category?.code} className="flex align-items-center">
                <Checkbox
                  inputId={category?.code}
                  name={props?.name}
                  value={category?.name}
                  checked={props?.value === category?.name}
                  onChange={(e) => {
                    const isChecked = e.checked;
                    const value = e.value;
                    const newValue = isChecked ? value : "";

                    props.onChange({
                      target: { name: props?.name, value: newValue },
                    });
                  }}
                />
                <label htmlFor={category?.code} className="px-2">
                  {category?.code}
                </label>
              </div>
            );
          })}
        </div>
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    GroupCheckbox: (props: any) => {
      return (
        <Field name={props?.name}>
          {({ field, form }: any) => {
            const value =
              ProductForm.find((item) => item?.name === props?.name)?.value ||
              [];
            return (
              <div className="flex flex-column gap-3">
                {value.map((category) => {
                  return (
                    <div
                      key={category?.code}
                      className="flex align-items-center"
                    >
                      <Checkbox
                        inputId={category?.code}
                        name={props?.name}
                        value={category?.name}
                        checked={field?.value.includes(category?.name)}
                        onChange={(e) => {
                          // eslint-disable-next-line no-unsafe-optional-chaining
                          const _values = [...field?.value];
                          if (e.checked) {
                            _values.push(e.value);
                          } else {
                            _values.splice(_values.indexOf(e.value), 1);
                          }
                          form.setFieldValue(field?.name, _values);
                        }}
                      />
                      <label htmlFor={category?.code} className="px-2">
                        {category?.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Field>
      );
    },
    RadioButton: (props: any) => {
      const value =
        ProductForm.find((item) => item?.name === props?.name)?.value || [];
      return (
        <div className="flex flex-column gap-3">
          {value.map((Location) => {
            const checked = Array.isArray(props?.value)
              ? props?.value.includes(Location?.name)
              : props?.value === Location?.name;
            return (
              <div key={Location?.code} className="flex align-items-center">
                <RadioButton
                  className=""
                  inputId={Location?.code}
                  name={props?.name}
                  value={Location?.name}
                  checked={checked}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;
                    let newValue;
                    if (isChecked) {
                      newValue = Array.isArray(props?.value)
                        ? // eslint-disable-next-line no-unsafe-optional-chaining
                          [...props?.value, value]
                        : value;
                    } else {
                      newValue = Array.isArray(props?.value)
                        ? props?.value.filter((val: any) => val !== value)
                        : "";
                    }
                    props.onChange({
                      target: { name: props?.name, value: newValue },
                    });
                  }}
                />
                <label htmlFor={Location?.code} className="px-2">
                  {Location?.code}
                </label>
              </div>
            );
          })}
        </div>
      );
    },
    Dropdown: (props: any) => {
      const options =
        ProductForm.find((item) => item?.name === props?.name)?.options || [];
      return (
        <Dropdown
          {...props}
          options={options}
          optionLabel="name"
          optionValue="name"
        />
      );
    },
    Calendar: (props: any) => (
      <Calendar
        {...props}
        dateFormat="dd/M/yy"
        showIcon
        value={props.value ? new Date(props.value) : null}
        onChange={(e) => {
          const formattedDate = moment(e.value).format("Do MMM YY");
          props.setFieldValue(props?.name, formattedDate);
        }}
      />
    ),
    MultiSelect: (props: any) => (
      <Field name={props?.name}>
        {({ field, form }: any) => {
          const options =
            (ProductForm.find((item) => item?.name === field?.name) || {})
              .options || [];
          const selectedValues = field?.value || [];
          const handleSelectionChange = (selectedValues: string[]) => {
            form.setFieldValue(field?.name, selectedValues);
          };

          return (
            <MultiSelect
              {...field}
              {...props}
              options={options}
              value={selectedValues}
              onChange={(e: MultiSelectChangeEvent) =>
                handleSelectionChange(e.value)
              }
              optionLabel="name"
              optionValue="name"
              display="chip"
            />
          );
        }}
      </Field>
    ),
  };

  return (
    <div>
      <Toast ref={toast} className="my-1" />
      <div>
        <h6 className="text-center fs-2" style={{ color: "rgb(13, 40, 67)" }}>
          {isEditMode === true
            ? "Update user records"
            : "User registration form"}
        </h6>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Formik
            initialValues={isEditMode ? EditableData : initialValues}
            enableReinitialize={true}
            validationSchema={ProductvalidationSchema}
            onSubmit={async (values, { resetForm }) => {
              // console.log("product data", values);
              try {
                if (isEditMode) {
                  await dispatch(
                    updateProductAsync({
                      productid: values._id,
                      product: values,
                    })
                  );
                  showToast("success", "Success", "User updated successfully!");
                } else {
                  await dispatch(addProductAsync(values));
                }
                setLoadingon();
                fetchData();
                resetForm();
                setFormModalOff();
                setIsEditModeOff();
                setEditableData(null);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                showToast("success", "Success", "User added successfully!");
              } catch (error) {
                console.error("Error saving user:", error);
                showToast(
                  "error",
                  "Error",
                  `Failed to ${isEditMode ? "update" : "add"} user`
                );
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="row g-3 px-3">
                {ProductForm.map((field: any) => {
                  const Component =
                    fieldComponents[field?.fieldType] || InputText;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className={field?.inputSize}>
                      <label className="fw-bold mb-1" htmlFor={field?.name}>
                        {field?.label ? field?.label : field?.name}
                        <span className="text-danger">*</span>
                      </label>
                      <br />
                      <Field name={field?.name}>
                        {({ field: formikField, form }: any) => {
                          const isArrayValue = Array.isArray(
                            formikField?.value
                          );

                          return (
                            <Component
                              {...formikField}
                              id={field.name}
                              type={field?.inputType}
                              placeholder={field?.placeHolder}
                              className={`p-inputtext-lg px-3 ${
                                field.name === "category" ? "py-1" : "py-2"
                              }`}
                              style={{
                                width: "100%",
                                height:
                                  field.name === "description"
                                    ? "7rem"
                                    : "40px",
                                borderRadius: "8px",
                              }}
                              onChange={(e: any) => {
                                let newValue;
                                if (isArrayValue) {
                                  if (e.target.checked) {
                                    newValue = [
                                      ...formikField.value,
                                      e.target.value,
                                    ];
                                  } else {
                                    newValue = formikField.value.filter(
                                      (val: any) => val !== e.target.value
                                    );
                                  }
                                } else {
                                  newValue = e.target.checked
                                    ? e.target.value
                                    : e.target.value;
                                }
                                form.setFieldValue(field?.name, newValue);
                              }}
                              checked={
                                isArrayValue
                                  ? formikField.value.includes(field?.value)
                                  : formikField.value === field?.value
                              }
                            />
                          );
                        }}
                      </Field>
                      <div className="mt-1">
                        {touched[field?.name as keyof ProductTypes] &&
                          errors[field?.name as keyof ProductTypes] && (
                            <Message
                              severity="error"
                              text={
                                errors[
                                  field?.name as keyof ProductTypes
                                ] as string
                              }
                            />
                          )}
                      </div>
                    </div>
                  );
                })}
                <div
                  className="col-md-12 modal-footer d-flex"
                  style={{ justifyContent: "center" }}
                >
                  <Button
                    type="submit"
                    label={isEditMode ? "Save changes" : "Upload records"}
                    className="p-button-da px-3 py-2 m-2"
                    style={{
                      borderRadius: "9px",
                      backgroundColor: "#3f78b0",
                    }}
                  />
                  <ResetButton
                    initialValues={initialValues}
                    onReset={() => setIsEditModeOff()}
                  />
                  <Button
                    type="button"
                    label="Close"
                    className="p-button-da px-3 py-2 m-2"
                    style={{
                      borderRadius: "9px",
                      backgroundColor: "#000000",
                    }}
                    onClick={() => HandleClose()}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProductFormComponnent;
