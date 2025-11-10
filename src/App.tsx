import { useState } from "react";
import { ModeSelectorScreen } from "./components/ModeSelectorScreen";
import { HomeScreen } from "./components/HomeScreen";
import { HourlyRentalScreen } from "./components/HourlyRentalScreen";
import { FareSelectionScreen } from "./components/FareSelectionScreen";
import { ConfirmRideScreen } from "./components/ConfirmRideScreen";
import { RideRequestedScreen } from "./components/RideRequestedScreen";
import { RideOnWayScreen } from "./components/RideOnWayScreen";
import { SeniorHomeScreen } from "./components/senior/SeniorHomeScreen";
// import { SeniorBookingScreen } from './components/senior/SeniorBookingScreen';
// import { DisabilityHomeScreen } from './components/disability/DisabilityHomeScreen';
// import { DisabilityBookingScreen } from './components/disability/DisabilityBookingScreen';
import { IlliterateHomeScreen } from "./components/illiterate/IlliterateHomeScreen";
// import { IlliterateBookingScreen } from './components/illiterate/IlliterateBookingScreen';
import { ParcelDetailsScreen } from "./components/parcel/ParcelDetailsScreen";
import { ParcelConfirmScreen } from "./components/parcel/ParcelConfirmScreen";

type Mode = "standard" | "senior" | "illiterate" | null;
type Screen =
  | "home"
  | "fare"
  | "confirm"
  | "requested"
  | "on-way"
  | "rental"
  | "parcel-details"
  | "parcel-confirm"
  | "parcel-on-way";

