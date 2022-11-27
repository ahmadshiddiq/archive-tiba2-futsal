/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable import/order */
/* eslint-disable import/extensions */
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db('tiba2_futsal');

    const setting = await db.collection('settings').findOne({
      _id: ObjectId('63832e70be97a6bf135d3619'),
    });

    res.json(setting);
  } catch (e) {
    throw new Error(e).message;
  }
};
