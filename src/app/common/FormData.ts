export interface UserTypes {
  _id: number | null;
  name: string;
  username: string;
  email: string;
  phone: number | null;
  designation: string;
  jobType: string;
  JobLocation: string;
  salary: number | null;
  joiningDate: Date;
  ExperienceLevel: string;
  shiftTiming: string;
  noticePeriod: string | boolean | null;
  probationPeriod: string | boolean | null;
  NoticePeriodDuration: string | null;
  PrefferedLocations: string[];
  PrefferedType: string[];
}

export const DesignationOptions = [
  { name: "ReactJs developer", code: "RD" },
  { name: "Web designer", code: "WD" },
  { name: "NodeJs developer", code: "ND" },
  { name: "UI/UX designer", code: "UI/UX" },
  { name: "Flutter developer", code: "FD" },
  { name: "Laravel developer", code: "LD" },
  { name: "Mern-stack developer", code: "MERN" },
  { name: "PHP developer", code: "PHP" },
  { name: "data analyst", code: "DA" },
  { name: "Project coordinator", code: "PC" },
  { name: "Project manager", code: "PM" },
];

export const jobTypeOptions = [
  { name: "full-time", code: "full-time" },
  { name: "part-time", code: "part-time" },
  { name: "Internship", code: "Internship" },
  { name: "Freelancer", code: "Freelancer" },
];

export const jobLocationsOptions = [
  { name: "on-site", code: "on-site" },
  { name: "Remote", code: "Remote" },
  { name: "Hybrid", code: "Hybrid" },
];

export const ExperienceLevelOptions = [
  { name: "fresher", code: "fresher" },
  { name: "intermediate", code: "intermediate" },
  { name: "senior level", code: "senior level" },
  { name: "executive level", code: "executive level" },
];

export const shiftTimingOptions = [
  { name: "general shift", code: "GS" },
  { name: "second shift", code: "SS" },
  { name: "night shift", code: "NS" },
  { name: "first shift", code: "FS" },
];

export const NoticePeriodDurationOptions = [
  { name: "Immediate joining", code: "IJ" },
  { name: "1 month", code: "1M" },
  { name: "2 month", code: "2M" },
  { name: "3 month", code: "3M" },
  { name: "4 month", code: "4M" },
  { name: "5 month", code: "5M" },
  { name: "6 month", code: "6M" },
  { name: "7 month", code: "7M" },
  { name: "8 month", code: "8M" },
  { name: "9 month", code: "9M" },
  { name: "10 month", code: "10M" },
  { name: "11 month", code: "11M" },
  { name: "12 month", code: "12M" },
];

