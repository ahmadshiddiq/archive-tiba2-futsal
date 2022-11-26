import { prisma } from '../lib/prisma';
import { GetStaticProps } from 'next';
import { useState } from 'react';

export default function Testing(props: any) {
    const { schedules } = props;

    console.log(schedules);
    
  return (
    <div>
      <p>Testing world!</p>
      {schedules.map((schedule:any) => {
        <ul key={schedule.id}>
            <li>Nama Tempat: {schedule.name}</li>
            <li>Nama Lokasi: {schedule.location}</li>
            <li>Google Maps: {schedule.googleMaps}</li>
            <li>Waktu Bermain: {schedule.playTime}</li>
            <li>Total Harga: {schedule.price}</li>
            <li>Tangga Main: {schedule.date}</li>
        </ul>
      })}
      sdgf
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const schedules = await prisma.schedule.findMany({
    include: {
      player: {
        select: { name: true },
      },
    },
  });
  return {
    props: { schedules },
    revalidate: 10,
  };
};
