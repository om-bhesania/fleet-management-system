import React, { useEffect, useState } from "react";
import DataTable from "../dataTable/DataTable";
import { AddFleetForm } from "../addFleet/AddFleetForm";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import {
  fetchFleetData,
  deleteFleet,
  updateFleet,
  addFleet,
} from "../../utils/fleetApiClient";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatData = (data: any[]) => {
  return data.map((item) => ({
    ...item,
    insurancerenewaldate: formatDate(item.insurancerenewaldate),
    insuranceexpirydate: formatDate(item.insuranceexpirydate),
    pucrenewaldate: formatDate(item.pucrenewaldate),
    pucexpirydate: formatDate(item.pucexpirydate),
    fitnessrenewaldate: formatDate(item.fitnessrenewaldate),
    fitnessexpirydate: formatDate(item.fitnessexpirydate),
  }));
};

function FleetData() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const columns = [
    { header: "Vehicle ID", accessorKey: "vehicleid" },
    { header: "City Name", accessorKey: "cityname" },
    { header: "Project Name", accessorKey: "projectname" },
    { header: "Vehicle Type", accessorKey: "vehicletype" },
    { header: "Vehicle Number", accessorKey: "vehiclenumber" },
    {
      header: "Is Corporation Vehicle",
      accessorKey: "iscorporationvehicle",
      Cell: ({ value }: any) => (value ? "Yes" : "No"),
    },
    { header: "Chassis Number", accessorKey: "chassisnumber" },
    { header: "Engine Number", accessorKey: "enginenumber" },
    { header: "RC Book Number", accessorKey: "rcbooknumber" },
    { header: "Insurance Policy Number", accessorKey: "insurancepolicynumber" },
    {
      header: "Insurance Renewal Date",
      accessorKey: "insurancerenewaldate",
      Cell: ({ value }: any) => formatDate(value),
    },
    {
      header: "Insurance Expiry Date",
      accessorKey: "insuranceexpirydate",
      Cell: ({ value }: any) => formatDate(value),
    },
    { header: "PUC Number", accessorKey: "pucnumber" },
    {
      header: "PUC Renewal Date",
      accessorKey: "pucrenewaldate",
      Cell: ({ value }: any) => formatDate(value),
    },
    {
      header: "PUC Expiry Date",
      accessorKey: "pucexpirydate",
      Cell: ({ value }: any) => formatDate(value),
    },
    {
      header: "Fitness Renewal Date",
      accessorKey: "fitnessrenewaldate",
      Cell: ({ value }: any) => formatDate(value),
    },
    {
      header: "Fitness Expiry Date",
      accessorKey: "fitnessexpirydate",
      Cell: ({ value }: any) => formatDate(value),
    },
    { header: "Area Name", accessorKey: "areaname" },
    { header: "Driver Name", accessorKey: "drivername" },
    { header: "Driver License Number", accessorKey: "driverlicensenumber" },
 
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFleetData();
        if (result.success) {
          setData(formatData(result.data));
        } else {
          throw new Error("Data fetch was not successful");
        }
      } catch (error: any) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (row: any) => {
    setSelectedVehicle(row);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFleet(id);
      setData((prevData) => prevData.filter((item) => item.vehicleid !== id));
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleAddOrUpdate = async (data: any) => {
    try {
      if (selectedVehicle) {
        await updateFleet(selectedVehicle.vehicleid, data);
      } else {
        await addFleet(data);
      }
      // Refresh data after adding or updating
      const result = await fetchFleetData();
      if (result.success) {
        setData(formatData(result.data));
      } else {
        throw new Error("Data fetch was not successful");
      }
      setOpen(false);
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className="">
      <h1>My Data Table</h1>
      {error && <div>Error: {error}</div>}
      <div className="overflow-y-auto">
        <DataTable
          data={data}
          columns={columns}
          modalData={
            <AddFleetForm
              vehicle={selectedVehicle}
              onSubmit={handleAddOrUpdate}
              onClose={() => setOpen(false)}
              selectedId={selectedVehicle?.vehicleid}
            />
          }
          buttonLabel={
            <div className="flex items-center gap-2">
              <AddCircleIcon /> Add Fleet Data
            </div>
          }
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default FleetData;
