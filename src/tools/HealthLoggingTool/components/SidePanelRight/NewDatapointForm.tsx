// Import the Standard Units from the Units script
import Units from '../../scripts/Units';

function NewDataPointForm() {
    return (
        <form action="">
            <input type="text" placeholder="value.." />
            <select>
                {Object.entries(Units.GetStandardUnits()).map(([category, subCategories]) =>
                    Object.entries(subCategories).map(([subCategory, unit]) => (
                        <option key={unit.name} value={unit.name}>
                            {unit.name}
                        </option>
                    ))
                )}
            </select>
            <input type="date" />
            <button type="submit">Add Data Point</button>
        </form>
    );
}

export default NewDataPointForm;