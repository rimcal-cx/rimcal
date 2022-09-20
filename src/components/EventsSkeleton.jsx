import React from 'react'

function EventsSkeleton() {
  return (
    <div className='mr-3'>
        {[...Array(4).keys()].map((i)=>
        <React.Fragment key={i}>
        {
            <p className="border-b skeleton w-full rounded-md mb-1 ">&nbsp;</p>
        }
        </React.Fragment>
        )

        }
    </div>
  )
}

export default EventsSkeleton
