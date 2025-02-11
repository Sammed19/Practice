import { Box, Button, CardContent, Grid2, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ThankYouProps {
  cartItems: any[];
}

const ThankYou: React.FC<ThankYouProps> = ({ cartItems }) => {
  const navigate = useNavigate();

  useEffect(() => {}, []);
  return (
    <Grid2
      sx={{
        width: "100%",
        textAlign: "left",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#FFF",
      }}
    >
      <Grid2 item xs={12}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <img
            src="./../../public/assets/hamburger/k.svg"
            alt="confirm_order"
            className="confirm_order"
            style={{}}
          />
          <Typography
            sx={{
              fontWeight: 530,

              mt: 2,
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2.0rem" },
            }}
          >
            Thank You!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 1,
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
            }}
          >
            Your order has been received.
          </Typography>
        </Box>
        <Box sx={{ overflowY: "auto", height: "calc(100vh - 300px)" }}>
          {cartItems &&
            cartItems.map((data, index) => {
              return (
                <CardContent key={index}>
                  <Box
                    sx={{
                      padding: 2,
                      backgroundColor: "rgba(247, 247, 247, 1)",
                      border: "1px solid rgba(234, 234, 234, 1)",
                    }}
                  >
                    <Typography
                      color="rgba(41, 41, 41, 1)"
                      sx={{
                        fontSize: { xs: "14px", sm: "16px", md: "18px" },
                        fontWeight: 520,
                      }}
                    >
                      {data.medicationName} {data.dosage}
                    </Typography>
                    <Typography
                      color="rgba(41, 41, 41, 1)"
                      sx={{
                        fontSize: {
                          xs: "14px",
                          sm: "16px",
                          md: "18px",
                          fontWeight: 520,
                        },
                      }}
                    >
                      Rx {data.rxNumber} • {data.capsules} capsules • for
                      {data.assignedTo}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      border: "1px solid rgba(255, 255, 255, 1)",
                      padding: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 520,
                        color: "rgba(41, 41, 41, 1)",
                        fontSize: { xs: "14px", sm: "16px", md: "18px" },
                      }}
                    >
                      {data.deliveryType}
                    </Typography>
                    <Typography
                      color="rgba(52, 56, 60, 1)"
                      sx={{
                        fontSize: {
                          xs: "14px",
                          sm: "16px",
                          md: "18px",
                          fontWeight: 500,
                        },
                      }}
                    >
                      {data.deliveryDate} {data.deliveryTime}
                    </Typography>
                    <Typography
                      color="rgba(52, 56, 60, 1)"
                      sx={{
                        fontSize: {
                          xs: "14px",
                          sm: "16px",
                          md: "18px",
                          fontWeight: "500",
                        },
                      }}
                    >
                      {data.address && data.address.address}
                    </Typography>
                    <Typography
                      color="rgba(52, 56, 60, 1)"
                      sx={{
                        mt: 1,
                        fontWeight: 500,
                        fontSize: { xs: "14px", sm: "16px", md: "18px" },
                      }}
                    >
                      Tracking number will be provided when your prescription is
                      available for delivery.
                    </Typography>
                  </Box>
                </CardContent>
              );
            })}
        </Box>
        <Button
          sx={{
            backgroundColor: "rgba(92, 11, 138, 1)",
            borderRadius: "5px",
            color: "#fff",
            width: "100%",
            textTransform: "none",
            padding: "15px",
          }}
          onClick={() => navigate("/prescription")}
        >
          Back to Home
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default ThankYou;
