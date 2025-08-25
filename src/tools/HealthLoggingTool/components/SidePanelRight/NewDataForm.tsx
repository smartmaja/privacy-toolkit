// Import the Standard Units from the Units script
import Units from '../../scripts/Units';

import React, { useState } from 'react';

function NewDataForm({ setIsVisible, setLocalUserDataState, selectedEntryID }: { setIsVisible: (v: boolean) => void, setLocalUserDataState: (data: any) => void, selectedEntryID: string | null }) {
    const [value, setValue] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!value || !unit || !date || !selectedEntryID) {
            console.log('Form not submitted: missing value/unit/date/selectedEntryID', { value, unit, date, selectedEntryID });
            return;
        }
        setLocalUserDataState((prev: any) => {
            const entries = prev.entries.map((entry: any) => {
                if (String(entry.key) === String(selectedEntryID)) {
                    return {
                        ...entry,
                        data: [
                            ...entry.data,
                            { value: Number(value), unit, date }
                        ]
                    };
                }
                return entry;
            });
            const updated = { ...prev, entries };
            return updated;
        });
        setIsVisible(false);
    };

    return (
        <div className='new-data-form'>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="value.." value={value} onChange={e => setValue(e.target.value)} />
                <select value={unit} onChange={e => setUnit(e.target.value)}>
                    <option value="" disabled>Select unit</option>
                    {Object.entries(Units.GetStandardUnits()).map(([_, subCategories]) =>
                        Object.entries(subCategories).map(([_, unit]) => (
                            <option key={unit.name} value={unit.name}>
                                {unit.name}
                            </option>
                        ))
                    )}
                </select>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                <button type="submit">Add Data Point</button>
            </form>
        </div>
    );
}

export default NewDataForm;