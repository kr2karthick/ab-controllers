/**
=========================================================
* Admin Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Metleaf Solutions (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Admin Dashboard 2 React base styles
import borders from "assets/theme/base/borders";

// Admin Dashboard 2 React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { borderRadius } = borders;

const tableHead = {
  styleOverrides: {
    root: {
      display: "block",
      padding: `${pxToRem(16)} ${pxToRem(16)} 0  ${pxToRem(16)}`,
      borderRadius: `${borderRadius.xl} ${borderRadius.xl} 0 0`,
    },
  },
};

export default tableHead;
