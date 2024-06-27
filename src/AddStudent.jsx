
import React, { useEffect, useState } from 'react'
import { getDatabase , push, ref , set , onValue, remove} from "firebase/database";

const AddStudent = () => {
    const db = getDatabase();

const [inputData, setIputData] = useState('')
const [studentlist, setStudentLIst] = useState([])
const [realtime, setRealtime] = useState(false)

const handelSubmit =()=>{
 if(inputData !=''){
  set(push(ref(db, 'studentName/')), {
    studentName: inputData,
  }).then(()=>{
    setIputData ('')
    setRealtime(!realtime)
  })
 }
 
}


const handelDelete = (id)=>{
 console.log(id);
 remove(ref(db,'studentName/'+ id)).then(()=>setRealtime(!realtime))
}

useEffect(()=>{
  let arr = []
  onValue(ref(db, 'studentName/'), (snapshot) => {
  snapshot.forEach((item)=>{
   arr.push({...item.val(), id: item.key})
   
  })

  setStudentLIst(arr)
});
},[realtime])
  return (
    <div>
      <h1>Add Students</h1>

      <input value={inputData} type="text" onChange={(e)=> setIputData(e.target.value)} />
      <button className='submit' onClick={handelSubmit}>ADD</button>



      <ul>
        {
          studentlist.map((item)=>(
            <li key={item.id}>
              <p>{item.studentName}</p>
              <button  className='edt'>Edit</button>
              <button onClick={()=>handelDelete(item.id)} className='delt'>Delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default AddStudent