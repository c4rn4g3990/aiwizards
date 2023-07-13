import React from "react";
import { LoadState } from "./loadState";

const bakendURL = 'http://backend:3000/aiwizards';

export function useSendToAI(): [LoadState | undefined, string | undefined, (userPrompt: string) => Promise<any>] {
    const [loadState, setLoadState] = React.useState<LoadState>();
    const [result, setResult] = React.useState<string>();

    function sendRequest(userPrompt: string) {
        setLoadState('pending');
        return fetch(`${bakendURL}/convertPipeline`, {
            mode: "cors",
            method: 'post',
            body: userPrompt,
        }).then(result => result.json()).then(json => {
            setLoadState('done');
            setResult(json?.data?.data?.content);
        }).catch(() => setLoadState('error'));
    }

    return [loadState, result, sendRequest];
}
