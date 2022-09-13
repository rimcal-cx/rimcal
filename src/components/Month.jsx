import React from 'react'
import Day from './Day'

function Month({month}) {
  return (
    <div className='grid grid-cols-7 grid-rows-5 flex-1'>
        {month.map((row,i)=>
        <React.Fragment key={i}>
        {
            row.map((day,idx)=>(
                <Day day={day} key={idx} rowIdx={i}/>
            ))
        }
        </React.Fragment>
        )

        }

    </div>
  )
}

export default Month