/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable import/extensions */
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("tiba2_futsal");

        const playerId = await db
            .collection("players")
            .deleteMany({})

        res.json(playerId);
    } catch (e) {
        throw new Error(e).message;
    }
};
