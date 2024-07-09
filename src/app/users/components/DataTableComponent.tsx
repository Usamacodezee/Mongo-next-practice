import Image from "next/image";
import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import { FilterMatchMode } from "primereact/api";
import { RootState, AppDispatch } from "@/redux/store";
import NotFound from "../../../../public/notfound.svg";
import React, { useRef, useState } from "react";
import AddForm, {
  DesignationOptions,
  ExperienceLevelOptions,
  UserTypes,
  jobLocationsOptions,
  jobTypeOptions,
  shiftTimingOptions,
} from "@/app/common/UserFormData";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { Tag } from "primereact/tag";
import moment from "moment";
import Link from "next/link";
import { MultiSelectChangeEvent } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import "@/app/globals.css";
import { Skeleton } from "primereact/skeleton";

interface DataTableComponentProps {
  loading: boolean;
  fetchData: () => void;
  setLoadingOff: () => void;
  setLoadingOn: () => void;
  HandleUpdateRecord: (rowData: any) => void;
  handleDeleteModal: (rowData: any) => void;
}

interface FilterType extends DataTableFilterMeta {
  designation: DataTableFilterMetaData;
  jobType: DataTableFilterMetaData;
  JobLocation: DataTableFilterMetaData;
  ExperienceLevel: DataTableFilterMetaData;
  shiftTiming: DataTableFilterMetaData;
  NoticePeriodDuration: DataTableFilterMetaData;
}

const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  designation: { value: null, matchMode: FilterMatchMode.EQUALS },
  jobType: { value: null, matchMode: FilterMatchMode.EQUALS },
  JobLocation: { value: null, matchMode: FilterMatchMode.EQUALS },
  ExperienceLevel: { value: null, matchMode: FilterMatchMode.EQUALS },
  salary: { value: null, matchMode: FilterMatchMode.EQUALS },
  shiftTiming: { value: null, matchMode: FilterMatchMode.EQUALS },
};

