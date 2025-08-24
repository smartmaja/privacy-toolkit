/**
 * ListGroup.tsx
 * This component renders a list of the health data entries using UserData.json
 * The list should be displayed in the SideBar panel
*/

// Import the Standard Units from the Units script
import Units from './Units';

// Example for EntrySelectorPanel.tsx
// Define types for entry data
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

type EntrySelectorPanelProps = {
    localUserData: LocalUserData;
};

type SelectedEntryID = string | null;
type SetSelectedEntryID = (id: SelectedEntryID) => void;

function EntrySelectorPanel({ localUserData, selectedEntryID, setSelectedEntryID }: EntrySelectorPanelProps & { selectedEntryID: SelectedEntryID, setSelectedEntryID: SetSelectedEntryID }) {

    // Define the standard units
    const STANDARD_UNITS = Units.GetStandardUnits();

    // Define a list of the names of the standard units
    let unitNames: string[] = [];

    // Add the name of each unit in each category to the unitNames array
    for (const category in STANDARD_UNITS) {
        unitNames.push(...Object.values(STANDARD_UNITS[category]).map(unit => unit.name));
    }

    // Method to check if the data has been corrupted or tampered with
    function CheckDataIntegrity(data: any[]) {

        // Check that the data is an array
        if (!Array.isArray(data)) {
            console.error("Data is not an array");
            return false;
        }

        // Check that each entry has the required properties
        return data.every(d =>

            // Check that the value is defined
            d.value !== null &&
            d.value !== undefined &&

            // Check that the value is a number
            !isNaN(d.value) &&

            // Check that the unit is a valid unit
            unitNames.includes(d.unit) &&

            // Check that the date is defined
            d.date !== null &&
            d.date !== undefined &&

            // Check that the date is a valid date
            !isNaN(new Date(d.date).getTime())
        );
    }


    // Handle entry onClick event
    function entryClick (entry: any) {
        // Get the previously clicked element
        const prevEntryElement = document.getElementById(String(selectedEntryID));

        // Remove the active class from the previously selected entry
        if (prevEntryElement) {
            prevEntryElement.classList.remove("active");
        }

        // Get the clicked element
        const entryElement = document.getElementById(String(entry.key));

        // If the entry element exists add the active class
        if (entryElement) {
            entryElement.classList.add("active");
        }

        // Set the previously selected entry ID to the current entry ID
        setSelectedEntryID(String(entry.key));
        console.log("Entry selected:", entry.name);

        // Log the selected entry
        console.log("Entry selected:", entry.name);
    }

    function getEntries() {
        try {
            // Define the data as the "entries" array from the UserData.json file
            const Data = localUserData.entries;

            // Check if two entries have the same name
            // Define a list of the names of the entries
            const names = Data.map(d => d.name);

            // Check if two the number of different entry names is the same as the number of entries
            if (new Set(names).size !== names.length) {

                // Duplicate names are logged to the console and an error is thrown
                console.error("Duplicate names found:", names.filter((name, index) => names.indexOf(name) !== index));
                throw new Error("Duplicate names found");
            }

            // Define an HTML element as a list of the entry names
            const EntriesHTML = Data.map((entry) => {

                try {
                    // Check if the entry is missing properties
                    if (!entry.name ) {

                        // Handle missing name
                        console.error("Missing entry name");
                        throw new Error("Missing entry name");
                    }

                    // Check if the entry has a key
                    else if (!entry.key) {

                        // Handle missing key
                        console.error(`Missing key for Entry: "${entry.name}"`);
                        throw new Error("Missing entry key");
                    }

                    // Check if the entry has data
                    else if (!entry.data) {

                        // Handle missing data
                        console.error(`Missing data for Entry: "${entry.name}"`);
                        throw new Error("Missing entry data");
                    }

                    // Check if the data is corrupted
                    else if (!CheckDataIntegrity(entry.data)) {
                        console.error(`Corrupted data for Entry: "${entry.name}"`);
                        throw new Error("Corrupted entry data");
                    }

                    // If data is good return an HTML list element containing the entry names
                    else return (
                        <li
                            key={entry.key}
                            id={String(entry.key)}
                            onClick={() => entryClick(entry)}
                            className="list-group-item"
                        >
                            {entry.name}
                        </li>
                    );
                }
                catch (error) {

                    // If the entry is corrupted log the error in the console
                    console.error("Error rendering entry:", error);

                    // Return an HTML list element indicating the error
                    return (
                        <li key='-1' id='-1' className="list-group-item list-group-item-error">
                            Error loading entry
                        </li>
                    );
                }
            });

            // Return the HTML object
            return EntriesHTML;
            
        } catch (error) {
            // If the data is corrupted log the error in the console
            console.error("Error loading user data:", error);

            // Return an HTML list element indicating the error
            return <ul key='-2' id='-2' className="list-group list-group-item-error">
                Error loading user data
            </ul>;
        }
    }

    return (
        <>
        <p></p>
        <ul className="list-group">
            {getEntries()}
        </ul>
        </>
    );
}




export default EntrySelectorPanel;