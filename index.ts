import express, {Express, Request, Response} from 'express'

const app: Express = express();
const port: number =  3000; 
interface Vehicle {
    model: string
    color: string
    year: number
    power: number
    bodyType?: string
    wheelCount?: number
    draft?: number
    wingspan?: number

}


let vehicles: Vehicle[]  = [];

app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello world");
})


app.post("/vehicle/add", (req: Request, res: Response) => {
    //console.log(req.body)
    if (req.body != null) {
        //If vehicle is car, then it should additionally have bodyType (string) and wheelCount (number) fields
        // If it is boat it has draft(number), and a plane should have wingspan (number)
        if(req.body.bodyType != undefined && req.body.wheelCount != undefined) {
            console.log("This vehicle is car!");
            let car : Vehicle = {
                model: req.body.model, 
                color: req.body.color, 
                year: req.body.year, 
                power: req.body.power,
                bodyType: req.body.bodyType,
                wheelCount: req.body.wheelCount
            }
            vehicles.push(car);
        
        } else if (req.body.draft != undefined) {
            console.log("This vehicle is boat!");
            let boat : Vehicle = {
                model: req.body.model, 
                color: req.body.color, 
                year: req.body.year, 
                power: req.body.power,
                draft: req.body.draft
            }
            vehicles.push(boat);
        } else if (req.body.wingspan != undefined) {
            console.log("This vehicle is plane!");
            let plane : Vehicle = {
                model: req.body.model, 
                color: req.body.color, 
                year: req.body.year, 
                power: req.body.power,
                wingspan: req.body.wingspan
            }
            vehicles.push(plane);

        } else {
            console.log("This vehicle is general vehicle!");
            let vehicle : Vehicle = {
                model: req.body.model, 
                color: req.body.color, 
                year: req.body.year, 
                power: req.body.power
            }
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
    
})

app.get("/vehicle/search/:model", (req: Request, res: Response) => {
    console.log(req.params.model);
    let found: number = 0;
    vehicles.forEach(vehicle => {
        if (vehicle.model == req.params.model) {
            let foundVehicle : Vehicle = {
                model: vehicle.model, 
                color: vehicle.color, 
                year: vehicle.year, 
                power: vehicle.power
            }
            found = 1; 
            res.send(foundVehicle);
        } else {
            found = 0;
        }
    })
    if (found == 0) {
        res.status(404).send("Not found!");
    }

})
app.listen(port, () => {
    console.log("Server is running at port ", port);
})