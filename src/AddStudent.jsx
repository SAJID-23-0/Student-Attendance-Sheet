import React, { useEffect, useState } from "react";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";

const AddStudent = () => {
  const db = getDatabase();

  const [inputData, setIputData] = useState("");
  const [studentlist, setStudentLIst] = useState([]);
  const [realtime, setRealtime] = useState(false);
  const [editTodo, setEditTodo] = useState("");

  const handelSubmit = () => {
    if (inputData != "") {
      set(push(ref(db, "studentName/")), {
        studentName: inputData,
        attendance: false,
      }).then(() => {
        setIputData("");
        setRealtime(!realtime);
      });
    }
  };

  const handelUpdate = () => {
    update(ref(db, "studentName/" + editTodo.id), {
      studentName: editTodo.studentName,
    }).then(() => {
      setEditTodo("");
      setRealtime(!realtime);
    });
  };
  const handelEdit = (item) => {
    setEditTodo(item);
  };

  const handelDelete = (id) => {
    console.log(id);
    remove(ref(db, "studentName/" + id)).then(() => setRealtime(!realtime));
  };

  useEffect(() => {
    let arr = [];
    onValue(ref(db, "studentName/"), (snapshot) => {
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });

      setStudentLIst(arr);
    });
  }, [realtime]);

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-3">
      <h1>Add Students</h1>

      <div>
        <input
          className="p-1 border bg-slate-200"
          value={editTodo ? editTodo.studentName : inputData}
          type="text"
          onChange={(e) => {
            editTodo
              ? setEditTodo({ ...editTodo, studentName: e.target.value })
              : setIputData(e.target.value);
          }}
        />
        {editTodo ? (
          <button className="submit" onClick={handelUpdate}>
            Update
          </button>
        ) : (
          <button className="submit" onClick={handelSubmit}>
            ADD
          </button>
        )}
      </div>

      <ul>
        {studentlist.map((item, i) => (
          <li
            className="flex justify-center gap-4 items-center mb-2"
            key={item.id}
          >
            <p>{++i}</p>
            <p>{item.studentName}</p>

            <button className="edt" onClick={() => handelEdit(item)}>
              Edit
            </button>

            <button onClick={() => handelDelete(item.id)} className="delt">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddStudent;
