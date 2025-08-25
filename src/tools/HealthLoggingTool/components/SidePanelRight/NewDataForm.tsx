// Import the Standard Units from the Units script
import Units from '../../scripts/Units';

function NewDataForm() {
    return (
        <div className='new-data-form'>
            <form action="">
                <input type="text" placeholder="value.." />
                <select>
                    {Object.entries(Units.GetStandardUnits()).map(([_, subCategories]) =>
                        Object.entries(subCategories).map(([_, unit]) => (
                            <option key={unit.name} value={unit.name}>
                                {unit.name}
                            </option>
                        ))
                    )}
                </select>
                <input type="date" />
                <button type="submit">Add Data Point</button>
            </form>
        </div>
    );
}

export default NewDataForm;