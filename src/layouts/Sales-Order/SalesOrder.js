import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Divider,
  IconButton,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const STORAGE_KEY = "item_master_data";

function SalesOrder() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [openSummary, setOpenSummary] = useState(false);

  useEffect(() => {
    const storedItems = localStorage.getItem(STORAGE_KEY);
    if (storedItems) setItems(JSON.parse(storedItems));
  }, []);

  const handleAddToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const handleQuantityChange = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const isInCart = (id) => cart.some((item) => item.id === id);

  const getCartItem = (id) => cart.find((item) => item.id === id);

  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={3} mb={3}>
        <Card>
          <MDBox p={3}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <MDTypography variant="h5" sx={{ userSelect: "none" }}>
                Item List
              </MDTypography>
              {cart.length > 0 && (
                <MDButton color="success" onClick={() => setOpenSummary(true)}>
                  Checkout
                </MDButton>
              )}
            </MDBox>
            <Divider />
            <MDBox
              mt={2}
              maxHeight={480}
              sx={{ overflowY: items.length > 6 ? "auto" : "visible" }}
            >
              {items.map((item) => {
                const cartItem = getCartItem(item.id);
                return (
                  <MDBox
                    key={item.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    py={1}
                    px={2}
                    borderBottom="1px solid #eee"
                  >
                    <MDBox>
                      <MDTypography variant="body1" fontWeight="medium" noWrap>
                        {item.name}
                      </MDTypography>
                      <MDTypography variant="body2" color="textSecondary" noWrap>
                        Category: {item.category}
                      </MDTypography>
                      <MDTypography variant="body2" color="textSecondary" noWrap>
                        Price: ₹{item.price}
                      </MDTypography>
                    </MDBox>
                    <MDBox>
                      {!cartItem ? (
                        <MDButton
                          variant="contained"
                          color="info"
                          size="small"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add to Cart
                        </MDButton>
                      ) : (
                        <MDBox display="flex" alignItems="center">
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            <Icon fontSize="small">remove</Icon>
                          </IconButton>
                          <MDTypography
                            variant="body2"
                            mx={1}
                            sx={{ minWidth: "24px", textAlign: "center" }}
                          >
                            {cartItem.quantity}
                          </MDTypography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <Icon fontSize="small">add</Icon>
                          </IconButton>
                        </MDBox>
                      )}
                    </MDBox>
                  </MDBox>
                );
              })}
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />

      {/* Order Summary Dialog */}
      <Dialog
        open={openSummary}
        onClose={() => setOpenSummary(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Order Summary</DialogTitle>
        <DialogContent>
          <MDBox sx={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid black",
                fontSize: "0.85rem",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Qty</th>
                  <th style={thStyle}>Price</th>
                  <th style={thStyle}>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(({ id, name, quantity, price }) => (
                  <tr key={id}>
                    <td style={tdStyle}>{name}</td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>{quantity}</td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>₹{price}</td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>
                      ₹{price * quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
             <tfoot>
  <tr>
    <td colSpan={3} style={{ ...tdStyle, fontWeight: "bold", textAlign: "right" }}>
      Subtotal:
    </td>
    <td style={{ ...tdStyle, textAlign: "right" }}>
      ₹{calculateTotal().toFixed(2)}
    </td>
  </tr>
  <tr>
    <td colSpan={3} style={{ ...tdStyle, textAlign: "right" }}>CGST (3%)</td>
    <td style={{ ...tdStyle, textAlign: "right" }}>
      ₹{(calculateTotal() * 0.03).toFixed(2)}
    </td>
  </tr>
  <tr>
    <td colSpan={3} style={{ ...tdStyle, textAlign: "right" }}>SGST (3%)</td>
    <td style={{ ...tdStyle, textAlign: "right" }}>
      ₹{(calculateTotal() * 0.03).toFixed(2)}
    </td>
  </tr>
  <tr>
    <td colSpan={3} style={{ ...tdStyle, fontWeight: "bold", textAlign: "right" }}>
      Grand Total:
    </td>
    <td style={{ ...tdStyle, fontWeight: "bold", textAlign: "right" }}>
      ₹{(calculateTotal() * 1.18).toFixed(2)}
    </td>
  </tr>
</tfoot>

            </table>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSummary(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

// Styles
const thStyle = {
  border: "1px solid black",
  padding: "6px 8px",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const tdStyle = {
  border: "1px solid black",
  padding: "6px 8px",
};

export default SalesOrder;
