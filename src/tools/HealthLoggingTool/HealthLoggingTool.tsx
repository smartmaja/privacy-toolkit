// Import the locally stored user data as a JSON object
import { getLocalUserData } from './components/LocalUserData';

// Import React hooks
import { useState } from 'react';

import CenterPanel from "./components/CenterPanel";
import SidePanelLeft from "./components/SidePanelLeft";



const HealthLoggingTool = () => {
    const [localUserData, setLocalUserDataState] = useState(getLocalUserData());
    const [selectedEntryID, setSelectedEntryID] = useState<string | null>(null);

    return (
        <div>
            <div className="tool-container">
                <div className="sidepanel sidepanel-left">
                    <SidePanelLeft
                        localUserData={localUserData}
                        setLocalUserDataState={setLocalUserDataState}
                        selectedEntryID={selectedEntryID}
                        setSelectedEntryID={setSelectedEntryID}
                    />
                </div>
                <div className="tool-panel">
                    <CenterPanel 
                        localUserData={localUserData}
                        setLocalUserDataState={setLocalUserDataState}
                        selectedEntryID={selectedEntryID}
                        setSelectedEntryID={setSelectedEntryID}/>
                </div>
            </div>
        </div>
    )
};

export default HealthLoggingTool;