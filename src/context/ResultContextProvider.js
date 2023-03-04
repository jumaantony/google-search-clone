import React, {createContext, useContext, useState} from 'react'

const ResultContext = createContext();
const baseUrl = 'https://google-web-search1.p.rapidapi.com';

export const ResultContextProvider = ({children }) => {
    const [results, setResults ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // /videos, /search, /images
    const getResults = async(type) => {
        setIsLoading(true)
        
        const response = await fetch(`${baseUrl}${type}`,{
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c3b2a1ec3fmsh8b20efd31e48736p10a5e8jsn981b52011e46',
                'X-RapidAPI-Host': 'google-web-search1.p.rapidapi.com'
            }
        });

        const  data = await response.json();
        console.log(data)

        setResults(data)
        setIsLoading(false)
    }

    return(
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading}}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext)
  
