import React from 'react'

function DetailsSkeleton() {
    return (
        <div className="blog-details-skeleton">
            <article>
                <h2 className='Details-skeleton'></h2>
                <p className='Details-skeleton'></p>
                {Array(4)
                    .fill(1)
                    .map(() => (
                        <div className='Details-skeleton'></div>
                    ))}
                <div style={{ width: "75%" }}></div>
            </article>
        </div>
    )
}

export default DetailsSkeleton