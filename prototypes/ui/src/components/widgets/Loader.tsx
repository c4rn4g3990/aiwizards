import React from "react";
import magic from '@assets/images/magic.gif';
import './Loader.sass';

export const Loader: React.FC = () => {
    return <div className="loaderContainer">
        <img src={magic} width={220} height={204} className={"loader1"}/>
        <img src={magic} width={220} height={204} className={"loader2"}/>
        <img src={magic} width={220} height={204} className={"loader3"}/>
    </div>
}