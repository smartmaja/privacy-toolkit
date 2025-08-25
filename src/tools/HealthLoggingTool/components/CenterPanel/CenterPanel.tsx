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
    return (
        <div>
            <p>selectedEntryID: {selectedEntryID}</p>
        </div>
    );
}

export default CenterPanel;
