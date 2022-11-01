import { useState,useEffect } from "react"

const useFetch=(page,pageIndex,params={})=>{
    const [isEmpty,setIsEmpty]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const [err,setErr]=useState(null)
    const [data,setData]=useState(null)
    useEffect((e)=>{
        fetch(`https://api.rawg.io/api/${page}?parent_platforms=1,2,3,4,8,7&key=fd7cfdf1daa045669aae0980fa558939&page=${pageIndex}`)
        .then(res=>{
            if(res.ok){
                return res.json()
            }else{
                throw Error
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
        })},[page,pageIndex])
        return {isEmpty,isLoading,err,data}
}
export default useFetch