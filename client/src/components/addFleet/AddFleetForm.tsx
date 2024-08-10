import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../../utils/api/config";
import useToast from "../../hooks/useToast";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  cityName: Yup.string().required("City is required"),
  projectName: Yup.string().required("Project Name is required"),
  vehicleType: Yup.string().required("Vehicle Type is required"),
  vehicleNumber: Yup.string().required("Vehicle Number is required"),
  isCorporationVehicle: Yup.boolean(),
  chassisNumber: Yup.string().required("Chassis Number is required"),
  engineNumber: Yup.string().required("Engine Number is required"),
  rcBookNumber: Yup.string().required("RC Book Number is required"),
  insurancePolicyNumber: Yup.string().required(
    "Insurance Policy Number is required"
  ),
  insuranceRenewalDate: Yup.date().required(
    "Insurance Renewal Date is required"
  ),
  insuranceExpiryDate: Yup.date().required("Insurance Expiry Date is required"),
  pucNumber: Yup.string().required("PUC Number is required"),
  pucRenewalDate: Yup.date().required("PUC Renewal Date is required"),
  pucExpiryDate: Yup.date().required("PUC Expiry Date is required"),
  fitnessRenewalDate: Yup.date().required("Fitness Renewal Date is required"),
  fitnessExpiryDate: Yup.date().required("Fitness Expiry Date is required"),
  areaName: Yup.string().required("Area Name is required"),
  driverName: Yup.string().required("Driver Name is required"),
  driverLicenseNumber: Yup.string().required(
    "Driver License Number is required"
  ),
});

