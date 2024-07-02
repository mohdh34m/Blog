import React from 'react'

function BlogSkeleton({ listsToRender }) {
    return (
        <>
            {Array(listsToRender)
                .fill(1)
                .map(() => (
                    <div className="blog-list-skeleton">
                        <div className="blog-preview-skeleton">
                            <h2 className='skeleton'></h2>
                            <p className='skeleton'></p>
                        </div>
                    </div>
                ))}
        </>
    )
}

export default BlogSkeleton