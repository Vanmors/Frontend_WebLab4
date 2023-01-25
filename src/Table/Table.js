import React, {useEffect, useState} from "react";


export default function Table() {
    const [points, setPoints] = useState([])



    function updateTable() {
        fetch("http://localhost:21900/getAll", {
            headers: {
                "Authorization": "Basic " + btoa(localStorage.getItem("userName") + ":" + localStorage.getItem("password"))
            }
        })
            .then(res => res.json())
            .then((result) => {
                    setPoints(result);

                }
            )
    }

    useEffect(()=>{
        setInterval(() => updateTable(), 1000)
        } , []
    )

    return (
        <div>


            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">X</th>
                            <th scope="col">Y</th>
                            <th scope="col">R</th>
                            <th scope="col">out</th>
                        </tr>
                        </thead>
                        <tbody>
                        {points.map((point, count) =>
                            <tr>
                                <th scope="row">{count+1}</th>
                                <td>{point.x}</td>
                                <td>{point.y}</td>
                                <td>{point.r}</td>
                                <td>{point.hit.toString()}</td>
                            </tr>
                        )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}