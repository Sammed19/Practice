import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ManagePrescription from "./ManagePrescriptiondata.json";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import {
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

interface ManagePrescriptionLeftProps {
  setRightData: Dispatch<SetStateAction<{}>>;
  setCartCount: Dispatch<SetStateAction<number>>;
  addToCart: (count: number) => void;
  handleSelectAllPres: (item: any, isChecked: boolean) => void;
  rightData: {};
}

const PrescriptionListLeft: React.FC<ManagePrescriptionLeftProps> = ({
  setRightData,
  setCartCount,
  addToCart,
  handleSelectAllPres,
  rightData,
}) => {
  const [prescriptions, setPrescriptions] = useState(
    ManagePrescription.prescriptions.map((item: any) => ({
      ...item,
      checked: false,
    }))
  );
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedPrescription, setSelectedPrescription] = useState<object>(
    ManagePrescription.prescriptions[0] || null
  );

  useEffect(() => {
    const selectCount = prescriptions.filter((p) => p.checked).length;
    setCartCount(selectCount);
    setRightData(selectedPrescription);
    console.log(selectedCount);
  }, [prescriptions, setCartCount, selectedPrescription, rightData]);

  const handleSelectAll = () => {
    const allSelected = !selectAll;
    const updatedPrescriptions = prescriptions.map((prescription: []) => ({
      ...prescription,
      checked: allSelected,
    }));
    setPrescriptions(updatedPrescriptions);
    setSelectAll(allSelected);
    setSelectedCount(allSelected ? updatedPrescriptions.length : 0);
    handleSelectAllPres(prescriptions, allSelected);
  };

  useEffect(() => {
    handleSelectAllPres([], false);
  }, []);

  const handleCardClick = (data: object) => {
    setSelectedPrescription(data);
  };

  const handleCheckboxChange = (id: number) => {
    const updatedPrescriptions = prescriptions.map((prescription) => {
      if (prescription.id === id) {
        addToCart(prescription);
        return { ...prescription, checked: !prescription.checked };
      }
      return prescription;
    });

    const checkedCount = updatedPrescriptions.filter(
      (prescription) => prescription.checked
    ).length;

    setPrescriptions(updatedPrescriptions);

    setSelectAll(checkedCount === updatedPrescriptions.length);
  };

  return (
    <Box
      sx={{
        padding: 0.5,
        height: "calc(100vh - 250px)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(255, 255, 255, 1)",
        border: "1px solid rgba(234, 234, 234, 1)",
        paddingInline: "20px",
      }}
    >
      <Grid container alignItems="center">
        {/* Toggle Button Section */}
        <Grid item xs={6} style={{ paddingTop: "30px", paddingLeft: "0px" }}>
          <ToggleSwitch />
        </Grid>
        {/* Select All Section */}
        <Grid
          item
          xs={6}
          textAlign="end"
          sx={{
            paddingRight: "46px",
            paddingTop: "10px",
          }}
        >
          <FormControlLabel
            label="Select all"
            labelPlacement="start"
            control={
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAll}
                id="selectAll"
                sx={{
                  color: "rgba(234, 234, 234, 1)",
                  "&.Mui-checked": {
                    color: "rgba(92, 11, 138, 1)",
                  },
                }}
              />
            }
          />
        </Grid>
      </Grid>

      {/* Scrollable Section */}
      <Box
        className="left-section"
        sx={{
          marginTop: 3,
          overflowY: "auto",
          height: { xs: "300px", sm: "400px", md: "500px" },
          scrollbarWidth: "thin"
        }}
      >
        {prescriptions.map((data) => (
          <Card
            key={data.id}
            onClick={() => handleCardClick(data)}
            sx={{
              marginBottom: 2,
              "&:hover": {
                      backgroundColor: "#f0f0f0", // Changes background color on hover
                    },
              cursor: "pointer",
              backgroundColor:
                selectedPrescription?.id === data.id
                  ? "rgba(255, 255, 255, 1)"
                  : "rgba(247, 247, 247, 1)",
              border:
                selectedPrescription?.id === data.id
                  ? "1px solid rgba(189, 131, 202, 1)"
                  : "1px solid rgba(234, 234, 234, 1)",
            }}
          >
            <CardContent sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  marginRight: 2,
                  objectFit: "cover",
                  
     
                    
                  
                }}
                image={`./../assets/hamburger/${data.icon}`}
                alt="Medication"
              />
              <Box sx={{ flex: 1 }}>
                <Box display="flex" flex="1" justifyContent="space-between">
                  <Box display="flex">
                    {data.refrigerationRequired ? (
                      <>
                        <Typography
                          sx={{ paddingRight: "5px" }}
                          fontWeight={530}
                        >
                          {data.medicationName}
                        </Typography>
                        <Typography fontWeight={530}>{data.dosage}</Typography>
                        <div
                          style={{
                            height: "30px",
                            width: "30px",
                            paddingLeft: "10px",
                          }}
                        >
                          <img src="../../../public/assets/hamburger/freeze.png" />
                        </div>
                      </>
                    ) : (
                      <>
                        <Typography
                          sx={{ paddingRight: "5px" }}
                          fontWeight={530}
                        >
                          {data.medicationName}
                        </Typography>
                        <Typography fontWeight={530}>{data.dosage}</Typography>
                      </>
                    )}
                  </Box>
                </Box>
                <Box display="flex">
                  <Typography>{data.quantity} capsules</Typography>
                </Box>
                <Typography>For: {data.assignedTo}</Typography>
                <Typography>Refill Due Date: {data.refillDueDate}</Typography>
              </Box>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <Box sx={{ paddingRight: "5px" }}>
                  {data.status !== "" ? (
                    <Button
                      sx={{
                        textTransform: "none",
                        color: "black",
                        backgroundColor: "#C6ECFD",
                        borderRadius: "25px",
                        gap: "10px",
                        fontSize: "14px",
                        padding: "8px",
                        height: "26px",
                      }}
                    >
                      {data.status}
                    </Button>
                  ) : (
                    ""
                  )}
                  <Checkbox
                    checked={data.checked}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleCheckboxChange(data.id)}
                    sx={{
                      color: "rgba(234, 234, 234, 1)",
                      "&.Mui-checked": {
                        color: "rgba(92, 11, 138, 1)",
                      },
                    }}
                  />
                </Box>
                {selectedPrescription?.id === data.id ? (
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "14px",
                      paddingRight: "10px",
                    }}
                  >
                    <img
                      src="../../../public/assets/hamburger/AutoRefill.png"
                      style={{ padding: "5px" }}
                    />
                    <Typography style={{ color: "#5C0B8A" }}>
                      Auto Refill
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "14px",
                      paddingRight: "10px",
                    }}
                  >
                    <img
                      src="../../../public/assets/hamburger/autoRefillWhite.png"
                      style={{ padding: "5px" }}
                    />
                  </Box>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#5C0B8A",
                borderRadius: "50%",
                padding: "5px",
              }}
              src="../../../public/assets/hamburger/Union.svg"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "15px",
              }}
            >
              <Typography>Manage auto refill</Typography>
              <Typography>
                Sign up for auto refill and get your refill right on time ,
                every time
              </Typography>
            </Box>
          </Box>
          <ChevronRight style={{ fontSize: "35px", color: "#5C0B8A" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default PrescriptionListLeft;
