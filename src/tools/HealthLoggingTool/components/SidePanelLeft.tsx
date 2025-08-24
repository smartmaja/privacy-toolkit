import EntrySelectorPanel  from "./EntrySelectorPanel";
import AddNewEntryPanel  from "./AddNewEntryPanel";
import LoadUserDataPanel  from "./LoadUserDataPanel";

type EntryData = {
    value: number;
    unit: string;
    date: string;
};

type Entry = {
    name: string;
    key: number;
    data: EntryData[];
};

type LocalUserData = {
    name: string;
    age: number;
    email: string;
    entries: Entry[];
};

type SelectedEntryID = string | null;
type SetSelectedEntryID = (id: SelectedEntryID) => void;

function SidePanelLeft({
    localUserData,
    setLocalUserDataState,
    selectedEntryID,
    setSelectedEntryID
}: {
    localUserData: LocalUserData;
    setLocalUserDataState: (data: LocalUserData) => void;
    selectedEntryID: SelectedEntryID;
    setSelectedEntryID: SetSelectedEntryID;
}) {

    return (
        <>
            <div className="tool-panel">
                <LoadUserDataPanel
                    localUserData={localUserData}
                    setLocalUserData={setLocalUserDataState}
                />
            </div>
            <div className="tool-panel">
                <EntrySelectorPanel
                    localUserData={localUserData}
                    selectedEntryID={selectedEntryID}
                    setSelectedEntryID={setSelectedEntryID}
                />
            </div>
            <div className="tool-panel">
                <AddNewEntryPanel
                    localUserData={localUserData}
                    setLocalUserData={setLocalUserDataState}
                />
            </div>
        </>
    );
}

export default SidePanelLeft;


