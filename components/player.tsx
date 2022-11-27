/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty-pattern */
/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { GetServerSideProps } from 'next';
import { useState } from 'react';

type Data = { _id: string; playerName: string; onClick: () => void };

export default function PlayerComponent({ data }) {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Push To PlayerDB
  const handleSubmitPlyaer = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/addPlayer', {
        method: 'POST',
        body: JSON.stringify({
          playerName: playerName,
        }),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      setPlayerName('');
      setMessage('successfully');
    } catch (errorMessage: any) {
      setError(errorMessage);
    }
  };

  const handleDeletePlayer = async (playerId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/delete?id=${playerId}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        }
      );
      await response.json();
      window.location.reload();
    } catch (errors) {
      console.log('An error occurred while deleting ', errors);
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full">
      {/* Player */}
      <form onSubmit={handleSubmitPlyaer} className="space-y-4 py-20">
        {error ? <div className="alert-error">{error}</div> : null}
        {message ? <div className="alert-message">{message}</div> : null}
        <div className="form-group">
          <label
            htmlFor="playerName"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Pemain
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="playerName"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Nama Pemain"
              onChange={(e) => setPlayerName(e.target.value)}
              value={playerName}
            />
          </div>
        </div>

        <button
          type="submit"
          className="py-2 px-10 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      </form>
      <div>
        <h1 className="text-2xl border-b border-gray-200 py-2">Show Player</h1>
        <ul className="mt-2">
          {data.map((obj: Data) => (
            <li key={obj._id}>
              <span>{obj.playerName}</span>
              <button onClick={() => handleDeletePlayer(obj._id as string)} className='text-red-500 ml-2 text-xs'>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: Data;
}> = async () => {
  const res = await fetch('http://localhost:3000/api/getPlayer');
  const data: Data = await res.json();

  return {
    props: {
      data,
    },
  };
};
