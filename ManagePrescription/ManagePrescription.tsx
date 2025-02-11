import React, { Dispatch, SetStateAction, useState } from "react";
import UserList from "./UserList";
import ManagePrescriptionLeft from "./ManagePrescriptionLeft";
import ManagePrescriptionRight from "./ManagePrescriptionRight";
import MPFooter from "./ManagePrescriptionfooter";

interface ManagePrescriptionProps {
  addToCart: (count: number) => void;
  handleSelectAllPres: (items: [], isChecked: boolean) => void;
  rightData: {};
  setCartCount: Dispatch<SetStateAction<number>>;
  setRightData: (data: unknown) => void;
}

const ManagePrescription: React.FC<ManagePrescriptionProps> = ({
  addToCart,
  handleSelectAllPres,
}) => {
  const [rightData, setRightData] = useState<{}>({});
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <UserList />
      <div className="main-grid-container">
        <div className="left">
          <ManagePrescriptionLeft
            addToCart={addToCart}
            handleSelectAllPres={handleSelectAllPres}
            rightData={rightData}
            setCartCount={setCartCount}
            setRightData={setRightData}
          />
        </div>
        <div className="right">
          <ManagePrescriptionRight
            rightData={rightData}
            setRightData={setRightData}
          />
        </div>
        <div className="footer">
          <MPFooter cartCount={cartCount} />
        </div>
      </div>
    </>
  );
};

export default ManagePrescription;
