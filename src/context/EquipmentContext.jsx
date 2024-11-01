import { createContext, useState, useContext } from 'react';

const EquipmentContext = createContext();

export const useEquipmentContext = () => useContext(EquipmentContext);

export const EquipmentProvider = ({ children }) => {
	const [equipment, setEquipment] = useState(null);

	const updateEquipment = (data) => setEquipment(data);

	return <EquipmentContext.Provider value={{ equipment, updateEquipment }}>{children}</EquipmentContext.Provider>;
};