const AddForm = [
  {
    id: 1,
    label: "Employee name",
    name: "name",
    placeHolder: "enter your name",
    inputType: "String",
    fieldType: "InputText",
    filter: "filter",
  },
  {
    id: 2,
    label: "Username",
    name: "username",
    placeHolder: "enter your username",
    inputType: "String",
    fieldType: "InputText",
    filter: "filter",
  },
  {
    id: 3,
    label: "Email address",
    name: "email",
    placeHolder: "enter your email",
    inputType: "string",
    fieldType: "InputText",
    filter: "filter",
  },
  {
    id: 4,
    label: "Contact No",
    name: "phone",
    placeHolder: "enter your phone",
    inputType: "Number",
    fieldType: "InputText",
    filter: "filter",
  },
  {
    id: 5,
    label: "Designation",
    name: "designation",
    placeHolder: "enter your designation",
    inputType: "string",
    fieldType: "Dropdown",
    filter: "filter",
    filterElement: "DesignationRowFIlterTemplate",
    options: [
      { name: "ReactJs developer", code: "RD" },
      { name: "Web designer", code: "WD" },
      { name: "NodeJs developer", code: "ND" },
      { name: "UI/UX designer", code: "UI/UX" },
      { name: "Flutter developer", code: "FD" },
      { name: "Laravel developer", code: "LD" },
      { name: "Mern-stack developer", code: "MERN" },
      { name: "PHP developer", code: "PHP" },
      { name: "data analyst", code: "DA" },
      { name: "Project coordinator", code: "PC" },
      { name: "Project manager", code: "PM" },
    ],
  },
  {
    id: 6,
    label: "Job type",
    name: "jobType",
    placeHolder: "enter your Job-type",
    inputType: "string",
    fieldType: "Checkbox",
    filter: "filter",
    value: [
      { name: "full-time", code: "full-time" },
      { name: "part-time", code: "part-time" },
      { name: "Internship", code: "Internship" },
      { name: "Freelancer", code: "Freelancer" },
    ],
  },
  {
    id: 7,
    label: "Job location",
    name: "JobLocation",
    placeHolder: "enter your job location",
    inputType: "String",
    fieldType: "RadioButton",
    filter: "filter",
    value: [
      { name: "on-site", code: "on-site" },
      { name: "Remote", code: "Remote" },
      { name: "Hybrid", code: "Hybrid" },
    ],
  },
  {
    id: 8,
    label: "Experience level",
    name: "ExperienceLevel",
    placeHolder: "enter your experience",
    inputType: "String",
    fieldType: "RadioButton",
    filter: "filter",
    value: [
      { name: "fresher", code: "fresher" },
      { name: "intermediate", code: "intermediate" },
      { name: "senior level", code: "senior level" },
      { name: "executive level", code: "executive level" },
    ],
  },
  {
    id: 9,
    label: "Income details (monthly)",
    name: "salary",
    placeHolder: "enter your salary",
    inputType: "Number",
    fieldType: "InputText",
    filter: "filter",
  },
  {
    id: 10,
    label: "Joining date",
    name: "joiningDate",
    placeHolder: "enter Joinig date",
    inputType: "Date",
    fieldType: "Calender",
    showButtonBar: "showButtonBar",
    dateFormat: "dd/mm/yy",
  },
  {
    id: 11,
    label: "Shift timing",
    name: "shiftTiming",
    placeHolder: "Select shift timing",
    inputType: "string",
    fieldType: "Dropdown",
    filter: "filter",
    options: [
      { name: "general shift", code: "GS" },
      { name: "second shift", code: "SS" },
      { name: "night shift", code: "NS" },
      { name: "first shift", code: "FS" },
    ],
  },
  {
    id: 12,
    label: "Serving notice period",
    name: "noticePeriod",
    placeHolder: "Are you serving notice period?",
    inputType: "string",
    fieldType: "RadioButton",
    value: [
      { name: true, code: "Yes" },
      { name: false, code: "No" },
    ],
  },
  {
    id: 13,
    label: "Serving probation period",
    name: "probationPeriod",
    placeHolder: "Are you serving probation period?",
    inputType: "boolean",
    fieldType: "RadioButton",
    value: [
      { name: true, code: "Yes" },
      { name: false, code: "no" },
    ],
  },
  {
    id: 14,
    label: "Notice period duration",
    name: "NoticePeriodDuration",
    placeHolder: "enter the duration of notice period",
    inputType: "string",
    fieldType: "Dropdown",
    filter: "filter",
    disabled: "disabled",
    options: [
      { name: "0 months", code: "IJ" },
      { name: "1 months", code: "1M" },
      { name: "2 months", code: "2M" },
      { name: "3 months", code: "3M" },
      { name: "4 months", code: "4M" },
      { name: "5 months", code: "5M" },
      { name: "6 months", code: "6M" },
      { name: "7 months", code: "7M" },
      { name: "8 months", code: "8M" },
      { name: "9 months", code: "9M" },
      { name: "10 months", code: "10M" },
      { name: "11 months", code: "11M" },
      { name: "12 months", code: "12M" },
    ],
  },
  {
    id: 15,
    label: "Preffered Locations",
    name: "PrefferedLocations",
    placeHolder: "Enter your preffered locations",
    inputType: "string",
    fieldType: "MultiSelect",
    options: [
      { name: "Surat", code: "ST" },
      { name: "Bharuch", code: "BH" },
      { name: "Vadodara", code: "VD" },
      { name: "Ahmedabad", code: "AMD" },
      { name: "Ankleswar", code: "Ank" },
      { name: "Karjan", code: "KJ" },
      { name: "Mumbai", code: "Mum" },
    ],
    maxSelectedLabels: 3,
    display: "chip",
  },
  {
    id: 16,
    label: "Preffered job type",
    name: "PrefferedType",
    placeHolder: "Enter your preffered job type",
    inputType: "string",
    fieldType: "GroupCheckbox",
    value: [
      { name: "on-site", code: "OS" },
      { name: "Remote", code: "RM" },
      { name: "Hybrid", code: "HB" },
      { name: "Extra", code: "EX" },
      { name: "Extras", code: "EsX" },
    ],
    maxSelectedLabels: 3,
    display: "chip",
  },
];

export default AddForm;