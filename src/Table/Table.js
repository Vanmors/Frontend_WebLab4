import React, {useEffect, useState} from "react";


setTimeout = (Table, 1000)
export default function Table() {
    const [points, setPoints] = useState([])
    const [count, setCount] = useState(0)


    useEffect(()=>{
        fetch("http://localhost:21900/getAll", {
            headers: {
                "Authorization": "Basic " + btoa("user:gg")
            }
        })
            .then(res=>res.json())
            .then((result)=>{
                    setPoints(result);

                }
            )
        // setPoints([{x: 1, y: 2, r: 4, hit: "true" }, {x: 2, y: 2, r: 4, hit: "false" }])
    },[])

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
                        {points.map((point) =>
                                <tr>
                                    <th scope="row">{count}</th>
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