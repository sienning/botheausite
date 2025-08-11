'use client';
// This file is a client component that fetches and displays members from an API endpoint.
import { useEffect, useState } from 'react';

interface Member {
  MEMBERS_ID: number;
  NOM: string;
  PRENOM: string;
}

export default function Home() {
  const [members, setMembers] = useState<Member[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/member')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(await res.text());
        }
        return res.json();
      })
      .then((data: { members: Member[] }) => {
        setMembers(data.members);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load members');
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (members === null) return <p>Loading…</p>;

  return (
    <div>
      <h1>Members</h1>
      <ul>
        {members.map((m) => (
          <li key={m.MEMBERS_ID}>
            <strong>{m.NOM}</strong> — {m.PRENOM}
          </li>
        ))}
      </ul>
    </div>
  );
}
