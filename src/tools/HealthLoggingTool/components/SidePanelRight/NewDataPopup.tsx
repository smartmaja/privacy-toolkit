import NewDataForm from "./NewDataForm";

// Import icon from lucide
import { X } from 'lucide-react';

type NewDataPopupProps = {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setLocalUserDataState: (data: any) => void;
    selectedEntryID: string | null;
};

function NewDataPopup({ isVisible, setIsVisible, setLocalUserDataState, selectedEntryID }: NewDataPopupProps) {
    if (!isVisible) return null;
    return (
        <div className="new-datapoint-popup-container"
            onClick={() => setIsVisible(false)}
        >
            <div
                className="new-datapoint-popup"
                onClick={e => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className="popup-title-left panel-title">Add a new data point</p>
                    <button className="exit-button btn btn-exit" onClick={() => setIsVisible(false)}>
                        <X />
                    </button>
                </div>
                <NewDataForm setIsVisible={setIsVisible} setLocalUserDataState={setLocalUserDataState} selectedEntryID={selectedEntryID} />
            </div>
        </div>
    );
}

export default NewDataPopup;


