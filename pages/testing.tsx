/* eslint-disable object-shorthand */
/* eslint-disable no-empty-pattern */
/* eslint-disable import/extensions */
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import PlayerComponent from '../components/player';
import SettingComponent from '../components/setting';

type PageParams = {
  id: string;
};

type Setting = {
  locationName: string;
  locationDetail: string;
  date: string;
  time: string;
  price: string;
  playTime: string;
};
type Data = { _id: string; playerName: string };

type ContentPageProps = {
  setting: Setting;
  data: Data;
};

type ResponseFromServer = {
  locationName: string;
  locationDetail: string;
  date: string;
  time: string;
  price: string;
  playTime: string;
};



export default function Testing({ data , setting: { locationName, locationDetail, date, time, price, playTime }}: ContentPageProps) {
  return (
    <div className="max-w-xl mx-auto w-full">
      <SettingComponent
        setting={{
          locationName: locationName,
          locationDetail: locationDetail,
          date: date,
          time: time,
          price: price,
          playTime: playTime,
        }}
      />
      <PlayerComponent data={data} />
    </div>
  );
}

export async function getStaticProps({}: GetStaticPropsContext<PageParams>): Promise<
  GetStaticPropsResult<ContentPageProps>
> {
  try {
    const response = await fetch('http://localhost:3000/api/getSetting');
    const responseFromServer: ResponseFromServer = await response.json();

    const res = await fetch('http://localhost:3000/api/getPlayer');
    const data: Data = await res.json();

    return {
      props: {
        setting: {
          locationName: responseFromServer.locationName,
          locationDetail: responseFromServer.locationDetail,
          date: responseFromServer.date,
          time: responseFromServer.time,
          price: responseFromServer.price,
          playTime: responseFromServer.playTime,
        },
        data: data
      },
    };
  } catch (e) {
    return {
      props: {
        setting: {
          locationName: '',
          locationDetail: '',
          date: '',
          time: '',
          price: '',
          playTime: '',
        },
        data
      },
    };
  }
}
