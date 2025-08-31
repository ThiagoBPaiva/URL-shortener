import express, { Request, Response } from "express";
import { teste, createNewURL } from '../repositories/UserRepository'
import path from 'path' 

export async function testeRoter(req: Request, res: Response): Promise<void> {
    // let result: number = await teste();
    // res.json({message: result})
    let { url, mask } = req.query;

    if (url != undefined || mask != undefined) {
        await createNewURL(String(url), String(mask))
    }
    
    res.sendFile(path.join(__dirname, "../../public/index.html"));
}

export async function confirmUrl(req: Request, res: Response): Promise<void> {}
