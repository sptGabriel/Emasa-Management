import React from 'react';
import CheckBox from './CheckBox';

export default function CheckBoxList ({options, isCheckedAll, onCheck}: any) {
    const checkBoxOptions = (
        <div className="checkbox-list">
            {options.map((option: any, index: any) => {
                return (
                    <CheckBox
                      key={index}
                      name={option.name}
                      value={option.value}
                      tick={option.checked}
                      onCheck={(e: any) => onCheck(option.value, e.target.checked)}                     />
                );
            })}
        </div>
    );

    return (
        <div className="checkbox-list">
            <CheckBox
              name="select-all"
              value="ALL"
              tick={isCheckedAll}
              onCheck={(e: any) => onCheck('all', e.target.checked)}
            />
            {checkBoxOptions}
        </div>
    );
}