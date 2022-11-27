/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable import/extensions */
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("tiba2_futsal");
        const { playerName } = req.body;

        const post = await db.collection("players").insertOne({
            playerName,
        });

        res.json(post);
    } catch (e) {
        throw new Error(e).message;
    }
};
