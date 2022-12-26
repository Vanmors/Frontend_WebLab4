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
        ctx.lineWidth = 2.0; // Ширина линии
        ctx.beginPath(); // Запускает путь
        ctx.moveTo(255, 10); // Рисуем ось
        ctx.lineTo(255, 490);
        ctx.moveTo(10, 255);
        ctx.lineTo(490, 255);

        ctx.fillRect(255, 255, 195, -100) // Рисуем и закршиваем прямоугльник
        ctx.stroke(); // Делаем контур

        ctx.beginPath();
        ctx.moveTo(450, 255); // Рисуем и закршиваем треугольник
        ctx.lineTo(255, 445);
        ctx.lineTo(255, 255);
        ctx.lineTo(450, 255);
        ctx.fill();
        ctx.stroke();


        ctx.beginPath();
        ctx.arc(255, 255, 200, Math.PI, -Math.PI / 2) // Рисуем и закршиваем четверть круга
        ctx.moveTo(255, 55);
        ctx.lineTo(255, 255);
        ctx.lineTo(55, 255);

        ctx.fill();
        ctx.stroke();


        ctx.moveTo(250, 55); // Вставляем R на график
        ctx.lineTo(260, 55);
        ctx.fillStyle = 'black'; // Задаём чёрный цвет для линий
        ctx.font = "30px Verdana";
        ctx.fillText("R", 260, 50)
        ctx.moveTo(450, 250);
        ctx.lineTo(450, 260);
        ctx.font = "30px Verdana";
        ctx.fillText("R", 455, 250)
        ctx.moveTo(250, 445);
        ctx.lineTo(260, 445);
        ctx.fillText("-R", 270, 460)
        ctx.moveTo(55, 250);
        ctx.lineTo(55, 260);
        ctx.fillText("-R", 15, 250)
        ctx.stroke(); // Делаем контур
    }


    function clickCanvas(e) {
        let r = document.getElementById("RInput").value;
        //console.log(r)
        //     let x = e.pageX;
        //     let y = e.pageY;
        //     console.log(x)
        //     console.log(y)
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left; //x position within the element.
        let y = e.clientY - rect.top;  //y position within the element.
        console.log("Left? : " + x + " ; Top? : " + y + ".");
    }
        // document.addEventListener('DOMContentLoaded', () => {
        //     document.getElementById("canvas").addEventListener('click', pos);
        // })

    return (
        <div className="App">
            <canvas id="canvas" onClick={clickCanvas} ref={canvas} width={500} height={500}></canvas>
        </div>
    );
}

export default Canvas;
