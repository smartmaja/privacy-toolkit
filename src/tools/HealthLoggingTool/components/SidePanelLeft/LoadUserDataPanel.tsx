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

type LoadUserDataPanel = {
    localUserData: LocalUserData;
    setLocalUserData: (data: LocalUserData) => void;
};

// LoadUserDataPanel component
function LoadUserDataPanel({ localUserData, setLocalUserData }: LoadUserDataPanel) {

    // Define HTML button elements to initiate uploading and downloading of user data
    const uploadButton = <button className="btn btn-primary" onClick={() => handleUpload()}>Upload</button>;
    const downloadButton = <button className="btn btn-primary" onClick={() => handleDownload(localUserData)}>Download</button>;

    // Methods to handle button presses
    // Allow the user to upload their own UserData.json file
    const handleUpload = () => {

        // Define file input element
        const fileInput = document.createElement("input");

        // Set file input attributes
        fileInput.type = "file";
        fileInput.accept = ".json";

        // Handle file selection
        try {
            fileInput.onchange = (event) => {

                // Save the selected file
                const file = (event.target as HTMLInputElement).files?.[0];

                // Check if the selected file exists
                if (file) {

                    // Define a FileReader to read the file contents
                    const reader = new FileReader();

                    // Read the file contents
                    reader.onload = (e) => {

                        // Store plain content of the file
                        const contents = e.target?.result;

                        // Check that the contents is a string
                        if (typeof contents === "string") {

                            // Parse the string to a LocalUserData object
                            const parsedData = JSON.parse(contents);

                            console.log("Parsed user data:", parsedData);

                            // Set the local user data
                            setLocalUserData(parsedData);
                        }
                    };

                    // Read the file as text
                    reader.readAsText(file);
                }
            };

            // Trigger the file input click
            fileInput.click();
        }

        // Handle errors by logging
        catch (error) {
            console.error("Error uploading user data:", error);
        }
    }

    function handleDownload(localUserData: LocalUserData): void {
        
        // Convert the user data to a JSON string
        const dataStr = JSON.stringify(localUserData, null, 2);

        // Create a Blob from the JSON string
        const blob = new Blob([dataStr], { type: "application/json" });

        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element to trigger download
        const a = document.createElement("a");
        a.href = url;
        a.download = "UserData.json";
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    return (
        <div className="tool-panel">
            <p className="panel-title">Load User Data</p>
            {uploadButton}
            {downloadButton}
        </div>
    );
}

export default LoadUserDataPanel;
