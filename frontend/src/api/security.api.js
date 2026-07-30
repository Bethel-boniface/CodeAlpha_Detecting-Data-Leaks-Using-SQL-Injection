import api from "./axios";

/*
|--------------------------------------------------------------------------
| SQL Injection Playground
|--------------------------------------------------------------------------
*/

export const analyzePayload = async (payload) => {

    const response = await api.post(

        "/security/analyze",

        {

            payload

        }

    );

    return response;

};

export default {

    analyzePayload

};