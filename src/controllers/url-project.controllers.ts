import express, { Request, Response } from "express";
import { teste, createNewURL, getUrl } from '../repositories/UserRepository'
import path from 'path' 

export async function testeRoter(req: Request, res: Response): Promise<void> {
    
    res.sendFile(path.join(__dirname, "../../public/index.html"));
}

export async function confirmUrl(req: Request, res: Response): Promise<void> {
	let urlMask = req.params.url;

    const resposta = await getUrl(urlMask);
    console.log(resposta[0]);
    
    if (resposta[0] != undefined) {
        res.redirect(resposta[0]);
    } else {
	    res.json({ error: "Url não encontrada em nosso banco de dados" });
    }

}

export async function json_form(req: Request, res: Response): Promise<void> {
	let { url, mask } = req.body;

    if (url != undefined || mask != undefined) {
        await createNewURL(String(url), String(mask))
    }

	console.log("Resposta enviada com sucesso!", url, mask);

	res.json({
		message: "Formulário recebido com sucesso!",
		dados: {
			url,
			mascara: mask,
		},
	});
}

