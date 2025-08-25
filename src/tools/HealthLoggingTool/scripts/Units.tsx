/**
 * Units.tsx
 * This component defines Units and handles conversions between them
*/


// Import the JSON file containing the standard units
import StandardUnits from '../data/StandardUnits.json';

// Define a class for Units
class Unit {

    // Define properties for the unit
    name : string; // Name of the unit
    abbr: string; // Abbreviation of the unit
    type: string; // Type of the unit (e.g., length, mass, etc.)
    SI: string; // Corresponding SI unit for this type
    CF: number; // Conversion factor to SI unit

    // Simple constructor for the Unit class
    constructor(name: string, abbr: string, type: string, SI: string, CF: number) {

        // Assign values to the properties
        this.name = name;
        this.abbr = abbr;
        this.type = type;
        this.SI = SI;
        this.CF = CF;
    }

    // Convert the value to SI units
    convertToSI = (value: number) => (
        value * this.CF
    );

    // Convert the value from SI units
    convertFromSI = (value: number) => (
        value / this.CF
    );
}

// Function to convert between two units
function convertUnits (value: number, fromUnit: Unit, toUnit: Unit) {

    // If the unit types are incompatible throw an error
    if (fromUnit.type !== toUnit.type) {
        throw new Error(`Incompatible unit types: ${fromUnit.type} and ${toUnit.type}`);
    }

    // Otherwise convert the value to SI and then to the target unit using the built-in SI conversion methods
    else {
        const valueInSI = fromUnit.convertToSI(value);
        return toUnit.convertFromSI(valueInSI);
    }
};

// Define an object for all the standard (allowed) units
const STANDARD_UNITS: { [category: string]: { [key: string]: Unit } } = {};

// Assign the standard units to the STANDARD_UNITS object
// For each category in the StandardUnits JSON file
for (const category in StandardUnits) {

    // Create a new object in the STANDARD_UNITS object for the category
    STANDARD_UNITS[category] = {};

    // Define the units in the category as a constant
    const unitsInCategory = (StandardUnits as any)[category];

    // Populate the category with units of that category from the JSON file
    for (const key in unitsInCategory) {
        const u = unitsInCategory[key];
        STANDARD_UNITS[category][key] = new Unit(u.name, u.abbr, u.type, u.SI, u.CF);
    }
};

// Make a getter for the STANDARD_UNITS object
const GetStandardUnits = () => (
    STANDARD_UNITS
);

// Define a Units object containing all the methods and subclasses
const Units = {
    Unit: Unit,
    ConvertUnits: convertUnits,
    GetStandardUnits: GetStandardUnits
};

// Export the Units object to be used in the Main component (HealthLoggingTool.tsx)
export default Units;
