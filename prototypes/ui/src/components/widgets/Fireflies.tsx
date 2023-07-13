import React from "react";
import "./Fireflies.sass"

export const Fireflies: React.FC = () => {
    return <div className="fireflies-container">
        {(new Array(100)).fill(1).map(item => <div key={item} className="fireflies_item">
        <div className="fireflies_inner"></div>
    </div>)}
    </div>
}