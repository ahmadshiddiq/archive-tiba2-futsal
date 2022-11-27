/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable import/extensions */
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("tiba2_futsal");
        const { id } = req.query;

        const playerId = await db
            .collection("players")
            .deleteOne({
                '_id': ObjectId(id)
            })

        res.json(playerId);
    } catch (e) {
        throw new Error(e).message;
    }
};
