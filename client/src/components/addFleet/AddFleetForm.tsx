import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../../utils/api/config";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";

const AddFleetForm = () => {
  const { notify } = useToast();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      cityName: "",
      projectName: "",
      vehicleType: "",
      vehicleNumber: "",
      isCorporationVehicle: false,
      chassisNumber: "",
      engineNumber: "",
      rcBookNumber: "",
      rcFile: null,
      insurancePolicyNumber: "",
      insuranceRenewalDate: "",
      insuranceExpiryDate: "",
      insuranceFile: null,
      pucNumber: "",
      pucRenewalDate: "",
      pucExpiryDate: "",
      pucFile: null,
      fitnessRenewalDate: "",
      fitnessExpiryDate: "",
      fitnessFile: null,
      areaName: "",
      driverName: "",
      driverLicenseNumber: "",
      driverLicenseFile: null,
    },
    validationSchema: Yup.object({
      cityName: Yup.string().required("City Name is required"),
      projectName: Yup.string().required("Project Name is required"),
      vehicleType: Yup.string().required("Vehicle Type is required"),
      vehicleNumber: Yup.string().required("Vehicle Number is required"),
      isCorporationVehicle: Yup.boolean(),
      chassisNumber: Yup.string().required("Chassis Number is required"),
      engineNumber: Yup.string().required("Engine Number is required"),
      rcBookNumber: Yup.string().required("RC Book Number is required"),
      rcFile: Yup.mixed().required("RC File is required"),
      insurancePolicyNumber: Yup.string().required(
        "Insurance Policy Number is required"
      ),
      insuranceRenewalDate: Yup.date().required(
        "Insurance Renewal Date is required"
      ),
      insuranceExpiryDate: Yup.date().required(
        "Insurance Expiry Date is required"
      ),
      insuranceFile: Yup.mixed().required("Insurance File is required"),
      pucNumber: Yup.string().required("PUC Number is required"),
      pucRenewalDate: Yup.date().required("PUC Renewal Date is required"),
      pucExpiryDate: Yup.date().required("PUC Expiry Date is required"),
      pucFile: Yup.mixed().required("PUC File is required"),
      fitnessRenewalDate: Yup.date().required(
        "Fitness Renewal Date is required"
      ),
      fitnessExpiryDate: Yup.date().required("Fitness Expiry Date is required"),
      fitnessFile: Yup.mixed().required("Fitness File is required"),
      areaName: Yup.string().required("Area Name is required"),
      driverName: Yup.string().required("Driver Name is required"),
      driverLicenseNumber: Yup.string().required(
        "Driver License Number is required"
      ),
      driverLicenseFile: Yup.mixed().required(
        "Driver License File is required"
      ),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await fetch(
          `http://localhost:5500/${api.API_URL.auth.login}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();
        if (response.status === 400) {
          notify({
            message: "Invalid credentials. Please try again.",
            type: "error",
            position: "top-right",
            duration: 5000,
          });
        } else if (!response.ok) {
          throw new Error(data.msg || "Something went wrong");
        } else {
          notify({
            message: "Successfully logged in",
            type: "success",
            position: "top-right",
            duration: 5000,
          });

          resetForm();

          setTimeout(() => {
            navigate("/");
          }, 900);
          setTimeout(() => {
            window.location.reload();
          }, 900);
        }
      } catch (error: any) {
        notify({
          message: error?.msg || "Failed to log in",
          type: "error",
          position: "top-right",
          duration: 5000,
        });
        window.isLoggedIn = false;
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Fleet
          </h2>
        </div>

        <div className="mt-10">
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 flex items-center w-full flex-wrap justify-between"
          >
            {/* General Information */}
            <h3 className="w-full text-lg font-semibold text-gray-900">
              General Information
            </h3>
            <div>
              <label
                htmlFor="cityName"
                className="block w-[300px] text-sm font-medium leading-6 text-gray-900"
              >
                City Name
              </label>
              <input
                id="cityName"
                name="cityName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cityName}
                className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.cityName && formik.errors.cityName ? (
                <div className="mt-2 text-sm text-red-600">
                  {formik.errors.cityName}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="projectName"
                className="block w-[300px] text-sm font-medium leading-6 text-gray-900"
              >
                Project Name
              </label>
              <input
                id="projectName"
                name="projectName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.projectName}
                className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.projectName && formik.errors.projectName ? (
                <div className="mt-2 text-sm text-red-600">
                  {formik.errors.projectName}
                </div>
              ) : null}
            </div>

            {/* Vehicle Information */}
            <h3 className="w-full text-lg font-semibold text-gray-900">
              Vehicle Information
            </h3>
            <div>
              <label
                htmlFor="vehicleType"
                className="block w-[300px] text-sm font-medium leading-6 text-gray-900"
              >
                Vehicle Type
              </label>
              <input
                id="vehicleType"
                name="vehicleType"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.vehicleType}
                className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.vehicleType && formik.errors.vehicleType ? (
                <div className="mt-2 text-sm text-red-600">
                  {formik.errors.vehicleType}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="vehicleNumber"
                className="block w-[300px] text-sm font-medium leading-6 text-gray-900"
              >
                Vehicle Number
              </label>
              <input
                id="vehicleNumber"
                name="vehicleNumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.vehicleNumber}
                className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.vehicleNumber && formik.errors.vehicleNumber ? (
                <div className="mt-2 text-sm text-red-600">
                  {formik.errors.vehicleNumber}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="isCorporationVehicle"
                className="block w-[300px] text-sm font-medium leading-6 text-gray-900"
              >
                Is Corporation Vehicle
              </label>
              <input
                id="isCorporationVehicle"
                name="isCorporationVehicle"
                type="checkbox"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.isCorporationVehicle}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              {formik.touched.isCorporationVehicle &&
              formik.errors.isCorporationVehicle ? (
                <div className="mt-2 text-sm text-red-600">
                  {formik.errors.isCorporationVehicle}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="chassisNumber"
                className="block w-[300px] text-sm font-medium leading-6 text-gray-900"
              >
                Chassis Number
              </label>
              <input
                id="chassisNumber"
                name="chassisNumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.chassisNumber}
                className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.chassisNumber && formik.errors.chassisNumber ? (
                <div className="mt-2 text-sm text-red-600">
                  {formik.errors.chassisNumber}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="engineNumber"
                className="block w-[300px] text-sm font-medium leading-6 text-gray-900"
              >
                Engine Number
              </label>
              <input
                id="engineNumber"
                name="engineNumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.engineNumber}
                className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.engineNumber && formik.errors.engineNumber ? (
                <div className="mt-2 text-sm text-red-600">
                  {formik.errors.engineNumber}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="rcBookNumber"
                className="block w-[300px] text-sm font-medium leading-6 text-gray-900"
              >
                RC Book Number
              </label>
              <input
                id="rcBookNumber"
                name="rcBookNumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rcBookNumber}
                className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.rcBookNumber && formik.errors.rcBookNumber ? (
                <div className="mt-2 text-sm text-red-600">
                  {formik.errors.rcBookNumber}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="rcFile"
                className="block w-[300px] text-sm font-medium leading-6 text-gray-900"
              >
                RC File
              </label>
              <input
                id="rcFile"
                name="rcFile"
                type="file"
                onChange={(event: any) =>
                  formik.setFieldValue("rcFile", event.currentTarget.files[0])
                }
                onBlur={formik.handleBlur}
                className="block w-[300px] text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
              />
              {formik.touched.rcFile && formik.errors.rcFile ? (
                <div className="mt-2 text-sm text-red-600">
                  {formik.errors.rcFile}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="insuranceExpiryDate"
                className="block w-[300px] text-sm font-medium leading-6 text-gray-900"
              >
                Insurance Expiry Date
              </label>
              <input
                id="insuranceExpiryDate"
                name="insuranceExpiryDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.insuranceExpiryDate}
                className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.insuranceExpiryDate &&
              formik.errors.insuranceExpiryDate ? (
                <div className="mt-2 text-sm text-red-600">
                  {formik.errors.insuranceExpiryDate}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="insuranceFile"
                className="block w-[300px] text-sm font-medium leading-6 text-gray-900"
              >
                Insurance File
              </label>
              <input
                id="insuranceFile"
                name="insuranceFile"
                type="file"
                onChange={(event: any) =>
                  formik.setFieldValue(
                    "insuranceFile",
                    event.currentTarget.files[0]
                  )
                }
                onBlur={formik.handleBlur}
                className="block w-[300px] text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
              />
              {formik.touched.insuranceFile && formik.errors.insuranceFile ? (
                <div className="mt-2 text-sm text-red-600">
                  {formik.errors.insuranceFile}
                </div>
              ) : null}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="mt-6 w-[300px] rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFleetForm;
