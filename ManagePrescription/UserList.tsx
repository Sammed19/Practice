import React from "react";
import { Avatar, List, ListItem, ListItemText } from "@mui/material";
import ManagePrescriptionData from "./ManagePrescriptiondata.json";

const UserList: React.FC = () => {
  const userColors = ["#B7DC7A", "#C6ECFD", "#BE81CC"];

  const handleUserClicked = () => {
    console.log("useClicked");
  };

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "row",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      <ListItem
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "auto",
        }}
      >
        <img src="../../../public/assets/hamburger/All_Users.png" />
      </ListItem>
      {ManagePrescriptionData.prescriptions.map((user, index) => (
        <ListItem
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "auto",
          }}
        >
          <button
            style={{
              borderRadius: "30px",
              marginRight: "8px",
              borderColor: userColors[index],
              borderStyle: "none",
            }}
            onClick={handleUserClicked}
          >
            <Avatar
              style={{
                backgroundColor: userColors[index],
                color:"#34383C"
              }}
            >
              {user.assignedTo.charAt(0)}
            </Avatar>
          </button>
          <ListItemText primary={user.assignedTo} />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