const DataTableComponent: React.FC<DataTableComponentProps> = ({
  loading,
  fetchData,
  setLoadingOff,
  setLoadingOn,
  HandleUpdateRecord,
  handleDeleteModal,
}) => {
  const dt = useRef<DataTable<UserTypes[]>>(null);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.users);
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

  const [filters, setFilters] = useState<FilterType>(
    defaultFilters as FilterType
  );

  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const All = user.length;

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    (_filters["global"] as DataTableFilterMetaData).value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const refreshData = () => {
    setLoadingOn();
    fetchData();
    setLoadingOff();
  };

  const paginatorRight = (
    <div className="d-flex">
      <div className="px-1">
        <div className="">
          <i
            className="pi pi-refresh fw-bold px-2 paginatorButtons"
            onClick={() => {
              refreshData();
            }}
          />
        </div>
      </div>
      <div className="px-1">
        <i
          className="pi pi-download fw-bold px-2 paginatorButtons"
          onClick={exportCSV}
        />
      </div>
    </div>
  );

  const renderHeader = () => {
    return (
      <div className="mt-1">
        <div className="d-flex px-3" style={{ justifyContent: "flex-end" }}>
          <div className="d-flex my-1" style={{ justifyContent: "flex-end" }}>
            <IconField iconPosition="left" className="m-1">
              <InputText
                value={globalFilterValue}
                style={{ height: "3rem", width: "15rem", borderRadius: "10px" }}
                className="px-3"
                onChange={onGlobalFilterChange}
                placeholder="Keyword Search"
              />
            </IconField>
          </div>
        </div>
      </div>
    );
  };

  const ActionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <div className="d-flex mb-2">
          <i
            className="pi pi-pen-to-square mx-2"
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={() => HandleUpdateRecord(rowData)}
          />
          <i
            className="pi pi-trash mx-2"
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={() => handleDeleteModal(rowData)}
          />
        </div>
      </React.Fragment>
    );
  };

  const DesignationRowFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <Dropdown
        value={options.value}
        options={DesignationOptions}
        onChange={(e: MultiSelectChangeEvent) => {
          const selectedValues = [e.value.name];
          const updatedFilters = { ...filters };
          updatedFilters.designation = {
            ...updatedFilters.designation,
            value: selectedValues,
          };
          setFilters(updatedFilters);
          options.filterApplyCallback(selectedValues);
        }}
        optionLabel="name"
        placeholder="Search by role"
        className="p-column-filter"
        style={{ minWidth: "5rem" }}
      />
    );
  };

  const JobTypeRowFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <Dropdown
        value={options.value}
        options={jobTypeOptions}
        onChange={(e: MultiSelectChangeEvent) => {
          const selectedValues = [e.value.name];
          setFilters((prevFilters) => ({
            ...prevFilters,
            jobType: {
              ...prevFilters.designation,
              value: selectedValues,
            },
          }));

          options.filterApplyCallback(selectedValues);
        }}
        optionLabel="name"
        placeholder="Search by role"
        className="p-column-filter"
        style={{ minWidth: "5rem" }}
      />
    );
  };

  const JobLocationRowFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <Dropdown
        value={options.value}
        options={jobLocationsOptions}
        onChange={(e: MultiSelectChangeEvent) => {
          const selectedValues = e.value.name;
          setFilters((prevFilters) => ({
            ...prevFilters,
            JobLocation: {
              ...prevFilters.designation,
              value: selectedValues,
            },
          }));

          options.filterApplyCallback(selectedValues);
        }}
        optionLabel="name"
        placeholder="Search by role"
        className="p-column-filter"
        style={{ minWidth: "5rem" }}
      />
    );
  };

  const ExperienceLevelRowFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <Dropdown
        value={options.value}
        options={ExperienceLevelOptions}
        onChange={(e: MultiSelectChangeEvent) => {
          const selectedValues = [e.value.name];
          setFilters((prevFilters) => ({
            ...prevFilters,
            ExperienceLevel: {
              ...prevFilters.designation,
              value: selectedValues,
            },
          }));

          options.filterApplyCallback(selectedValues);
        }}
        optionLabel="name"
        placeholder="Search by role"
        className="p-column-filter"
        style={{ minWidth: "5rem" }}
      />
    );
  };

  const shiftTimingRowFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <Dropdown
        value={options.value}
        options={shiftTimingOptions}
        onChange={(e: MultiSelectChangeEvent) => {
          const selectedValues = [e.value.name];
          setFilters((prevFilters) => ({
            ...prevFilters,
            shiftTiming: {
              ...prevFilters.designation,
              value: selectedValues,
            },
          }));

          options.filterApplyCallback(selectedValues);
        }}
        optionLabel="name"
        placeholder="Search by role"
        className="p-column-filter"
        style={{ minWidth: "5rem" }}
      />
    );
  };

  // const fetchData = () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, 2000);
  //   });
  // };

  return (
    <div className="p-mb-4">
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          ref={dt}
          showGridlines
          removableSort
          tableStyle={{
            minWidth: "50rem",
            width: "84vw",
          }}
          value={user}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50, All]}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} out of {totalRecords} users"
          paginatorRight={paginatorRight}
          dataKey="id"
          filters={filters}
          filterDisplay="row"
          loading={loading}
          globalFilterFields={[
            "name",
            "email",
            "phone",
            "designation.name",
            "jobType",
            "JobLocation",
            "salary",
            "ExperienceLevel",
            "joiningDate",
            "shiftTiming",
          ]}
          header={renderHeader}
        >
          {AddForm?.map((fields: any, index: number) => (
            <Column
              className="py-2"
              key={index}
              field={fields?.name}
              header={
                <div
                  style={{
                    fontSize: "1rem",
                    paddingRight: "15px",
                    fontWeight: "bolder",
                  }}
                >
                  {fields?.label}
                </div>
              }
              sortable
              filter={fields?.filter}
              filterPlaceholder={`Search ${fields?.name}`}
              filterElement={
                fields?.name === "designation"
                  ? DesignationRowFilterTemplate
                  : fields?.name === "jobType"
                  ? JobTypeRowFilterTemplate
                  : fields?.name === "JobLocation"
                  ? JobLocationRowFilterTemplate
                  : fields?.name === "ExperienceLevel"
                  ? ExperienceLevelRowFilterTemplate
                  : fields?.name === "shiftTiming"
                  ? shiftTimingRowFilterTemplate
                  : null
              }
              showFilterMenu={false}
              style={{
                textAlign: "center",
                fontWeight: "600",
                minWidth: "15rem",
              }}
              body={(rowData: any) => {
                if (loading) {
                  return <Skeleton width="100%" height="2rem" />;
                }
                if (fields?.name === "name") {
                  return (
                    <>
                      <Link
                        id="userdetailsid"
                        href={`/users/${rowData[fields?.name]}?id=${
                          rowData._id
                        }`}
                      >
                        <div className="userdetailsid">
                          {rowData[fields?.name]}
                        </div>
                      </Link>

                      <Tooltip target="#userdetailsid" position="top">
                        <p className="p-1 mx-2">
                          <i
                            className="bi-person-circle"
                            style={{
                              padding: "0px 10px 0px 0px",
                              fontSize: "1.4rem",
                              color: "white",
                            }}
                          />
                          view user details
                        </p>
                      </Tooltip>
                    </>
                  );
                } else if (fields?.name === "joiningDate") {
                  const formattedDate = moment(rowData[fields?.name]).format(
                    "Do MMM YY"
                  );
                  return formattedDate;
                } else if (fields?.name === "salary") {
                  return (
                    <>
                      <span style={{ fontWeight: "600" }}>
                        INR {rowData[fields?.name]}
                      </span>
                      <span style={{ fontSize: "0.7rem" }}>.00</span> /-
                    </>
                  );
                } else if (fields?.name === "phone") {
                  return <>+91 {rowData[fields?.name]}</>;
                } else if (fields?.name === "noticePeriod") {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {rowData[fields?.name] === true ? (
                        <Tag
                          severity="success"
                          className=" px-4 py-2"
                          style={{
                            fontWeight: "bolder",
                            backgroundColor: "#82bb51",
                          }}
                        >
                          Yes
                        </Tag>
                      ) : (
                        <Tag
                          className=" px-4 py-2 "
                          style={{
                            fontWeight: "bolder",
                            backgroundColor: "#ff6767",
                          }}
                        >
                          No
                        </Tag>
                      )}
                    </div>
                  );
                } else if (fields?.name === "probationPeriod") {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {rowData[fields?.name] === true ? (
                        <Tag
                          severity="success"
                          className="px-4 py-2"
                          style={{
                            fontWeight: "bolder",
                            backgroundColor: "#82bb51",
                          }}
                        >
                          Yes
                        </Tag>
                      ) : (
                        <Tag
                          severity="danger"
                          className="px-4 py-2"
                          style={{
                            fontWeight: "bolder",
                            backgroundColor: "#ff6767",
                          }}
                        >
                          No
                        </Tag>
                      )}
                    </div>
                  );
                } else if (fields?.name === "PrefferedLocations") {
                  return (
                    <>
                      {rowData[fields?.name]?.map(
                        (data: string, index: number) => (
                          <div key={index}>
                            <span>{data},</span>
                          </div>
                        )
                      )}
                    </>
                  );
                } else if (fields?.name === "PrefferedType") {
                  return (
                    <div>
                      {rowData[fields?.name]?.map(
                        (data: string, index: number) => (
                          <div key={index}>
                            <span>{data},</span>
                          </div>
                        )
                      )}
                    </div>
                  );
                } else if (fields?.name === "NoticePeriodDuration") {
                  return (
                    <>
                      {rowData[fields?.name] === "0 months"
                        ? "Immediate joininig"
                        : rowData[fields?.name]
                        ? rowData[fields?.name]
                        : "-"}
                    </>
                  );
                } else {
                  return <>{rowData[fields?.name]}</>;
                }
              }}
            />
          ))}
          <Column
            body={ActionBodyTemplate}
            style={{ textAlign: "center", minWidth: "15rem" }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default DataTableComponent;
