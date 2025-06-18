import React, { useState, useEffect } from "react";

// MUI
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

// Material Dashboard Components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";


// Item Form
import ItemForm from "./ItemForm";

// LocalStorage Key
const STORAGE_KEY = "item_master_data";

function ItemMaster() {
  const [items, setItems] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setItems(JSON.parse(stored));
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "success" }), 3000);
  };

  const handleOpenForm = () => {
    setEditItem(null); // new item
    setOpenForm(true);
  };

  const handleCloseForm = () => setOpenForm(false);

  const handleAddOrUpdateItem = (data) => {
    if (editItem) {
      // Update
      const updated = items.map((item) => (item.id === editItem.id ? { ...editItem, ...data } : item));
      setItems(updated);
      showAlert("Item updated successfully!", "success");
    } else {
      // Add
      const id = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
      setItems([...items, { id, ...data }]);
      showAlert("Item added successfully!", "success");
    }
    handleCloseForm();
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    showAlert("Item deleted successfully!", "error");
  };

  // DataTable columns with actions
  const columns = [
   // { Header: "ID", accessor: "id"},
    { Header: "Name", accessor: "name" },
    { Header: "Category", accessor: "category" },
    { Header: "Price", accessor: "price"},
    {
      Header: "Actions",
      accessor: "actions",
      width: "15%",
      Cell: ({ row }) => (
        <>
          <IconButton size="small" color="info" onClick={() => handleEdit(row.original)}>
            <Icon>edit</Icon>
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleDelete(row.original.id)}>
            <Icon>delete</Icon>
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mt={1} mb={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3} display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h5">Item Master</MDTypography>
                <MDButton variant="gradient" color="info" onClick={handleOpenForm}>
                  New Item
                </MDButton>
              </MDBox>

              {/* Alert */}
              {alert.show && (
                <MDBox px={1} mb={1}>
                  <MDAlert
                    color={alert.type}
                    sx={{
                      py: 0.5,
                      px: 1.5,
                      fontSize: "0.875rem",
                      alignItems: "center",
                    }}
                  >
                    <Icon fontSize="small" sx={{ mr: 1 }}>
                      {alert.type === "error" ? "error" : "check_circle"}
                    </Icon>
                    {alert.message}
                  </MDAlert>
                </MDBox>
              )}

              {/* Table */}
              <MDBox px={3} pb={3}>
              <div className="p-1 datatable pb-0">
              <DataTable
                  table={{ columns, rows:items }}
                  dense
                  canSearch
                  entriesPerPage
                  canSort
                  highlightOnHover
                  showTotalEntries />
               </div>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />

      {/* Form Dialog */}
      <ItemForm
        open={openForm}
        handleClose={handleCloseForm}
        onSubmit={handleAddOrUpdateItem}
        initialData={editItem}
      />
    </DashboardLayout>
  );
}

export default ItemMaster;
