import express, {Request, Response} from 'express'
import {router} from './routes/url-project.routes'
import path from 'path'

const app = express();

router.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(router);


app.listen(3000, () => {
    console.log("Server on in port 3000 👾");
});