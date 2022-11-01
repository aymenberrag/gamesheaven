import { useState,useEffect } from "react"
import { useParams} from "react-router-dom"
const useFetch=(params=null)=>{
    const {page}=useParams()
    const [isEmpty,setIsEmpty]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const [err,setErr]=useState(null)
    const [data,setData]=useState(null)
    let q=""
    if(params){
        for(let param of params.keys()){
        q+=`&${param}=${params.get(param)}`
        }
    }
    useEffect((e)=>{
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
            setIsEmpty(!Boolean(data.results.length))
            setIsLoading(false)
            setErr(null)
        })
        .catch(err=>{
            setIsLoading(false)
            setErr(err.message)
        })},[page,q])
        return {isEmpty,isLoading,err,data,page}
}
export default useFetch