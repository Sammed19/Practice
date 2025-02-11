import React from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface cartProps {
  cartCount: number;
}

const MPFooter: React.FC<cartProps> = ({ cartCount }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        // position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#fff",
        boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "flex-end", // Align button to the right
        alignItems: "center", // Center button vertically
        padding: "14px", // Add some inner spacing
        zIndex: 1000, // Ensure it's above other components
        
      }}
    >
      {cartCount > 0 ? (
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginRight: "15px",
            height: "45px", // Space between button and right edge
            // minWidth: "150px",
            width: "42%",
            textTransform: "none",
            backgroundColor: "#5C0B8A",

            // Ensure button has enough width to be noticeable
          }}
          onClick={() => navigate("/cart")}
        >
          {/* {cartCount > 0 ? `(${cartCount} Items) Added to Cart` : "Added to Cart"} */}
          {cartCount > 0
            ? `(${cartCount} ${
                cartCount === 1 ? "Item" : "Items"
              }) Added to Cart`
            : "Added to Cart"}
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
};

export default MPFooter;
