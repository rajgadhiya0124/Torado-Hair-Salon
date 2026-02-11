import React from 'react'

const FormateDate = (value) => {

    if (!value) return "-";

    const date = new Date(value);

    const formattedDate = date.toLocaleDateString("en-IN",{
        day: "2-digit",
        month:"short",
        year:"numeric"
    });


  return (
    <span>
        {formattedDate}
    </span>
  )
}

export default FormateDate
