"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
let vehicles = [];
app.use(express_1.default.json());
app.get("/hello", (req, res) => {
    res.send("Hello world");
});
app.post("/vehicle/add", (req, res) => {
    //console.log(req.body)
    if (req.body != null) {
        //If vehicle is car, then it should additionally have bodyType (string) and wheelCount (number) fields
        // If it is boat it has draft(number), and a plane should have wingspan (number)
        if (req.body.bodyType != undefined && req.body.wheelCount != undefined) {
            console.log("This vehicle is car!");
            let car = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
                bodyType: req.body.bodyType,
                wheelCount: req.body.wheelCount
            };
            vehicles.push(car);
        }
        else if (req.body.draft != undefined) {
            console.log("This vehicle is boat!");
            let boat = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
                draft: req.body.draft
            };
            vehicles.push(boat);
        }
        else if (req.body.wingspan != undefined) {
            console.log("This vehicle is plane!");
            let plane = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power,
                wingspan: req.body.wingspan
            };
            vehicles.push(plane);
        }
        else {
            console.log("This vehicle is general vehicle!");
            let vehicle = {
                model: req.body.model,
                color: req.body.color,
                year: req.body.year,
                power: req.body.power
            };
            vehicles.push(vehicle);
        }
        res.status(201).send("Vehicle added");
    }
    /*let vehicle : Vehicle = {
        model: req.body.model,
        color: req.body.color,
        year: req.body.year,
        power: req.body.power
    }*/
    //vehicles.push(vehicle);
    //res.status(201).send("Vehicle added");
    //} else {
    //res.sendStatus(404).send("Failed to add vehicle");
    //}
});
app.get("/vehicle/search/:model", (req, res) => {
    let found = 0;
    vehicles.forEach(vehicle => {
        if (vehicle.model == req.params.model) {
            found = 1;
            res.send(vehicle);
        }
        else {
            found = 0;
        }
    });
    if (found == 0) {
        res.status(404).send("Not found!");
    }
});
app.listen(port, () => {
    console.log("Server is running at port ", port);
});
