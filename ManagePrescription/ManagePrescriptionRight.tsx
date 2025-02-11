import { Card, CardMedia, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Button } from "@mui/material";

import ModalPopup from "./../modals/Modal_Popup";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface ManagePrescriptionRightProps {
  rightData: any;
  setRightData: Dispatch<SetStateAction<{}>>;
}

const ManagePrescriptionRight: React.FC<ManagePrescriptionRightProps> = ({
  rightData,
}) => {
  const medicalDetails = rightData;

  const [medicalInfo, setMedicalInfo] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const pickUpFlow = () => {
    setMedicalInfo(true);
  };

  const fullText = medicalDetails.instructions || "";
  const truncatedText =
    fullText.length > 85 ? fullText.slice(0, 80) + "..." : fullText;

  return (
    <Box
      sx={{
        top: "0px",
        height: "calc(100vh - 250px)", // Full viewport height
        overflowY: "scroll", // Scrollbar for overflowing content// Padding for better spacing
        scrollbarWidth: "thin", // Thin scrollbar for Firefox
       
        "&::-webkit-scrollbar": {
          width: "8px", // Width of the scrollbar
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#aaa", // Scrollbar thumb color
          borderRadius: "4px", // Rounded edges for thumb
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#888", // Thumb color on hover
        },
       
      }}
    >
      <Card 


>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "20px",
            backgroundColor: "#919191",
            borderBottomLeftRadius:"25px",
              borderBottomRightRadius:"25px",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "300px",
              height: "200px",
                
             
              // borderRadius: "10px",
              
              objectFit: "cover",
            }}
            image={`./../assets/hamburger/${medicalDetails.icon}`}
            alt="Medication"
          />
        </div>
     
        <Box sx={{ padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                gap: "5px",
              }}
            >
              <Typography sx={{ fontWeight: "530", fontSize: "20px" }}>
                {medicalDetails.medicationName}
              </Typography>
              <Typography sx={{ fontWeight: "530", fontSize: "20px" }}>
                {medicalDetails.dosage}
              </Typography>
            </Box>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <img src="../../../public/assets/hamburger/AutoRefill.png" />

              <Typography sx={{ fontSize: "12px", color: "#5C0B8A" }}>
                Auto Refill Enabled
              </Typography>
            </div>
          </Box>

          
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "15px",
              marginTop:"10px"
            }}
          >
            {medicalDetails.refrigerationRequired && (
              <Button
                sx={{
                  textTransform: "none",
                  color: "black",
                  backgroundColor: "#F7F7F7",
                  borderRadius: "25px",
                  gap: "10px",
                  fontWeight: "500",
                  fontSize: "12px",
                  padding: "8px",
                  marginBottom: "12px",
                }}
              >
                <img src="../../../public/assets/hamburger/freeze.png" />
                Refrigeration required
              </Button>
            )}
            <Button
              sx={{
                textTransform: "none",
                color: "black",
                backgroundColor: "#F7F7F7",
                borderRadius: "25px",
                gap: "10px",
                fontWeight: "500",
                fontSize: "12px",
                padding: "8px",
                marginBottom: "12px",
                color: "#34383C",
              }}
            >
              <img src="../../../public/assets/hamburger/S.png" />
              Speciality medication
            </Button>
          </Box>
          <Typography sx={{ marginRight: "5px", color: "#34383C" }}>
            {medicalDetails.quantity} capsules • for {medicalDetails.assignedTo}
          </Typography>
          <Typography sx={{ color: "#34383C" }}>
            Refill due on: {medicalDetails.refillDue}
          </Typography>
          <Typography sx={{ color: "#34383C" }}>
            Last copay: {medicalDetails.copay}
          </Typography>
         
          <Button
            variant="outlined"
            sx={{
              color: "#5C0B8A",
              border: " 0.5px solid #5C0B8A",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "520",
              marginBottom: "18px",
              marginTop: "24px",
            }}
            fullWidth
            onClick={pickUpFlow}
          >
            Medication Information
          </Button>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              marginTop: "12px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{ fontWeight: "520", fontSize: "14px", color: "#53565A" }}
              >
                Prescriber
              </Typography>
              <Typography
                sx={{ fontWeight: "520", fontSize: "16px", color: "#34383C" }}
              >
                {medicalDetails.prescriber}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{ fontWeight: "520", fontSize: "14px", color: "#53565A" }}
              >
                Days supply
              </Typography>
              <Typography
                sx={{ fontWeight: "520", fontSize: "16px", color: "#34383C" }}
              >
                {medicalDetails.daysSupply}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{ fontWeight: "520", fontSize: "14px", color: "#53565A" }}
              >
                Rx number
              </Typography>
              <Typography
                sx={{ fontWeight: "520", fontSize: "16px", color: "#34383C" }}
              >
                {medicalDetails.rxNumber}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{ fontWeight: "520", fontSize: "14px", color: "#53565A" }}
              >
                Rx expiration date
              </Typography>
              <Typography
                sx={{ fontWeight: "520", fontSize: "16px", color: "#34383C" }}
              >
                {medicalDetails.expirationDate}
              </Typography>
            </Box>
          </Box>
          <br />

          <Box>
            <Typography
              sx={{ fontWeight: "520", fontSize: "14px", color: "#53565A" }}
            >
              Medication Instructions
            </Typography>

            <Typography
              sx={{
                fontWeight: "520",
                fontSize: "16px",
                color: "#34383C",
                paddingBottom: "4px",
              }}
            >
              {isExpanded ? fullText : truncatedText}
              {fullText && fullText.length > 92 && (
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => setIsExpanded(!isExpanded)}
                  sx={{
                    textTransform: "none",
                    fontSize: "14px",
                    color: "#5C0B8A",
                  }}
                >
                  {isExpanded ? "See less" : "See more"}
                </Button>
              )}
            </Typography>
          </Box>
          <br />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#f0f0f0",
              padding: 2,
              borderRadius: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={"../../../public/assets/hamburger/user_headset.png"}
                alt="Your Image"
                style={{ marginRight: 8 }}
              />
              <Box>
                <Typography sx={{ fontWeight: "520", fontSize: "14px" }}>
                  Question about your Prescription ?
                </Typography>
                <Typography sx={{ fontWeight: "520", fontSize: "16px" }}>
                  Chat with Vivo Pharmacist
                </Typography>
              </Box>
            </Box>
            <ChevronRightIcon sx={{ fontSize: 35, color: "#5C0B8A" }} />
          </Box>
        </Box>
        <ModalPopup
          open={medicalInfo}
          onClose={() => setMedicalInfo(false)}
          title="Medication information"
          showFooter={false}
        >
          <Typography
            sx={{
              fontSize: "24px",
              color: "rgba(41, 41, 41, 1)",
              fontWeight: 530,
            }}
          >
            {medicalDetails.medicationName} {medicalDetails.dosage}
          </Typography>
          <Typography
            sx={{
              color: "rgba(52, 56, 60, 1)",
              fontSize: "16px",
              fontWeight: 500,
              paddingBottom: "30px",
            }}
          >
            {medicalDetails.tab_short_desc}
          </Typography>
          <Typography
            sx={{
              color: "rgba(41, 41, 41, 1)",
              fontSize: "18px",
              fontWeight: 520,
            }}
          >
            Details
          </Typography>
          <Typography
            sx={{
              color: "rgba(52, 56, 60, 1)",
              fontSize: "16px",
              fontWeight: 500,
              paddingBottom: "30px",
            }}
          >
            {medicalDetails.details}
          </Typography>
          <Typography
            sx={{
              color: "rgba(41, 41, 41, 1)",
              fontSize: "18px",
              fontWeight: 520,
            }}
          >
            Side effects
          </Typography>
          <Typography
            sx={{
              color: "rgba(52, 56, 60, 1)",
              fontSize: "16px",
              fontWeight: 500,
              paddingBottom: "30px",
            }}
          >
            {medicalDetails.side_effect}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#f0f0f0",
              padding: 2,
              borderRadius: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={"../../../public/assets/hamburger/user_headset.png"}
                alt="Your Image"
                style={{ marginRight: 8 }}
              />
              <Box>
                <Typography sx={{ fontWeight: "520", fontSize: "14px" }}>
                  Question about your Prescription ?
                </Typography>
                <Typography sx={{ fontWeight: "520", fontSize: "16px" }}>
                  Chat with Vivo Pharmacist
                </Typography>
              </Box>
            </Box>
            <ChevronRightIcon sx={{ fontSize: 35, color: "#5C0B8A" }} />
          </Box>
        </ModalPopup>
      </Card>
    </Box>
  );
};

export default ManagePrescriptionRight;
