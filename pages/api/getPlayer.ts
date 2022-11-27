/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable import/order */
/* eslint-disable import/extensions */
import clientPromise from '../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db('tiba2_futsal');

    const player = await db
      .collection("players")
      .find({})
      .toArray();

    res.json(player);
  } catch (e) {
    throw new Error(e).message;
  }
};
