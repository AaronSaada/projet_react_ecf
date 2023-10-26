import { React, useEffect, useState } from 'react'
import axios from "axios"

export default function Books() {

  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchAllBooks = async() => {
      try{
        const res = await axios.get("http://localhost:4567/books")
        setBooks(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchAllBooks()
  }, [])

  return (
    <div>Books</div>
  )
}
