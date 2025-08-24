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

type SidePanelProps = {
    localUserData: LocalUserData;
    setLocalUserDataState: (data: LocalUserData) => void;
    selectedEntryID: SelectedEntryID;
    setSelectedEntryID: SetSelectedEntryID;
};

type SelectedEntryID = string | null;
type SetSelectedEntryID = (id: SelectedEntryID) => void;

const CenterPanel = ({
    localUserData,
    selectedEntryID,
}: SidePanelProps) => {
    let selectedData = localUserData.entries.find(entry => entry.key === Number(selectedEntryID));
    console.log("CenterPanel render", { selectedEntryID, selectedData });

    return (
        <div>
            <p>selectedEntryID: {selectedEntryID}</p>
            <pre>{JSON.stringify(selectedData, null, 2)}</pre>
        </div>
    );
}

export default CenterPanel;
