/* eslint-disable no-empty-pattern */
/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useState } from 'react';

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

type ContentPageProps = {
  setting: Setting;
};

type ResponseFromServer = {
  locationName: string;
  locationDetail: string;
  date: string;
  time: string;
  price: string;
  playTime: string;
};

export default function SettingPage({
  setting: { locationName, locationDetail, date, time, price, playTime },
}: ContentPageProps) {
  const [inputedSetting, setInputedSetting] = useState({
    locationName: locationName,
    locationDetail: locationDetail,
    date: date,
    time: time,
    price: price,
    playTime: playTime,
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/editSetting', {
        method: 'PUT',
        body: JSON.stringify({
          locationName: inputedSetting.locationName,
          locationDetail: inputedSetting.locationDetail,
          date: inputedSetting.date,
          time: inputedSetting.time,
          price: inputedSetting.price,
          playTime: inputedSetting.playTime,
        }),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      setInputedSetting({
        locationName: '',
        locationDetail: '',
        date: '',
        time: '',
        price: '',
        playTime: '',
      });
      setMessage('successfully');
    } catch (errorMessage: any) {
      setError(errorMessage);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto space-y-4 py-20"
      >
        {error ? <div className="alert-error">{error}</div> : null}
        {message ? <div className="alert-message">{message}</div> : null}
        <div className="form-group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Lokasi
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="locationName"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Lokasi Main"
              onChange={(e) =>
                setInputedSetting({
                  ...inputedSetting,
                  locationName: e.target.value,
                })
              }
              value={
                inputedSetting.locationName ? inputedSetting.locationName : ''
              }
            />
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Detail Lokasi
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="locationDetail"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Detail Lokasi (alamat)"
              onChange={(e) =>
                setInputedSetting({
                  ...inputedSetting,
                  locationDetail: e.target.value,
                })
              }
              value={
                inputedSetting.locationDetail
                  ? inputedSetting.locationDetail
                  : ''
              }
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-5">
          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Tanggal Futsal
            </label>
            <div className="mt-1">
              <input
                type="date"
                placeholder="Tanggal Maen"
                name="date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) =>
                  setInputedSetting({ ...inputedSetting, date: e.target.value })
                }
                value={inputedSetting.date ? inputedSetting.date : ''}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Jam Futsal
            </label>
            <div className="mt-1">
              <input
                type="time"
                placeholder="Jam Maen"
                name="time"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) =>
                  setInputedSetting({ ...inputedSetting, time: e.target.value })
                }
                value={inputedSetting.time ? inputedSetting.time : ''}
              />
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-5">
          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Tanggal Futsal
            </label>
            <div className="mt-1">
              <input
                name="date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                type="number"
                placeholder="Waktu bermain"
                onChange={(e) =>
                  setInputedSetting({
                    ...inputedSetting,
                    playTime: e.target.value,
                  })
                }
                value={inputedSetting.playTime ? inputedSetting.playTime : ''}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Jam Futsal
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="time"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Harga"
                onChange={(e) =>
                  setInputedSetting({
                    ...inputedSetting,
                    price: e.target.value,
                  })
                }
                value={inputedSetting.price ? inputedSetting.price : ''}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="py-2 px-10 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export async function getStaticProps({}: GetStaticPropsContext<PageParams>): Promise<
  GetStaticPropsResult<ContentPageProps>
> {
  try {
    const response = await fetch('http://localhost:3000/api/getSetting');

    const responseFromServer: ResponseFromServer = await response.json();

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
      },
    };
  }
}
