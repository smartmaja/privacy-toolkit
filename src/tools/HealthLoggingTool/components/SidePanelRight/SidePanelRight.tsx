// Import the Standard Units from the Units script
import Units from '../../scripts/Units';

// Import icon from lucide
import { FilePlus2 } from 'lucide-react';


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

function SidePanelRight({
    localUserData,
    selectedEntryID,
}: {
    localUserData: LocalUserData;
    selectedEntryID: SelectedEntryID;
}) {
    // Define the standard units
    const STANDARD_UNITS = Units.GetStandardUnits();

    // Find the data points of the entire with the selected entry key
    // Define data object
    let data;

    // Make sure the data contains an entry with the given key
    try {

        // Find the entry with the matching key
        data = localUserData.entries.find(entry => entry.key === Number(selectedEntryID))?.data;

        // Log to console
        console.log("SidePanelRight render", { selectedEntryID, data });

    }
    catch (error) {

        // If the data does not contain this entry, log to console and alert the user
        console.error("Error rendering SidePanelRight:", error);
        return <div>Error loading data</div>;
    }

    // Notify the user if no data is found
    if (!data || data.length === 0) {
        return <div className="displayed-datapoint-no-data">
                <p>No data available</p>
            </div>;
    }

    // Define a list containing the data points as tuples
    let datapoints: [number | string, number, string][] = data.map((item) => (
        [new Date(item.date).getTime(), item.value, item.unit]
    ));

    // Convert the units to their abbreviation using the standard units
    datapoints = datapoints.map((item) => {
        const unit = item[2];
        let abbr: string | undefined = undefined;

        // Search all categories for the unit
        for (const category in STANDARD_UNITS) {
            console.log(`Checking category ${category} for unit ${unit}`);
            for (const subCategory in STANDARD_UNITS[category]) {
                if (STANDARD_UNITS[category][subCategory].name === unit) {
                    console.log(`Found unit ${unit} in category ${category}`);
                    abbr = STANDARD_UNITS[category][subCategory].abbr;
                }
            }
        }

        console.log(`Converted unit ${unit} to abbreviation ${abbr}`);
        return [item[0], item[1], abbr ? abbr : unit];
    });

    // Sort the data points by date (newest first)
    datapoints.sort((a, b) => {
        try {
            return Number(b[0]) - Number(a[0]);
        }
        catch (error) {
            console.error("Error sorting datapoints:", error);
            return 0;
        }
    });

    // Reformat the dates to a more readable format
    datapoints = datapoints.map((item) => {
        const timestamp = item[0];
        const date = new Date(timestamp);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString("en-US", options);
        return [formattedDate, item[1], item[2]];
    });

    console.log("Rendering SidePanelRight with datapoints:", datapoints);

    // Render the data points
    return (
        <>
        <div className="add-new-datapoint-panel">
            <p className="panel-title add-new-datapoint-panel-title">Add New Data Point</p>
            <button onClick={() => {}} className="add-new-datapoint-button btn btn-primary"><FilePlus2 /></button>
        </div>
        <div>
            <p className="panel-title">Data Points</p>
            {datapoints.map((item, index) => (
                <div key={index} className="displayed-datapoint">
                    <p>{item[0]}</p>
                    <p>{item[1]} {item[2]}</p>
                </div>
            ))}
        </div>
        </>
    );
}

export default SidePanelRight;