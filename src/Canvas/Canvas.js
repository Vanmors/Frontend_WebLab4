import React, {useRef, useEffect, useState} from 'react';
import "./styleForCanvas.css"
import swal from "sweetalert";


function Canvas(props) {
    const canvas = useRef();
    let ctx = null;

    // initialize the canvas context
    useEffect(() => {

        const canvasEle = canvas.current;
        ctx = canvasEle.getContext("2d");
        console.log(ctx)
    }, []);

    useEffect(() => {
        drawLine({x: 20, y: 20, x1: 20, y1: 100});

        drawLine({x: 50, y: 50, x1: 200, y1: 100}, {color: 'red'});

        drawLine({x: 300, y: 250, x1: 260, y1: 70}, {color: 'green', width: 5});

        drawLine({x: 70, y: 240, x1: 160, y1: 120}, {color: 'blue'});
    }, []);

    // draw a line
    const drawLine = (info, style = {}) => {
        const {x, y, x1, y1} = info;
        const {color = 'black', width = 1} = style;

        ctx.fillStyle = '#3399ff'; // Задаём чёрный цвет для линий
        ctx.lineWidth = 1.0; // Ширина линии
        ctx.beginPath(); // Запускает путь
        ctx.moveTo(198.9, 7.8); // Рисуем ось
        ctx.lineTo(198.9, 382.2);
        ctx.moveTo(7.8, 198.9);
        ctx.lineTo(382.2, 198.9);

        ctx.fillRect(198.9, 198.9, 152.1, -78) // Рисуем и закршиваем прямоугльник
        ctx.stroke(); // Делаем контур

        ctx.beginPath();
        ctx.moveTo(351, 198.9); // Рисуем и закршиваем треугольник
        ctx.lineTo(198.9, 347.1);
        ctx.lineTo(198.9, 198.9);
        ctx.lineTo(351, 198.9);
        ctx.fill();
        ctx.stroke();


        ctx.beginPath();
        ctx.arc(198.9, 198.9, 156, Math.PI, -Math.PI / 2) // Рисуем и закршиваем четверть круга
        ctx.moveTo(198.9, 42.9);
        ctx.lineTo(198.9, 198.9);
        ctx.lineTo(42.9, 198.9);

        ctx.fill();
        ctx.stroke();


        ctx.moveTo(195, 42.9); // Вставляем R на график
        ctx.lineTo(202.8, 42.9);
        ctx.fillStyle = 'black'; // Задаём чёрный цвет для линий
        ctx.font = "15px Verdana";
        ctx.fillText("R", 202.8, 42.9)
        ctx.moveTo(351, 195);
        ctx.lineTo(351, 202.8);
        ctx.font = "15px Verdana";
        ctx.fillText("R", 354.9, 195)
        ctx.moveTo(195, 347.1);
        ctx.lineTo(202.8, 347.1);
        ctx.fillText("-R", 226.2, 358.8)
        ctx.moveTo(42.9, 195);
        ctx.lineTo(42.9, 202.8);
        ctx.fillText("-R", 11.7, 195)
        ctx.stroke(); // Делаем контур
    }


    function clickCanvas(e) {

        let rect = e.target.getBoundingClientRect();
        let xPixels = (e.clientX - rect.left); //x position within the element.
        let yPixels = (e.clientY - rect.top);  //y position within the element.

        console.log("Left? : " + xPixels + " ; Top? : " + yPixels + ".");
        let rIn = props.r
        let r = rIn;
        // centre = 195
        // right R: x = 350; y = 195
        // left R: x = 42; y = 195
        // up R: x = 195; y = 42
        // down x = 195; y = 350
        console.log(r)
        let x;
        let y;

        if (xPixels > 195) {
            x = (xPixels - 195) * (r / 155)
        } else if (xPixels === 195) {
            x = 0;
        } else {
            x = (xPixels - 195) * (r / 155);
        }

        if (yPixels > 195) {
            y = (yPixels - 195) * (r / 155) * -1;
        } else if (yPixels === 195) {
            y = 0;
        } else {
            y = (yPixels - 195) * (r / 155) * -1;
        }
        //
        let hit
        if (((x * x + y * y) <= r * r && x <= 0 && y >= 0) ||
            (x - y <= r && x >= 0 && y <= 0) ||
            (2 * y <= r && x <= r && x >= 0 && y >= 0)) {
            const canvasEle = canvas.current;

            ctx = canvasEle.getContext("2d");
            ctx.fillStyle = "black"
            ctx.beginPath()
            ctx.fillRect(xPixels, yPixels, 4, 4);
            ctx.stroke();
            hit = true
        } else {
            const canvasEle = canvas.current;

            ctx = canvasEle.getContext("2d");
            ctx.fillStyle = "red"
            ctx.beginPath()
            ctx.fillRect(xPixels, yPixels, 4, 4);
            ctx.stroke();
            hit = false
        }
        console.log(x)
        console.log(y)

        let point = {x, y, r, hit}
        console.log(point)

        fetch("http://localhost:21900/", {
            // mode: "no-cors",
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                // "Authorization": "Basic " + btoa("user:gg")
                "Authorization": "Basic " + btoa(localStorage.getItem("userName") + ":" + localStorage.getItem("password"))
            },
            body: JSON.stringify(point)
        }).then(r => {
            console.log(r.headers)
            if (r.status === 401) {
                swal("Need Authorization", "", "error")
            }
        })
        console.log("ok")
        //1.56
    }

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

    function Iterator(){

    }

    useEffect(() => {
            setInterval(() => updateTable(), 1000)
            setInterval(() => Iterator(), 1000)
        }, []
    )


    return (
        <div className="App">
            <canvas id="canvas" onClick={clickCanvas} ref={canvas} width={390} height={390}></canvas>
            {points.map((point, key) => {
                    let rIn = props.r
                    let r = rIn;
                    let y = Number(point.y.toFixed(3))
                    // console.log(r)
                    // console.log(point.r)
                    if (point.r == r) {
                        let xPixels
                        let yPixels
                        if (point.x === 0) {
                            xPixels = 195
                        } else if (point.x > 0) {
                            xPixels = point.x / (r / 155) + 195
                        } else if (point.x < 0) {
                            xPixels = point.x / (r / 155) + 195
                        }
                        if (y === 0) {
                            yPixels = 195
                        } else if (y > 0) {
                            yPixels = y / ((r / 155) * -1) + 195
                        } else if (y < 0) {
                            yPixels = y / ((r / 155) * -1) + 195
                        }
                        // console.log(point)
                        // console.log(xPixels)
                        // console.log(yPixels)

                        const canvasEle = canvas.current;
                        ctx = canvasEle.getContext("2d");
                        ctx.fillStyle = "black"
                        ctx.beginPath()
                        ctx.fillRect(xPixels, yPixels, 4, 4);
                        ctx.stroke();
                    }
                }
            )}
        </div>

    );
}

export default Canvas;
