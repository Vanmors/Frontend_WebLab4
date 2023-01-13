import React, { useRef, useEffect } from 'react';
import "./styleForCanvas.css"
import App from "../App";

function Canvas() {
    const canvas = useRef();
    let ctx = null;

    // initialize the canvas context
    useEffect(() => {
        // dynamically assign the width and height to canvas
        const canvasEle = canvas.current;
        // canvasEle.width = canvasEle.clientWidth;
        // canvasEle.height = canvasEle.clientHeight;

        // get context of the canvas
        ctx = canvasEle.getContext("2d");
    }, []);

    useEffect(() => {
        drawLine({ x: 20, y: 20, x1: 20, y1: 100 });

        drawLine({ x: 50, y: 50, x1: 200, y1: 100 }, { color: 'red' });

        drawLine({ x: 300, y: 250, x1: 260, y1: 70 }, { color: 'green', width: 5 });

        drawLine({ x: 70, y: 240, x1: 160, y1: 120 }, { color: 'blue' });
    }, []);

    // draw a line
    const drawLine = (info, style = {}) => {
        const {x, y, x1, y1} = info;
        const {color = 'black', width = 1} = style;

        ctx.fillStyle = '#3399ff'; // Задаём чёрный цвет для линий
// ctx.fillRect(10, 10, 100, 100);
        ctx.lineWidth = 1.0; // Ширина линии
        ctx.beginPath(); // Запускает путь
        ctx.moveTo(127.5, 5); // Рисуем ось
        ctx.lineTo(127.5, 245);
        ctx.moveTo(5, 127.5);
        ctx.lineTo(245, 127.5);

        ctx.fillRect(127.5, 127.5, 97.5, -50) // Рисуем и закршиваем прямоугльник
        ctx.stroke(); // Делаем контур

        ctx.beginPath();
        ctx.moveTo(225, 127.5); // Рисуем и закршиваем треугольник
        ctx.lineTo(127.5, 222.5);
        ctx.lineTo(127.5, 127.5);
        ctx.lineTo(225, 127.5);
        ctx.fill();
        ctx.stroke();


        ctx.beginPath();
        ctx.arc(127.5, 127.5, 100, Math.PI, -Math.PI / 2) // Рисуем и закршиваем четверть круга
        ctx.moveTo(127.5, 27.5);
        ctx.lineTo(127.5, 127.5);
        ctx.lineTo(27.5, 127.5);

        ctx.fill();
        ctx.stroke();


        ctx.moveTo(125, 27.5); // Вставляем R на график
        ctx.lineTo(130, 27.5);
        ctx.fillStyle = 'black'; // Задаём чёрный цвет для линий
        ctx.font = "15px Verdana";
        ctx.fillText("R", 130, 27.5)
        ctx.moveTo(225, 125);
        ctx.lineTo(225, 130);
        ctx.font = "15px Verdana";
        ctx.fillText("R", 227.5, 125)
        ctx.moveTo(125, 222.5);
        ctx.lineTo(130, 222.5);
        ctx.fillText("-R", 145, 230)
        ctx.moveTo(27.5, 125);
        ctx.lineTo(27.5, 130);
        ctx.fillText("-R", 7.5, 125)
        ctx.stroke(); // Делаем контур
    }


    function clickCanvas(e) {
        let r = document.getElementById("RInput").value;

        let rect = e.target.getBoundingClientRect();
        let x = (e.clientX - rect.left); //x position within the element.
        let y = (e.clientY - rect.top) ;  //y position within the element.
        console.log("Left? : " + x + " ; Top? : " + y + ".");
        ctx.beginPath();
        ctx.fillRect(x+20, y+40, 2, 2);
        ctx.stroke();
    }


    return (
        <div className="App">
            <canvas id="canvas" onClick={clickCanvas} ref={canvas} width={250} height={250}></canvas>
        </div>
    );
}

export default Canvas;
