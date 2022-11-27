/* eslint-disable object-shorthand */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable import/order */
// eslint-disable-next-line import/extensions
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("tiba2_futsal");
    const { locationName, locationDetail, date, time, price, playTime } = req.body;


    const setting = await db
      .collection("settings")
      .updateOne(
        {
          "_id": ObjectId("63832e70be97a6bf135d3619")
        },
        {
          $set: {
            "locationName": locationName,
            "locationDetail": locationDetail,
            "date": date,
            "time": time,
            "price": price,
            "playTime": playTime,
          }
        }

      );

    res.json(setting);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};