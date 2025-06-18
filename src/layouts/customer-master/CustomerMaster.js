import React, { useState,useEffect } from "react";

// MUI Components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard Components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Layout Components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Import DataTable
import DataTable from "examples/Tables/DataTable";

// Import the form dialog
import CustomerForm from "./CustomerForm";

const initialCustomers = [
  { id: 1, name: "Mohan Raj", email: "mohanrjs@.com", phone: "1234567890", city: "Bangalore" },
  { id: 2, name: "Jackson", email: "jack@gmail.com", phone: "0987654321", city: "Chennai" },
  { id: 3, name: "Wasim Akram", email: "wasim@example.com", phone: "5555555555", city: "Coimbatore" },
];

function CustomerMaster() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleAddCustomer = (newCustomer) => {
    // Add a unique ID (increment max id by 1)
    const id = customers.length ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    setCustomers([...customers, { id, ...newCustomer }]);
  };
 useEffect(() => {}, [customers]);

  // Prepare data for DataTable
  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    { Header: "City", accessor: "city" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={3} mb={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3} display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h5">Customer Master</MDTypography>
                <MDButton variant="gradient" color="info" onClick={handleOpenForm}>
                  New Customer
                </MDButton>
              </MDBox>

              <MDBox p={3}>
                <div className="p-1 datatable pb-0">
                <DataTable
                  table={{
                    columns,
                    rows: customers,
                  }}
                  entriesPerPage
                  canSearch
                  showTotalEntries
                  isSorted
                />
                </div>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      <CustomerForm
        open={openForm}
        handleClose={() => {
          handleCloseForm();
        }}
        onSubmit={(data) => {
          handleAddCustomer(data);
          handleCloseForm();
        }}
      />
    </DashboardLayout>
  );
}

export default CustomerMaster;