export const AddFleetForm = ({ vehicle }: any) => {
  const { notify } = useToast();
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
      insurancePolicyNumber: "",
      insuranceRenewalDate: "",
      insuranceExpiryDate: "",
      pucNumber: "",
      pucRenewalDate: "",
      pucExpiryDate: "",
      fitnessRenewalDate: "",
      fitnessExpiryDate: "",
      areaName: "",
      driverName: "",
      driverLicenseNumber: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log({ values });

      try {
        const response = await fetch(
          `http://localhost:5500/${api.API_URL.fleet.add}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const data = await response.json();
        if (data.success) {
          notify({
            message: data.msg,
            type: "success",
          });
          resetForm();
        } else {
          notify({
            message: data.message || "Error adding fleet",
            type: "error",
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Failed to submit the form:", error);
        notify({
          message: error.message,
          type: "error",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        {" "}
        {vehicle ? "Edit Fleet" : "Add Fleet"}
      </h1>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-xl font-medium mb-4">Vehicle Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="cityName"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                id="cityName"
                name="cityName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cityName}
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.cityName && formik.errors.cityName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.cityName && formik.errors.cityName ? (
                <p className="text-red-500 text-sm">{formik.errors.cityName}</p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="projectName"
                className="block text-sm font-medium text-gray-700"
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
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.projectName && formik.errors.projectName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.projectName && formik.errors.projectName ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.projectName}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="vehicleType"
                className="block text-sm font-medium text-gray-700"
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
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.vehicleType && formik.errors.vehicleType
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.vehicleType && formik.errors.vehicleType ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.vehicleType}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="vehicleNumber"
                className="block text-sm font-medium text-gray-700"
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
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.vehicleNumber && formik.errors.vehicleNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.vehicleNumber && formik.errors.vehicleNumber ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.vehicleNumber}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="chassisNumber"
                className="block text-sm font-medium text-gray-700"
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
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.chassisNumber && formik.errors.chassisNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.chassisNumber && formik.errors.chassisNumber ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.chassisNumber}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="engineNumber"
                className="block text-sm font-medium text-gray-700"
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
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.engineNumber && formik.errors.engineNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.engineNumber && formik.errors.engineNumber ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.engineNumber}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="rcBookNumber"
                className="block text-sm font-medium text-gray-700"
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
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.rcBookNumber && formik.errors.rcBookNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.rcBookNumber && formik.errors.rcBookNumber ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.rcBookNumber}
                </p>
              ) : null}
            </div>

            <div className="flex items-center">
              <label
                htmlFor="isCorporationVehicle"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <input
                  id="isCorporationVehicle"
                  name="isCorporationVehicle"
                  type="checkbox"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.isCorporationVehicle}
                  className="mr-2"
                />
                Corporation Vehicle
              </label>
            </div>
          </div>
        </div>

        {/* Insurance Details */}
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-xl font-medium mb-4">Insurance Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="insurancePolicyNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Insurance Policy Number
              </label>
              <input
                id="insurancePolicyNumber"
                name="insurancePolicyNumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.insurancePolicyNumber}
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.insurancePolicyNumber &&
                  formik.errors.insurancePolicyNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.insurancePolicyNumber &&
              formik.errors.insurancePolicyNumber ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.insurancePolicyNumber}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="insuranceRenewalDate"
                className="block text-sm font-medium text-gray-700"
              >
                Insurance Renewal Date
              </label>
              <input
                id="insuranceRenewalDate"
                name="insuranceRenewalDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.insuranceRenewalDate}
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.insuranceRenewalDate &&
                  formik.errors.insuranceRenewalDate
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.insuranceRenewalDate &&
              formik.errors.insuranceRenewalDate ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.insuranceRenewalDate}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="insuranceExpiryDate"
                className="block text-sm font-medium text-gray-700"
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
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.insuranceExpiryDate &&
                  formik.errors.insuranceExpiryDate
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.insuranceExpiryDate &&
              formik.errors.insuranceExpiryDate ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.insuranceExpiryDate}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* PUC Details */}
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-xl font-medium mb-4">PUC Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="pucNumber"
                className="block text-sm font-medium text-gray-700"
              >
                PUC Number
              </label>
              <input
                id="pucNumber"
                name="pucNumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pucNumber}
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.pucNumber && formik.errors.pucNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.pucNumber && formik.errors.pucNumber ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.pucNumber}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="pucRenewalDate"
                className="block text-sm font-medium text-gray-700"
              >
                PUC Renewal Date
              </label>
              <input
                id="pucRenewalDate"
                name="pucRenewalDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pucRenewalDate}
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.pucRenewalDate && formik.errors.pucRenewalDate
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.pucRenewalDate && formik.errors.pucRenewalDate ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.pucRenewalDate}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="pucExpiryDate"
                className="block text-sm font-medium text-gray-700"
              >
                PUC Expiry Date
              </label>
              <input
                id="pucExpiryDate"
                name="pucExpiryDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pucExpiryDate}
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.pucExpiryDate && formik.errors.pucExpiryDate
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.pucExpiryDate && formik.errors.pucExpiryDate ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.pucExpiryDate}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Fitness Details */}
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-xl font-medium mb-4">Fitness Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="fitnessRenewalDate"
                className="block text-sm font-medium text-gray-700"
              >
                Fitness Renewal Date
              </label>
              <input
                id="fitnessRenewalDate"
                name="fitnessRenewalDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fitnessRenewalDate}
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.fitnessRenewalDate &&
                  formik.errors.fitnessRenewalDate
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.fitnessRenewalDate &&
              formik.errors.fitnessRenewalDate ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.fitnessRenewalDate}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="fitnessExpiryDate"
                className="block text-sm font-medium text-gray-700"
              >
                Fitness Expiry Date
              </label>
              <input
                id="fitnessExpiryDate"
                name="fitnessExpiryDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fitnessExpiryDate}
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.fitnessExpiryDate &&
                  formik.errors.fitnessExpiryDate
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.fitnessExpiryDate &&
              formik.errors.fitnessExpiryDate ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.fitnessExpiryDate}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Owner Details */}
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-xl font-medium mb-4">Owner Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="areaName"
                className="block text-sm font-medium text-gray-700"
              >
                Area Name
              </label>
              <input
                id="areaName"
                name="areaName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.areaName}
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.areaName && formik.errors.areaName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.areaName && formik.errors.areaName ? (
                <p className="text-red-500 text-sm">{formik.errors.areaName}</p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="driverName"
                className="block text-sm font-medium text-gray-700"
              >
                Driver Name
              </label>
              <input
                id="driverName"
                name="driverName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.driverName}
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.driverName && formik.errors.driverName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.driverName && formik.errors.driverName ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.driverName}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="driverLicenseNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Driver License Number
              </label>
              <input
                id="driverLicenseNumber"
                name="driverLicenseNumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.driverLicenseNumber}
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched.driverLicenseNumber &&
                  formik.errors.driverLicenseNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.driverLicenseNumber &&
              formik.errors.driverLicenseNumber ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.driverLicenseNumber}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600"
          >
            {vehicle ? "Update Fleet" : "Add Fleet"}
          </button>
        </div>
      </form>
    </div>
  );
};
