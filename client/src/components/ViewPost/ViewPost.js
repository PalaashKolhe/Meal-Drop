import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"


const ViewPost = (props) => {
    
    const { id } = useParams();
    
    // useEffect(() => {
    // }, [input])

    return (
        <div>
            {id}
        </div>
    )
}

export default ViewPost
