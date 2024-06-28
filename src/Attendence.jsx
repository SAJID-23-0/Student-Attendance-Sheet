import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";

const Attendence = () => {
  const db = getDatabase();
  const [studentlist, setStudentLIst] = useState([]);
  const [result, setResult] = useState(false);

  useEffect(() => {
    let arr = [];
    onValue(ref(db, "studentName/"), (snapshot) => {
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });

      setStudentLIst(arr);
    });
  }, [result]);
  const handelCheck = (e, id) => {
    update(ref(db, "studentName/" + id), {
      attendance: e.target.checked,
    });
  };
  return (
    <section className="attendance mt-5">
      <div className="container">
        {!result ? (
          <div className="p-10 border rounded-xl ">
            <h2 className="text-2xl border-b pb-5"> Take Attendance</h2>

            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-start">#</th>
                  <th>Student Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {studentlist.map((item, i) => (
                  <tr key={item.id}>
                    <td>{++i}</td>
                    <td>{item.studentName}</td>
                    <td>
                      <label className="switch m-auto inline-block">
                        <div className="toggle-switch">
                          <input
                            id={item.id}
                            type="checkbox"
                            onChange={(e) => handelCheck(e, item.id)}
                          />
                          <label htmlFor={item.id}></label>
                        </div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-5">
              <button onClick={() => setResult(true)} className="submit_2">
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div className="p-10 border rounded-xl ">
            <h2 className="text-2xl border-b pb-5">Attendance Submited </h2>

            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-start">#</th>
                  <th>Student Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {studentlist.map((item, i) => (
                  <tr key={item.id}>
                    <td>{++i}</td>
                    <td>{item.studentName}</td>
                    <td>
                      <label className="switch m-auto inline-block">
                        <div className="toggle-switch">
                          {item.attendance ? (
                            <input id={item.id} type="checkbox" checked />
                          ) : (
                            <input id={item.id} type="checkbox" />
                          )}

                          <label></label>
                        </div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Attendence;
