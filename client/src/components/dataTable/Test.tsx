import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";

const columns = [
  {
    header: "Vehicle ID",
    accessorKey: "vehicleId",
  },
  {
    header: "City Name",
    accessorKey: "cityName",
  },
  {
    header: "Project Name",
    accessorKey: "projectName",
  },
  {
    header: "Vehicle Type",
    accessorKey: "vehicleType",
  },
  {
    header: "Vehicle Number",
    accessorKey: "vehicleNumber",
  },
  {
    header: "Is Corporation Vehicle",
    accessorKey: "isCorporationVehicle",
    Cell: ({ value }: any) => (value ? "Yes" : "No"),
  },
  {
    header: "Chassis Number",
    accessorKey: "chassisNumber",
  },
  {
    header: "Engine Number",
    accessorKey: "engineNumber",
  },
  {
    header: "RC Book Number",
    accessorKey: "rcBookNumber",
  },
  {
    header: "Insurance Policy Number",
    accessorKey: "insurancePolicyNumber",
  },
  {
    header: "Insurance Renewal Date",
    accessorKey: "insuranceRenewalDate",
  },
  {
    header: "Insurance Expiry Date",
    accessorKey: "insuranceExpiryDate",
  },
  {
    header: "PUC Number",
    accessorKey: "pucNumber",
  },
  {
    header: "PUC Renewal Date",
    accessorKey: "pucRenewalDate",
  },
  {
    header: "PUC Expiry Date",
    accessorKey: "pucExpiryDate",
  },
  {
    header: "Fitness Renewal Date",
    accessorKey: "fitnessRenewalDate",
  },
  {
    header: "Fitness Expiry Date",
    accessorKey: "fitnessExpiryDate",
  },
  {
    header: "Area Name",
    accessorKey: "areaName",
  },
  {
    header: "Driver Name",
    accessorKey: "driverName",
  },
  {
    header: "Driver License Number",
    accessorKey: "driverLicenseNumber",
  },
];

function Test() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFleetData = async () => {
      try {
        const response = await fetch("http://localhost:5500/api/v1/fleet", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error("Data fetch was not successful");
        }
      } catch (error: any) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchFleetData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-4">
      <h1>My Data Table</h1>
      <DataTable data={data} columns={columns} />
    </div>
  );
}

export default Test;
