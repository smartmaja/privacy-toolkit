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

type AddNewEntryPanelProps = {
    localUserData: LocalUserData;
    setLocalUserData: (data: LocalUserData) => void;
};

// AddNewEntryPanel component
function AddNewEntryPanel({ localUserData, setLocalUserData }: AddNewEntryPanelProps) {

    // Handle adding a new entry to the localUserData entries
    const handleAddEntry = (event: React.FormEvent<HTMLFormElement>) => {

        // Prevent the default form submission behavior (reloading page)
        event.preventDefault();

        // Clear any previous error message
        const form = document.getElementById("entry-form");
        if (form) {
            const existingError = form.querySelector("p");
            if (existingError) {
                form.removeChild(existingError);
            }
        }

        // Check if the entry name is allowed
        if (nameAllowed((document.getElementById("entry-title") as HTMLInputElement).value)) {

            // If the name is allowed, define the new entry object
            const newEntry = {
                key: Date.now(),
                name: (document.getElementById("entry-title") as HTMLInputElement).value,
                data: []
            };

            // Add the new entry to the entries array
            localUserData.entries.push(newEntry);

            // Save the updated user data to the state
            setLocalUserData({ ...localUserData });
        }
        // If the name is not allowed, add new text below to notify the user
        else {

            // Define the error message
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Entry name is taken.";

            // Get the form element
            const form = document.getElementById("entry-form");

            // If the form element exists, display the error message
            if (form) {

                // Set the css class of the error message element
                errorMessage.className = "error-message";

                // Render the error message above the "add entry" button
                form.insertBefore(errorMessage, form.lastChild);
            }

            console.log(form);
        }

        // Clear the input field
        (document.getElementById("entry-title") as HTMLInputElement).value = "";
    };

    const newEntryForm = () => {
        return (
            <form onSubmit={handleAddEntry} id="entry-form">
                <div>
                    <label htmlFor="entry-title">Add new entry:</label>
                    <input type="text" id="entry-title" name="entry-title" autoComplete="off" required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: "8px" }}>
                    Add Entry
                </button>
            </form>
        );
    };

    const nameAllowed = (name: string) => {
        // Check if the name is already taken
        return !localUserData.entries.some(entry => entry.name === name);
    };

    return (
        <>
            {newEntryForm()}
        </>
    );
}

export default AddNewEntryPanel;
