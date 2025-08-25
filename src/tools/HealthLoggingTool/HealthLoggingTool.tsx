// Import the locally stored user data as a JSON object
import { getLocalUserData } from './scripts/LocalUserData';

// Import React hooks
import { useState } from 'react';

import CenterPanel from "./components/CenterPanel/CenterPanel";
import SidePanelLeft from "./components/SidePanelLeft/SidePanelLeft";
import SidePanelRight from "./components/SidePanelRight/SidePanelRight";




const HealthLoggingTool = () => {
    const [localUserData, setLocalUserDataState] = useState(getLocalUserData());
    const [selectedEntryID, setSelectedEntryID] = useState<string | null>(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    return (
        <div>
            <div className="tool-container">
                <div className="panel sidepanel sidepanel-left">
                    <SidePanelLeft
                        localUserData={localUserData}
                        setLocalUserDataState={setLocalUserDataState}
                        selectedEntryID={selectedEntryID}
                        setSelectedEntryID={setSelectedEntryID}
                    />
                </div>
                <div className="panel centerpanel">
                    <CenterPanel 
                        localUserData={localUserData}
                        setLocalUserDataState={setLocalUserDataState}
                        selectedEntryID={selectedEntryID}
                        setSelectedEntryID={setSelectedEntryID}/>
                </div>
                <div className="panel sidepanel sidepanel-right">
                    <SidePanelRight
                        localUserData={localUserData}
                        selectedEntryID={selectedEntryID}
                        isPopupVisible={isPopupVisible}
                        setIsPopupVisible={setIsPopupVisible}
                        setLocalUserDataState={setLocalUserDataState}
                    />
                </div>
            </div>
        </div>
    )
};

export default HealthLoggingTool;