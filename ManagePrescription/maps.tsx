import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Radio,
    IconButton,
    Stack,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import SearchInput from "./../searchBar/searchBar";
import pharmacyLocation from "./maps.json";
import { DirectionsCar, DirectionsWalk } from "@mui/icons-material";

interface MapsProps {
    userLocation: { lat: number; lng: number } | null;
    defaultLocations: { lat: number; lng: number; label: string }[];
    apiKey: string;
    onSelectionChange: (selectedPharmacy: any, selectedSlot: string | null) => void;
}

const Maps: React.FC<MapsProps> = ({
    userLocation,
    defaultLocations,
    apiKey,
    onSelectionChange,
}) => {
    const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split("T")[0]
    );

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const mapContainerStyle = {
        width: "100%",
        height: isSmallScreen ? "300px" : "100%",
    };

    const center = userLocation || defaultLocations[0];

    const handleSelectPharmacy = (pharmacy: any) => {
        const newPharmacy = selectedPharmacy?.name === pharmacy.name ? null : pharmacy;
        setSelectedPharmacy(newPharmacy);
        setSelectedSlot(null);
        onSelectionChange(newPharmacy, null);
    };

    const handleSelectTimeSlot = (slot: string) => {
        setSelectedSlot(slot);
        onSelectionChange(selectedPharmacy, slot);
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
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                height: "calc(100vh - 250px)",
                overflow: "hidden",
                position: 'relative'
            }}
        >
            {/* Map Section */}
            <Box
                sx={{
                    flex: isSmallScreen ? "none" : 1,
                    height: isSmallScreen ? "300px" : "100%",
                    width: "100%",
                    overflow: "hidden"
                }}
            >
                <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
                        {userLocation && <Marker position={userLocation} label="You" />}
                        {defaultLocations.map((location, index) => (
                            <Marker
                                key={index}
                                position={{ lat: location.lat, lng: location.lng }}
                                label={location.label}
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </Box>

            {/* Right Content */}
            <Box
            style={{
                position: 'relative',
                width: '100%'
            }}
                sx={{
                    flex: isSmallScreen ? "none" : 1,
                    p: 2,
                    bgcolor: "background.paper",
                    overflowY: "auto",
                    maxHeight: isSmallScreen ? "calc(100vh - 300px)" : "100%",
                }}
            >
                <SearchInput
                    placeholderText="Search by ‘city or zip’"
                    onChange={(text) => console.log("Search Text:", text)}
                    onSubmit={(text) => console.log("Search Submit:", text)}
                />
                <Stack spacing={2} sx={{ mt: 2 }}>
                    {pharmacyLocation.map((data, index) => (
                        <Card
                            key={index}
                            sx={{
                                border:
                                    selectedPharmacy?.name === data.name
                                        ? "none"
                                        : "1px solid rgba(234, 234, 234, 1)",
                                backgroundColor: 
                                selectedPharmacy?.name === data.name
                                    ? "rgba(247, 247, 247, 1)"
                                    : "#fff",
                                borderRadius: 2,
                                transition: "border-color 0.3s",
                            }}
                        >
                            <CardContent onClick={() => handleSelectPharmacy(data)}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                    <Radio
                                        checked={selectedPharmacy?.name === data.name}
                                        onChange={() => handleSelectPharmacy(data)}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: 'rgba(92, 11, 138, 1)',
                                            }
                                        }}
                                    />
                                    <Typography variant="h6">{data.name}</Typography>
                                </Box>
                                <Typography variant="body2" color="textSecondary">
                                    {data.address}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Open: {data.openingTime} - Close: {data.closingTime}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {data.distance.walking.miles},  <DirectionsWalk sx={{fontSize: 16, verticalAlign: 'middel'}} /> {data.distance.walking.time} 
                                    <DirectionsCar sx={{fontSize: 16, verticalAlign: 'middel'}} /> {data.distance.driving.time}
                                </Typography>
                            </CardContent>
                            {selectedPharmacy?.name === data.name && (
                                <CardActions>
                                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                        {/* Date Navigation */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                mb: 2,
                                                color: 'rgba(92, 11, 138, 1)'
                                            }}
                                        >
                                            <IconButton sx={{color:"rgba(92, 11, 138, 1)"}} onClick={() => handleDateChange("prev")}>&lt;</IconButton>
                                            <Box sx={{ textAlign: "center" }}>
                                                <Typography variant="subtitle1">{label}</Typography>
                                                <Typography variant="body2">{dateStr}</Typography>
                                            </Box>
                                            <IconButton sx={{color:"rgba(92, 11, 138, 1)"}} onClick={() => handleDateChange("next")}>&gt;</IconButton>
                                        </Box>
                                        {/* Time Slots */}
                                        <Stack style={{
                                            display:'flex',
                                            flexWrap: 'wrap',
                                            gap: '8px',
                                            flexDirection: 'row'
                                        }}>
                                            {data.timeSlots[selectedDate as keyof typeof data.timeSlots]?.map((slot: string, index: number) => (
                                                <Button
                                                    key={index}
                                                    variant={selectedSlot === slot ? "contained" : "outlined"}
                                                    onClick={() => handleSelectTimeSlot(slot)}
                                                    style={{
                                                        margin: '5px',
                                                        display:'flex',
                                                        flexWrap: 'wrap',
                                                        padding: '5px'
                                                    }}
                                                    sx={{ 
                                                        flex: {xs:"1 1 100%",sm: '1 1 calc(35% - 8px)'}, 
                                                        margin: selectedSlot === slot ?"5px" : "5px",
                                                        backgroundColor: "#fff",
                                                        border: selectedSlot === slot ? "1px solid rgba(92, 11, 138, 1)" : "1px solid rgba(113, 115, 118, 1)",
                                                        color:selectedSlot === slot ? "rgba(92, 11, 138, 1)" : 'rgba(113, 115, 118, 1)',
                                                     }}
                                                >
                                                    {slot}
                                                </Button>
                                            )) || <Typography>No time slots available for this date.</Typography>}
                                        </Stack>
                                    </Box>
                                </CardActions>
                            )}
                        </Card>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};

export default Maps;