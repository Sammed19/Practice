import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalPopup from "./../modals/Modal_Popup";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CallIcon from "@mui/icons-material/Call";

import {
  Card,
  Box,
  CardContent,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  CardMedia,
  IconButton,
} from "@mui/material";
import Maps from "./maps";
import AddressHome from "./cartData.json";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIossIcon from "@mui/icons-material/ArrowBackIos";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface CartComponentProps {
  cartItems: any[];
}

const CartComponent: React.FC<CartComponentProps> = ({ cartItems }) => {
  interface NewAddressAdd {
    address1: string;
    address2: string;
    zipcode: number | null;
    city: string;
    state: string;
  }
  const navigate = useNavigate();
  const [prescriptions] = useState(cartItems || []);
  const [medicalInfo, setMedicalInfo] = useState(false);
  const [selectedImage, setSelectImage] = useState<String | null>(null);
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(true);
  const [locationEnable, setLocationEnable] = useState(false);

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [mapsLoc, setMapsLoc] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  // const [orderRec, setOrderRec] = useState(false);
  const [mailDelivery, setMailDelivery] = useState(false);
  const [selectedHome, setSelectedHome] = useState<any>(null);
  const [homeAddressAdd, setHomeAddressAdd] = useState<any[]>(
    AddressHome.homeAddress || []
  );
  const [addresForm, setAddresForm] = useState(false);
  const [dateTimeShow, setDateTimeShow] = useState(false);
  const [address, setAddress] = useState<NewAddressAdd>({
    address1: "",
    address2: "",
    state: "",
    city: "",
    zipcode: null,
  });
  const [errors, setErrors] = useState({
    address1: "",
    zipcode: "",
    city: "",
    state: "",
  });
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  console.log(prescriptions);

  // Default locations
  const defaultLocations = [
    { lat: 40.748817, lng: -73.985428, label: "Pharmacy 1" }, // Example: New York
    { lat: 34.052235, lng: -118.243683, label: "Pharmacy 2" }, // Example: Los Angeles
    { lat: 41.878113, lng: -87.629799, label: "Pharmacy 3" }, // Example: Chicago
    { lat: 29.760427, lng: -95.369804, label: "Pharmacy 4" }, // Example: Houston
  ];

  const TimeSlot = [
    "9:00 - 11:00 am",
    "11:00 - 1:00 pm",
    "1:00 - 3:00 pm",
    "3:00 - 5:00 pm",
    "5:00 - 9:00 pm",
  ];
  const [selectedTimeSlot, setSelectTimeSlot] = useState<String | null>(null);

  const [deliveryId, setDeliveryId] = useState(null);
  const handleBackClick = () => {
    navigate("/prescription");
  };

  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  const handleSelectTimeSlot = (time: any) => {
    setSelectTimeSlot(time);
  };
  const handleMapsSelectionChange = (pharmacy: any, slot: string | null) => {
    setSelectedPharmacy(pharmacy);
    setSelectedSlot(slot);
  };

  const pickUpFlow = (data: any) => {
    setMedicalInfo(true);
    setDeliveryId(data);
  };

  const handleCloseModal = () => {
    setMedicalInfo(false);
    setIsConfirmEnabled(true);
    setSelectImage(null);
    setLocationEnable(false);
    setMailDelivery(false);
    setMapsLoc(false);
    setAddresForm(false);
    setErrors({ address1: "", state: "", city: "", zipcode: "" });
    setAddress({
      address1: "",
      state: "",
      city: "",
      zipcode: null,
      address2: "",
    });
  };

  const handleImageClick = (image: string) => {
    setSelectImage(image);
    setIsConfirmEnabled(false);
  };

  const handleSave = () => {
    if (selectedImage === "Pickup") {
      setLocationEnable(true);
      setMedicalInfo(false);
    } else if (selectedImage === "Delivery") {
      setMailDelivery(true);
      setMedicalInfo(false);
      setDateTimeShow(true);
    } else if (selectedImage === "MailOrder") {
      setMailDelivery(true);
      setMedicalInfo(false);
      setDateTimeShow(false);
    }
  };

  const mapsLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setMapsLoc(true);
          setLocationEnable(false);
        },
        () => {
          setMapsLoc(true);
          setLocationEnable(false);
        }
      );
    } else {
      setMapsLoc(true);
      setLocationEnable(false);
    }
  };

  const confirmLocation = () => {
    if (selectedPharmacy === null && selectedSlot === null) {
      alert("Please select the pharmacy and time slot");
    } else {
      setMapsLoc(false);
      setSelectImage(null);
      prescriptions.filter((ind) => {
        if (deliveryId === ind.id) {
          (ind.deliveryType = selectedImage),
            (ind.deliveryTime = selectedSlot),
            (ind.deliveryDate = selectedDate),
            (ind.address = selectedPharmacy);
        }
      });
    }
  };

  const handleSelectHome = (home: any, index: any) => {
    setSelectedHome(home);
    setSelectedAddress(index);
  };

  const addConfirmLocation = () => {
    if (selectedHome !== null) {
      setMailDelivery(false);
      setAddresForm(false);
      setIsConfirmEnabled(true);
      setSelectImage(null);
      setSelectedAddress(null);
      prescriptions.filter((ind) => {
        if (deliveryId === ind.id) {
          ind.deliveryType = selectedImage;
          ind.address = selectedHome;
          ind.deliveryTime = selectedTimeSlot;
          ind.deliveryDate = selectedDate;
        }
      });
    } else {
      alert("Please select the home address");
    }
  };

  const addNewLocation = () => {
    if (
      address.address1.trim() === "" ||
      address.zipcode === null ||
      (!isNaN(address.zipcode) &&
        address.city.trim() === "" &&
        address.state.trim() === "")
    ) {
      alert("Please fill all the fields");
      return;
    }

    const newItem = {
      name: address.address1,
      address: `${address.address2} ${address.city} ${address.state} ${address.zipcode}`,
      mobile: "(212) 555-1234",
    };

    setHomeAddressAdd((prev) => {
      const updateAddress = [...prev, newItem];
      setSelectedAddress(updateAddress.length - 1);
      return updateAddress;
    });

    // setMailDelivery(true)
    setAddresForm(false);

    setAddress({
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: null,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setErrors({
        ...errors,
        [name]: "Please entry the value",
      });
    }
  };

  const handleDateChange = (direction: "next" | "prev") => {
    const currentDate = new Date(selectedDate);
    if (direction === "next") {
      currentDate.setDate(currentDate.getDate() + 1);
    } else {
      currentDate.setDate(currentDate.getDate() - 1);
    }
    setSelectedDate(currentDate.toISOString().split("T")[0]);
  };

  const getFormattedDate = (date: string) => {
    const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
    const dateStr = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (new Date(date).toDateString() === tomorrow.toDateString()) {
      return { label: "Tomorrow", dateStr };
    }
    return { label: day, dateStr };
  };

  const { label, dateStr } = getFormattedDate(selectedDate);

  return (
    <>
      <div className="cart-container">
        <div className="cart-navbar">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "black",
              textTransform: "none",
              fontWeight: "500",
              
            }}
          >
            <div style={{ display: "flex" }}>
              <img
                src="../../../public/assets/hamburger/arrow left.svg"
                alt="arrow"
                style={{ width: "26px", height: "33px", cursor: "pointer" }}
                onClick={handleBackClick}
              />
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "500",
                  paddingLeft: "10px",
                }}
              >
                Cart summary
              </Typography>
            </div>
            <div className="d-flex align-items-center gap-3">
              <i
                className="bi bi-bell"
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
              ></i>
              <div
                className="user-icon bg-success text-white rounded-circle text-center"
                style={{ width: "30px", height: "30px" }}
              >
                J
              </div>
              <span>John Doe</span>
            </div>
          </div>
        </div>
        <div style={{ margin: "0px", width: "100%" }} className="cart-main">
          {/* Left Section */}
          <div className="cart-left">
            <Box
              sx={{
                flex: 1,
                overflowY: "auto", // Enable vertical scrolling
                padding: "px",
                marginTop: "0px",
                // paddingRight: "10px", // Add space for scrollbar
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  paddingTop: "20px",
                  fontSize: "15px",
                  backgroundColor: "#F6F6F6",
                  paddingLeft: "20px",
                }}
              >
                <div
                  style={{ color: "#5C0B8A", cursor: "pointer" }}
                  onClick={handleBackClick}
                >
                  Manage Prescrption
                </div>

                <Box
                  component="img"
                  src="../../../public/assets/hamburger/rightarrow.png"
                  sx={{
                    width: "21px",
                
                
                   
                    height: "20px",
                    // marginBottom: "8px",
                  }}
                />

                <Typography style={{ fontSize: "16px" }}>
                  
                  Cart summary
                </Typography>
              </Typography>

              {prescriptions.map((data) => (
                <Card 
                  key={data.id}
                  sx={{
                  
                    padding: "2px",
                    backgroundColor: "#F6F6F6",
                    boxShadow: "none",
                  }}
                >
                  <CardContent>
                    {/* Section for Image and Text */}
                    <Box sx={{ backgroundColor: "#FFFFFF", }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center", // Vertically center the image and text
                          gap: "10px",
                          paddingY: "12px",
                          paddingX: "8px",
                          border: "none",
                        }}
                      >
                        {/* Circular Image */}
                        <img
                          src={`./../assets/hamburger/${data.icon}`}
                          alt={data.medicationName}
                          width={50}
                          height={50}
                          style={{
                            borderRadius: "50%", // Makes the image circular
                            objectFit: "cover", // Ensures the image fits within the circle
                            border: "2px solid #ccc", // Optional: Adds a border around the image
                          }}
                        />

                        {/* Main Content Section */}
                        <Box
                          sx={{
                            flex: 1, // Ensures this section takes up all available space
                            display: "flex",
                            flexDirection: "column", // Stacks text and additional details
                          }}
                        >
                          {/* Top Section: Text and Icon */}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between", // Pushes the icon to the right
                              alignItems: "center",
                            }}
                          >
                            {/* Texts */}
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "520",
                                fontSize: "22px",
                                gap: 1, // Space between medicationName and dosage
                              }}
                            >
                              <Typography>{data.medicationName}</Typography>
                              <Typography>{data.dosage}</Typography>
                            </Box>

                            {/* Cross Icon */}
                            <ClearOutlinedIcon />
                          </Box>

                          {/* Additional Details */}
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: "500" }}
                          >
                            {data.quantity} capsules for {data.assignedTo}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: "500" }}
                          >
                            Estimated Copay: {data.lastCopay}
                          </Typography>
                        </Box>
                      </Box>
                      <hr></hr>

                      {/* Section for Comment */}
                      <Box sx={{ paddingInline: "15px", paddingY: "12px" }}>
                        <Typography
                          sx={{
                            marginBottom: "8px",
                            fontSize: "18px",
                            fontWeight: "520",
                          }}
                        >
                          Comment
                        </Typography>
                        <TextField
                          className="cart-text-area"
                          sx={{
                            backgroundColor: "#F6F6F6",
                          }}
                          fullWidth
                          placeholder="Add Comment"
                          multiline
                          rows={2}
                        />
                      </Box>
                      <Box sx={{ paddingInline: "15px", paddingY: "12px" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                          >
                            {data.deliveryType || "Delivery"} (last Fulfilment
                            Method)
                          </Typography>
                          <Box>
                            <ModeEditOutlineIcon
                              onClick={() => pickUpFlow(data.id)}
                              style={{
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                                color: "#5C0B8A",
                              }}
                            />
                            <span style={{ color: "#5C0B8A" }}> Change</span>
                          </Box>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "500px",
                          }}
                        >
                          <Typography>
                         
                            {data.address && data.address.address}
                          </Typography>
                          {data.deliveryDate} {data.deliveryTime && "at"}
                          {data.deliveryTime}
                        </Typography>
                      </Box>
                      <Box sx={{ paddingInline: "15px", paddingY: "12px" }}>
                        {/* Section for Delivery Instructions */}
                        <Typography
                          sx={{ fontSize: "18px", fontWeight: "520px" }}
                        >
                          Delivery Instructions
                        </Typography>
                        <TextField
                          className="cart-text-area"
                          sx={{ backgroundColor: "#F6F6F6" }}
                          fullWidth
                          multiline
                          defaultValue={data.deliveryInstructions}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </div>
          {/* Right Section */}
          <div className="cart-right">
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                // paddingLeft: "10px", // Add space for scrollbar
              }}
            >
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      marginTop: "12px",
                      marginX: "20px",
                      marginBottom: "12px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "530px !important",
                          fontSize: "20px",
                        }}
                      >
                        Order Summary
                      </Typography>
                      <Typography
                        sx={{ fontSize: "18px", fontWeight: "500px" }}
                      >
                        ({prescriptions.length}) items
                      </Typography>
                    </Box>
                  </Box>
                  <hr style={{ marginTop: "12px" }} />
                  {prescriptions.map((item) => (
                    <>
                      <Box
                        sx={{
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          marginTop: "12px",
                          marginX: "20px",
                          marginBottom: "12px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        key={item.id}
                      >
                        <div>
                          <Typography
                            sx={{
                              fontSize: "18px",
                              fontWeight: "520",
                              paddingBottom: "8px",
                            }}
                          >
                            {item.medicationName} {item.dosage}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              // padding: "5px",
                            }}
                          >
                            {item.quantity} capsules
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              // padding: "5px",
                            }}
                          >
                            Last insurance used: Cigna Premium
                          </Typography>
                        </div>
                        <p style={{ display: "flex" }}>
                          Estimated Copay
                          <p style={{ paddingLeft: "8px", fontWeight: "530" }}>
                            {item.lastCopay}
                          </p>
                        </p>
                      </Box>
                      <hr style={{ marginTop: "12px", marginBottom: "12px" }} />
                    </>
                  ))}

                  <Box
                    sx={{
                      marginTop: "12px",
                      marginBottom: "20px",
                      marginX: "20px",
                    }}
                  >
                    <Typography sx={{ fontSize: "20px", fontWeight: "520" }}>
                      Total Estimated Copay: $
                      {prescriptions.reduce(
                        (sum, p) =>
                          sum + parseFloat(p.lastCopay.replace("$", "")),
                        0
                      )}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      marginTop: "20px",
                      marginBottom: "12px",
                      marginX: "20px",
                      fontSize: "20px",
                      fontWeight: "520",
                    }}
                  >
                    Payment Options
                  </Typography>
                  <RadioGroup value={selectedValue} onChange={handleChange}>
                    {/* Reward Card Option */}
                    <Box
                      sx={{
                        marginTop: "12px",
                        marginX: "20px",
                        marginBottom: "12px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          textAlign: "left",
                          padding: "8px",
                          border: "1px solid purple",
                          borderRadius: "11px",
                        }}
                      >
                        <Box>
                          <Radio
                            value="reward"
                            sx={{
                              marginRight: "8px",
                              color: "#5C0B8A",
                              "&.Mui-checked": {
                                color: "#5C0B8A",
                              },
                            }}
                          />
                          <span
                            style={{
                              marginRight: "15px",
                              fontWeight: "520",
                              fontSize: "16px",
                              color: "black",
                              textTransform: "none",
                            }}
                          >
                            Reward Card
                          </span>
                          <span style={{ marginLeft: "8px", color: "black" }}>
                            *** 48458
                          </span>
                        </Box>
                        <span>
                          <img
                            src="../../../public/assets/hamburger/Visa.svg"
                            alt="Visa"
                          />
                        </span>
                      </Button>
                    </Box>

                    {/* Cashback Option */}
                    <Box
                      sx={{
                        marginTop: "12px",
                        marginX: "20px",
                        marginBottom: "12px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          textAlign: "left",
                          padding: "8px",
                          border: "1px solid purple",
                          borderRadius: "11px",
                        }}
                      >
                        <Box>
                          <Radio
                            value="cashback"
                            sx={{
                              marginRight: "8px",
                              color: "#5C0B8A",
                              "&.Mui-checked": {
                                color: "#5C0B8A",
                              },
                            }}
                          />
                          <span
                            style={{
                              marginRight: "20px",
                              fontWeight: "520",
                              fontSize: "16px",
                              color: "black",
                              textTransform: "none",
                            }}
                          >
                            Cashback
                          </span>
                          <span style={{ color: "black" }}> * 28298 </span>
                        </Box>
                        <span>
                          <img
                            src="../../../public/assets/hamburger/MasterCard.svg"
                            alt="MasterCard"
                          />
                        </span>
                      </Button>
                    </Box>
                  </RadioGroup>

                  <Box
                    sx={{
                      display: "flex",
                      // justifyContent: "start",
                      paddingX: "20px",
                      marginXTop: "12px",
                      marginXBottom: "20px",
                    }}
                  >
                    <Box>
                      <img
                        src="../../../public/assets/hamburger/pluscircle.png"
                        style={{ marginRight: "10px" }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "520",
                          color: "#5C0B8A",
                        }}
                      >
                        Make a payment by credit card
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          // paddingX: "20px",
                        }}
                      >
                        Save and pay via cards
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      marginTop: "20px",
                      marginX: "20px",
                      borderRadius: "4px",
                      backgroundColor: "#F6F6F6",
                      padding: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingX: "16px",
                        paddingBottom: "24px",
                      }}
                    >
                      <img
                        src="../../../public/assets/hamburger/user_headset.png"
                        alt="image"
                      />
                      <Typography sx={{ marginLeft: "10px" }}>
                        For assistance with your prescription costs, please call
                        one of Vivo’s Financial Counselors.
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        paddingX: "16px",
                        paddingBottom: "24px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          width: "100%",
                          border: "1px solid purple",
                          textTransform: "none",
                          color: "purple",
                          gap: "10px",
                        }}
                      >
                        <CallIcon />
                        Call Now
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </div>
          {/* </Box> */}
        </div>

        {/* Footer */}
        <div className="cart-footer">
          <Box
            sx={{
              // position: "fixed", // Fix the footer at the bottom
              bottom: 0,
              width: "100%", // Make it span the entire width
              backgroundColor: "#fff", // Background color of the footer
              boxShadow: "0 -2px 5px rgba(0,0,0,0.1)", // Add subtle shadow
              display: "flex",
              justifyContent: "flex-end", // Align the button to the right
              alignItems: "center", // Vertically align items
              // padding: "16px", // Add padding for better spacing
              zIndex: 1000, // Ensure the footer stays above other elements
              height: "75px",
            }}
          >
            <Button
              variant="contained" // Makes the button more prominent
              // Sets the primary color
              sx={{
                marginRight: "15px",
                height: "45px", // Space between button and right edge
                // minWidth: "150px",
                width: "39%",
                textTransform: "none",
                backgroundColor: "#5C0B8A",
              }}
              // onClick={pickUpFlow}
              onClick={() => {
                navigate("/thankyou");
              }}
            >
              Place Order
            </Button>
          </Box>
        </div>
      </div>
      <ModalPopup
        open={medicalInfo}
        onClose={handleCloseModal}
        title="Select fulfilment method"
        showFooter={true}
        footerButtons={[
          {
            label: "Cancel",
            onClick: handleCloseModal,
            customStyles: {
              backgroundColor: "#fff",
              color: "rgba(92, 11, 138, 1)",
              border: "1px solid rgba(92, 11, 138, 1)",
            },
          },
          {
            label: "Confirm",
            onClick: handleSave,
            disabled: isConfirmEnabled,
            customStyles: {
              backgroundColor: "rgba(92, 11, 138, 1)",
              color: "#fff",
            },
          },
        ]}
      >
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              sx={{
                background:
                  selectedImage === "Pickup"
                    ? "rgba(92, 11, 138, 1)"
                    : "rgba(247, 247, 247, 1)",
                padding: "15px",
                width: "80px",
                borderRadius: "5px",
              }}
              image={
                selectedImage === "Pickup"
                  ? "./../../public/assets/hamburger/location.svg"
                  : "./../../public/assets/hamburger/Pickup.svg"
              }
              alt="pick"
              onClick={() => handleImageClick("Pickup")}
            />
            <Typography sx={{ display: "flex", paddingY: 1 }}>
              
              Pickup
              <Typography
                sx={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(92, 11, 138, 1)",
                  color: "#fff",
                  margin: "0px",
                  textAlign: "center",
                  marginX: "5px",
                  fontSize: "16px",
                }}
              >
                ?
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              sx={{
                background:
                  selectedImage === "Delivery"
                    ? "rgba(92, 11, 138, 1)"
                    : "rgba(247, 247, 247, 1)",
                padding: "15px",
                width: "80px",
                borderRadius: "5px",
              }}
              image={
                selectedImage === "Delivery"
                  ? "./../../public/assets/hamburger/shipping.svg"
                  : "./../../public/assets/hamburger/Delivery.svg"
              }
              alt="Deliver"
              onClick={() => handleImageClick("Delivery")}
            />
            <Typography sx={{ display: "flex", paddingY: 1 }}>
              
              Delivery
              <Typography
                sx={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(92, 11, 138, 1)",
                  color: "#fff",
                  margin: "0px",
                  textAlign: "center",
                  marginX: "5px",
                  fontSize: "16px",
                }}
              >
                ?
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              sx={{
                background:
                  selectedImage === "MailOrder"
                    ? "rgba(92, 11, 138, 1)"
                    : "rgba(247, 247, 247, 1)",
                padding: "15px",
                width: "80px",
                borderRadius: "5px",
              }}
              image={
                selectedImage === "MailOrder"
                  ? "./../../public/assets/hamburger/order.svg"
                  : "./../../public/assets/hamburger/MailOrder.svg"
              }
              alt="MailOder"
              onClick={() => handleImageClick("MailOrder")}
            />
            <Typography sx={{ display: "flex", paddingY: 1 }}>
              
              Mail order
              <Typography
                sx={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(92, 11, 138, 1)",
                  color: "#fff",
                  margin: "0px",
                  textAlign: "center",
                  marginX: "5px",
                  fontSize: "16px",
                }}
              >
                ?
              </Typography>
            </Typography>
          </Box>
        </Box>
      </ModalPopup>
      <ModalPopup
        open={locationEnable}
        onClose={handleCloseModal}
        title="Allow “Vivo” to use your location?"
        showFooter={true}
        footerButtons={[
          {
            label: "Don’t Allow",
            onClick: mapsLocation,
            customStyles: {
              backgroundColor: "#fff",
              color: "rgba(92, 11, 138, 1)",
              border: "1px solid rgba(92, 11, 138, 1)",
            },
          },
          {
            label: "Allow",
            onClick: mapsLocation,
            disabled: isConfirmEnabled,
            customStyles: {
              backgroundColor: "rgba(92, 11, 138, 1)",
              color: "#fff",
            },
          },
        ]}
      >
        <Typography>
          Please allow location access to help us find nearby pharmacies.We'll
          only use it to show the closest options while respecting your privacy.
        </Typography>
      </ModalPopup>
      <ModalPopup
        open={mapsLoc}
        onClose={handleCloseModal}
        title="Find nearby pharmacy"
        showFooter={true}
        footerButtons={[
          {
            label: "Cancel",
            onClick: handleCloseModal,
            customStyles: {
              backgroundColor: "#fff",
              color: "rgba(92, 11, 138, 1)",
              border: "1px solid rgba(92, 11, 138, 1)",
            },
          },
          {
            label: "Confirm",
            onClick: confirmLocation,
            disabled: isConfirmEnabled,
            customStyles: {
              backgroundColor: "rgba(92, 11, 138, 1)",
              color: "#fff",
            },
          },
        ]}
      >
        <Maps
          userLocation={userLocation}
          defaultLocations={defaultLocations}
          apiKey=""
          onSelectionChange={handleMapsSelectionChange}
        />
      </ModalPopup>
      {/* <ModalPopup
        onClose={handleCloseModal}
        open={orderRec}
        title=""
        showFooter={true}
        footerButtons={[
          {
            label: "Confirm",
            onClick: backHome,
            disabled: isConfirmEnabled,
            customStyles: {
              bgcolor: "rgba(92, 11, 138, 1)",
              color: "#fff",
              width: "100%",
            },
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 2,
            justifyContent: "center",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <img
              src="./../../public/assets/hamburger/k.svg"
              alt="confirm_order"
              className="confirm_order"
              style={{}}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                mt: 2,
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
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
         
          <Grid container spacing={2} sx={{ maxWidth: "600px", width: "100%" }}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
         
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                      }}
                    >
                      
                      Lisinopril 20mg
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      }}
                    >
                      Rx 635263 • 60 capsules • for John
                    </Typography>
                  </Box>
         
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                      }}
                    >
                      
                      Delivery
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      }}
                    >
                      Tuesday Jan 20 {selectedSlot && selectedSlot}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      }}
                    >
                      
                      {selectedPharmacy && selectedPharmacy.address}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        mt: 1,
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      }}
                    >
                      "Tracking number will be provided when your prescription
                      is available for delivery."
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </ModalPopup> */}
      <ModalPopup
        open={mailDelivery}
        onClose={handleCloseModal}
        title="Confirm address"
        showFooter={true}
        footerButtons={[
          {
            label: "Cancel",
            onClick: handleCloseModal,
            customStyles: {
              backgroundColor: "#fff",
              color: "rgba(92, 11, 138, 1)",
              border: "1px solid rgba(92, 11, 138, 1)",
            },
          },
          {
            label: "Confirm",
            onClick: addConfirmLocation,
            disabled: isConfirmEnabled,
            customStyles: {
              backgroundColor: "rgba(92, 11, 138, 1)",
              color: "#fff",
            },
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            height: "100%",
          }}
        >
          {/* Address Section (Left side) */}
          <Box
            sx={{
              flex: 1, // Take up available space
              // margin: 2,
              padding: 1,
              overflowY: "scroll",
              height: "calc(100vh - 300px)", // Adjust height as needed
            }}
          >
            {homeAddressAdd &&
              homeAddressAdd.map((address, index) => {
                return (
                  <Card key={index} sx={{ marginBottom: 2, padding: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                      }}
                    >
                      <Radio
                        checked={selectedAddress === index}
                        onChange={() => handleSelectHome(address, index)}
                        sx={{
                          "&.Mui-checked": {
                            color: "rgba(92, 11, 138, 1)",
                          },
                        }}
                      />
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: "18px",
                          color: "rgba(41, 41, 41, 1)",
                          fontWeight: 520,
                        }}
                      >
                        {address.name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: 5,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "rgba(52, 56, 60, 1)",
                        }}
                      >
                        {address.address}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "rgba(52, 56, 60, 1)",
                        }}
                      >
                        {address.Mobile}
                      </Typography>
                    </Box>
                  </Card>
                );
              })}
          </Box>

          {/* Date & Time Slot Section (Right side) */}
          {dateTimeShow && (
            <Box
              sx={{
                flex: 1, // Take up available space
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // overflowY: 'scroll',
                // height: 'calc(100vh - 300px)', // Adjust height as needed
              }}
            >
              {/* Date Section with Arrows */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%", // Ensure it takes full width
                  marginBottom: 2,
                  color: "rgba(92, 11, 138, 1)",
                }}
              >
                <IconButton
                  sx={{
                    color: "rgba(92, 11, 138, 1)",
                  }}
                  onClick={() => handleDateChange("prev")}
                >
                  
                </IconButton>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <CalendarMonthIcon
                    sx={{
                      color: "rgba(92, 11, 138, 1)",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      paddingLeft: "5px",
                    }}
                    variant="subtitle1"
                  >
                    {label}
                  </Typography>
                  ,
                  <Typography
                    sx={{
                      fontSize: "16px",
                    }}
                    variant="body2"
                  >
                    {dateStr}
                  </Typography>
                </Box>
                <IconButton
                  sx={{
                    color: "rgba(92, 11, 138, 1)",
                  }}
                  onClick={() => handleDateChange("next")}
                >
                </IconButton>
              </Box>

              {/* Time Slots */}
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                {TimeSlot.map((slot, index) => {
                  return (
                    <Button
                      key={index}
                      variant="outlined"
                      onClick={() => handleSelectTimeSlot(slot)}
                      sx={{
                        margin: "5px",
                        display: "flex",
                        flexWrap: "wrap",
                        padding: "5px",
                        backgroundColor: "#fff",
                        border:
                          selectedTimeSlot === slot
                            ? "2px solid rgba(92, 11, 138, 1)"
                            : "2px solid rgba(113, 115, 118, 1)",
                        color:
                          selectedTimeSlot === slot
                            ? "rgba(92, 11, 138, 1)"
                            : "rgba(113, 115, 118, 1)",
                        flex: { xs: "1 1 100%", sm: "1 1 calc(35% - 8px)" }, // Flex settings for responsiveness
                      }}
                    >
                      {slot}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>

        {/* Button Below */}
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            variant="outlined"
            sx={{
              color: "rgba(92, 11, 138, 1)",
              fontSize: "16px",
              fontWeight: 500,
              border: "1px solid rgba(92, 11, 138, 1)",
              height: "45px",
            }}
            onClick={() => {
              setMailDelivery(false);
              setAddresForm(true);
              setAddress({
                address1: "",
                state: "",
                city: "",
                zipcode: null,
                address2: "",
              });
            }}
          >
            <AddIcon
              sx={{ fontSize: 24, verticalAlign: "middle", margin: 1 }}
            />
            Single Use Address
          </Button>
        </Box>
      </ModalPopup>
      <ModalPopup
        open={addresForm}
        onClose={handleCloseModal}
        title="Confirm address"
        showFooter={true}
        footerButtons={[
          {
            label: "Cancel",
            onClick: handleCloseModal,
            customStyles: {
              backgroundColor: "#fff",
              color: "rgba(92, 11, 138, 1)",
              border: "1px solid rgba(92, 11, 138, 1)",
            },
          },
          {
            label: "Confirm",
            onClick: addNewLocation,
            disabled: isConfirmEnabled,
            customStyles: {
              backgroundColor: "rgba(92, 11, 138, 1)",
              color: "#fff",
            },
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            height: "100%",
          }}
        >
          <Box
            sx={{
              flex: 1,
              margin: 1,
            }}
          >
            <TextField
              id="outlined-controlled"
              label="Address Line 1*"
              value={address.address1}
              fullWidth
              onBlur={handleBlur}
              name="address1"
              error={!!errors.address1}
              helperText={errors.address1}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setAddress((prev) => ({
                  ...prev,
                  address1: event.target.value,
                }));
              }}
              sx={{
                marginBottom: 2,
              }}
            />
            <TextField
              id="outlined-controlled"
              label="Address Line 2"
              value={address.address2}
              fullWidth
              onBlur={handleBlur}
              name="address2"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setAddress((prev) => ({
                  ...prev,
                  address2: event.target.value,
                }));
              }}
              sx={{
                marginBottom: 2,
              }}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                id="outlined-controlled"
                label="Zip code*"
                value={address.zipcode ?? ""}
                fullWidth
                onBlur={handleBlur}
                name="zipcode"
                error={!!errors.zipcode}
                helperText={errors.zipcode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setAddress((prev) => ({
                    ...prev,
                    zipcode: event.target.value
                      ? Number(event.target.value)
                      : null,
                  }));
                }}
                sx={{
                  marginBottom: 2,
                }}
              />
              <TextField
                id="outlined-controlled"
                label="City*"
                fullWidth
                value={address.city}
                onBlur={handleBlur}
                name="city"
                error={!!errors.city}
                helperText={errors.city}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setAddress((prev) => ({ ...prev, city: event.target.value }));
                }}
                sx={{
                  marginBottom: 2,
                }}
              />
            </Box>
            <TextField
              id="outlined-controlled"
              label="State*"
              value={address.state}
              fullWidth
              onBlur={handleBlur}
              name="state"
              error={!!errors.state}
              helperText={errors.state}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setAddress((prev) => ({ ...prev, state: event.target.value }));
              }}
              sx={{
                marginBottom: 2,
              }}
            />
          </Box>

          {/* Date & Time Slot Section (Right side) */}
          {dateTimeShow && (
            <Box
              sx={{
                flex: 1, // Take up available space
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflowY: "scroll",
                height: "calc(100vh - 200px)", // Adjust height as needed
              }}
            >
              {/* Date Section with Arrows */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%", // Ensure it takes full width
                  marginBottom: 2,
                  color: "rgba(92, 11, 138, 1)",
                }}
              >
                <IconButton
                  sx={{ color: "rgba(92, 11, 138, 1)" }}
                  onClick={() => handleDateChange("prev")}
                >
                  & lt;
                </IconButton>
                <Box sx={{ textAlign: "center", flex: 1 }}>
                  <Typography variant="subtitle1"> {label} </Typography>
                  <Typography variant="body2"> {dateStr} </Typography>
                </Box>
                <IconButton
                  sx={{ color: "rgba(92, 11, 138, 1)" }}
                  onClick={() => handleDateChange("next")}
                >
                  & gt;
                </IconButton>
              </Box>

              {/* Time Slots */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                {TimeSlot.map((slot, index) => {
                  return (
                    <Button
                      key={index}
                      variant="outlined"
                      onClick={() => handleSelectTimeSlot(slot)}
                      sx={{
                        margin: "5px",
                        display: "flex",
                        flexWrap: "wrap",
                        padding: "5px",
                        backgroundColor: "#fff",
                        border: "1px solid rgba(113, 115, 118, 1)",
                        color: "rgba(92, 11, 138, 1)",
                        flex: { xs: "1 1 100%", sm: "1 1 calc(35% - 8px)" }, // Flex settings for responsiveness
                      }}
                    >
                      {slot}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>

        {/* Button Below */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-start", marginTop: 2 }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "rgba(92, 11, 138, 1)",
              fontSize: "16px",
              fontWeight: 500,
              border: "1px solid rgba(92, 11, 138, 1)",
              margin: "20px 0px",
            }}
            onClick={() => {
              setAddresForm(false);
              setMailDelivery(true);
              setAddress({
                address1: "",
                state: "",
                city: "",
                zipcode: null,
                address2: "",
              });
            }}
          >
            <ArrowBackIossIcon sx={{ fontSize: "22px" }} />
            Back to Saved Address
          </Button>
        </Box>
      </ModalPopup>
    </>
  );
};

export default CartComponent;