export default function App() {
  const [selectedMode, setSelectedMode] = useState<Mode>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selectedFareType, setSelectedFareType] = useState("car");

  // 🆕 Hold current pickup & destination
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  // Mode Selection Screen
  if (selectedMode === null) {
    return (
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen">
        <ModeSelectorScreen onSelectMode={(mode) => setSelectedMode(mode)} />
      </div>
    );
  }

  // Standard Mode (Original Design)
  if (selectedMode === "standard") {
    return (
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen">
        {currentScreen === "home" && (
          <HomeScreen
            onNavigateToRental={() => setCurrentScreen("rental")}
            onNavigateToFare={(pickupVal, destVal) => {
              // 🟢 Save typed values and navigate
              setPickup(pickupVal);
              setDestination(destVal);
              setCurrentScreen("fare");
            }}
            onNavigateToParcel={() => setCurrentScreen("parcel-details")}
            onBack={() => setSelectedMode(null)}
          />
        )}
        {currentScreen === "fare" && (
          <FareSelectionScreen
            pickup={pickup} // 🟢 Pass dynamic values here
            destination={destination}
            onBack={() => setCurrentScreen("home")}
            onSelectFare={(fareType) => {
              setSelectedFareType(fareType);
              setCurrentScreen("confirm");
            }}
          />
        )}
        {currentScreen === "confirm" && (
          <ConfirmRideScreen
            onBack={() => setCurrentScreen("fare")}
            onConfirm={() => setCurrentScreen("requested")}
            fareType={selectedFareType}
          />
        )}
        {currentScreen === "requested" && (
          <RideRequestedScreen
            onContinue={() => setCurrentScreen("on-way")}
            fareType={selectedFareType}
          />
        )}
        {currentScreen === "on-way" && (
          <RideOnWayScreen fareType={selectedFareType} />
        )}
        {currentScreen === "parcel-details" && (
          <ParcelDetailsScreen
            onBack={() => setCurrentScreen("home")}
            onContinue={() => setCurrentScreen("parcel-confirm")}
          />
        )}
        {currentScreen === "parcel-confirm" && (
          <ParcelConfirmScreen
            onBack={() => setCurrentScreen("parcel-details")}
            onConfirm={() => setCurrentScreen("parcel-on-way")}
          />
        )}
        {currentScreen === "parcel-on-way" && (
          <RideRequestedScreen
            onContinue={() => setCurrentScreen("home")}
            fareType="parcel"
          />
        )}
        {currentScreen === "rental" && (
          <HourlyRentalScreen onBack={() => setCurrentScreen("home")} />
        )}
      </div>
    );
  }

  // Senior Citizens Mode
  if (selectedMode === "senior") {
    return (
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen">
        {currentScreen === "home" && (
          <SeniorHomeScreen
            onNavigateToBooking={() => setCurrentScreen("fare")}
            onNavigateToParcel={() => setCurrentScreen("parcel-details")}
            onBack={() => setSelectedMode(null)}
          />
        )}
        {currentScreen === "fare" && (
          <FareSelectionScreen
            onBack={() => setCurrentScreen("home")}
            onSelectFare={(fareType) => {
              setSelectedFareType(fareType);
              setCurrentScreen("confirm");
            }}
          />
        )}
        {currentScreen === "confirm" && (
          <ConfirmRideScreen
            onBack={() => setCurrentScreen("fare")}
            onConfirm={() => setCurrentScreen("requested")}
            fareType={selectedFareType}
          />
        )}
        {currentScreen === "requested" && (
          <RideRequestedScreen
            onContinue={() => setCurrentScreen("on-way")}
            fareType={selectedFareType}
          />
        )}
        {currentScreen === "on-way" && (
          <RideOnWayScreen fareType={selectedFareType} />
        )}
        {currentScreen === "parcel-details" && (
          <ParcelDetailsScreen
            onBack={() => setCurrentScreen("home")}
            onContinue={() => setCurrentScreen("parcel-confirm")}
            mode="senior"
          />
        )}
        {currentScreen === "parcel-confirm" && (
          <ParcelConfirmScreen
            onBack={() => setCurrentScreen("parcel-details")}
            onConfirm={() => setCurrentScreen("parcel-on-way")}
            mode="senior"
          />
        )}
        {currentScreen === "parcel-on-way" && (
          <RideRequestedScreen
            onContinue={() => setCurrentScreen("home")}
            fareType="parcel"
          />
        )}
      </div>
    );
  }

  // Accessibility Mode
  // if (selectedMode === 'disability') {
  //   return (
  //     <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen">
  //       {currentScreen === 'home' && (
  //         <DisabilityHomeScreen
  //           onNavigateToBooking={() => setCurrentScreen('fare')}
  //           onNavigateToParcel={() => setCurrentScreen('parcel-details')}
  //           onBack={() => setSelectedMode(null)}
  //         />
  //       )}
  //       {currentScreen === 'fare' && (
  //         <FareSelectionScreen
  //           onBack={() => setCurrentScreen('home')}
  //           onSelectFare={(fareType) => {
  //             setSelectedFareType(fareType);
  //             setCurrentScreen('confirm');
  //           }}
  //         />
  //       )}
  //       {currentScreen === 'confirm' && (
  //         <ConfirmRideScreen
  //           onBack={() => setCurrentScreen('fare')}
  //           onConfirm={() => setCurrentScreen('requested')}
  //           fareType={selectedFareType}
  //         />
  //       )}
  //       {currentScreen === 'requested' && (
  //         <RideRequestedScreen
  //           onContinue={() => setCurrentScreen('on-way')}
  //           fareType={selectedFareType}
  //         />
  //       )}
  //       {currentScreen === 'on-way' && (
  //         <RideOnWayScreen fareType={selectedFareType} />
  //       )}
  //       {currentScreen === 'parcel-details' && (
  //         <ParcelDetailsScreen
  //           onBack={() => setCurrentScreen('home')}
  //           onContinue={() => setCurrentScreen('parcel-confirm')}
  //           mode="disability"
  //         />
  //       )}
  //       {currentScreen === 'parcel-confirm' && (
  //         <ParcelConfirmScreen
  //           onBack={() => setCurrentScreen('parcel-details')}
  //           onConfirm={() => setCurrentScreen('parcel-on-way')}
  //           mode="disability"
  //         />
  //       )}
  //       {currentScreen === 'parcel-on-way' && (
  //         <RideRequestedScreen
  //           onContinue={() => setCurrentScreen('home')}
  //           fareType="parcel"
  //         />
  //       )}
  //     </div>
  //   );
  // }

  // Voice/Illiterate Mode - Simplified flow with minimal taps
  if (selectedMode === "illiterate") {
    return (
      <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen">
        {currentScreen === "home" && (
          <IlliterateHomeScreen
            onNavigateToBooking={() => {
              // Skip fare selection, go directly to confirmation
              setSelectedFareType("car");
              setCurrentScreen("requested");
            }}
            onNavigateToParcel={() => {
              // Skip parcel details, go directly to confirmation
              setCurrentScreen("parcel-on-way");
            }}
            onBack={() => setSelectedMode(null)}
          />
        )}
        {currentScreen === "requested" && (
          <RideRequestedScreen
            onContinue={() => setCurrentScreen("on-way")}
            fareType={selectedFareType}
          />
        )}
        {currentScreen === "on-way" && (
          <RideOnWayScreen fareType={selectedFareType} />
        )}
        {currentScreen === "parcel-on-way" && (
          <RideRequestedScreen
            onContinue={() => setCurrentScreen("home")}
            fareType="parcel"
          />
        )}
      </div>
    );
  }

  return null;
}
