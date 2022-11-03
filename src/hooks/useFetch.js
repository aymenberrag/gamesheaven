import { useState,useEffect } from "react"
const useFetch=(page,params=null)=>{
    const [isLoading,setIsLoading]=useState(true)
    const [err,setErr]=useState(null)
    const [data,setData]=useState(null)
    let q=""
    if(params){
        for(let param in params){
        q+=`&${param}=${params[param]}`
        }
    }
    useEffect(()=>{
        setIsLoading(true)
        fetch(`https://api.rawg.io/api/${page}?key=${"fd7cfdf1daa045669aae0980fa558939"}${q}`)
        .then(res=>{
            if(res.ok){
                return res.json()
            }else{
                throw Error("ops somthig wrong..")
            }
        })
        .then(data=>{
            setData(data)
            setIsLoading(false)
            setErr(null)
        })
        .catch(err=>{
            setIsLoading(false)
            setErr(err.message)
        })},[page,q])
        return {isLoading,err,data}
}
export default useFetch
