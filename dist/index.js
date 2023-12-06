"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8000;
let vehicles = [];
app.get("/hello", (req, res) => {
    res.send("Hello world");
});
app.post("/vehicle/add", (req, res) => {
    console.log(req.body.model);
    if (req.body != null) {
        let vehicle = {
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            power: req.body.power
        };
        vehicles.push(vehicle);
        res.sendStatus(201).send("Vehicle added");
    }
    else {
        res.sendStatus(404).send("Failed to add vehicle");
    }
});
app.listen(port, () => {
    console.log("Server is running at port ", port);
});
