import '../blocks/toggleswitch.css'; 
import React from 'react'
import { CurrentTemperatureUnitContext } from '../contexts/CurrentTemperatureUnitContext';

export default function ToggleSwitch(){
   
    const currentTemperatureUnit = React.useContext(CurrentTemperatureUnitContext);

    return (
        <label htmlFor="abc" className="toggle-switch">
            <input onChange={currentTemperatureUnit.handleCurrentTemperatureUnit} type="checkbox" className="toggle-switch__checkbox" id="abc"/>
            <span className='toggle-switch__circle'></span>
            <span className='toggle-switch__text toggle-switch__text_F'>F</span>
            <span className='toggle-switch__text toggle-switch__text_C'>C</span>
        </label>
    )
}