import express, {Express, Request, Response} from 'express'

const app: Express = express();
const port: number =  8000; 
type Vehicle = {
    model: string
    color: string
    year: number
    power: number
}
let vehicles: Vehicle[]  = [];

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello world");
})


app.post("/vehicle/add", (req: Request, res: Response) => {
    console.log(req.body.model)
    if (req.body != null) {
        let vehicle : Vehicle = {
            model: req.body.model, 
            color: req.body.color, 
            year: req.body.year, 
            power: req.body.power
        }
        vehicles.push(vehicle);
        res.sendStatus(201).send("Vehicle added")
} else {
    res.sendStatus(404).send("Failed to add vehicle");
}
    
})


app.listen(port, () => {
    console.log("Server is running at port ", port);
})