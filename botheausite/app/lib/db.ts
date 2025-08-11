import Database from 'better-sqlite3';
import path from 'path';
import { User } from '@/app/lib/definitions'
import { RendezVous } from '@/app/lib/definitions'  

export function getDB(): Database.Database {
  const dbPath = path.resolve(process.cwd(), 'botheautest');
  // open in readonly mode
  return new Database(dbPath, { readonly: true });
}


export function matchMDP(name: string,password: string ): number {
  const dbPath = path.resolve(process.cwd(), 'botheautest');
  // open in readonly mode
  const db = new Database(dbPath, { readonly: true });
  const user = db
    .prepare('SELECT * FROM MEMBERS WHERE NOM = ? AND MDP = ?')
    .get(name, password);
  db.close();

    if (user) {
        return 1; // USER FOUND cause password match
    } else {
        return -1; // User not found
    }
    
}

export function getUserData(name: string,password: string ) : User | null {
  const dbPath = path.resolve(process.cwd(), 'botheautest');
  // open in readonly mode
  const db = new Database(dbPath, { readonly: true });
  const user: User = {
    MEMBERS_ID: 0,
    name: '',
    email: '',
    role: '',
    userSurname: ''
  }
  
  const resDb = db
    .prepare('SELECT MEMBERS_ID,NOM,PRENOM FROM MEMBERS WHERE NOM = ? and MDP = ?')
    .get(name, password);
  db.close();

  if (resDb && typeof resDb === 'object') {
    const dbUser = resDb as { MEMBERS_ID: number; NOM: string; PRENOM: string };
    user.MEMBERS_ID = dbUser.MEMBERS_ID;
    user.name = dbUser.NOM;
    user.userSurname = dbUser.PRENOM;
    user.email = dbUser.NOM + '@example.com'; // Assuming email is derived from name
    return user;
  }

  return null;
}


export function getNextRendezVous(): RendezVous | null {
  const dbPath = path.resolve(process.cwd(), 'botheautest');
  const db = new Database(dbPath, { readonly: true });

  try {
    // Recupere le prochain RDV (date >= aujourd'hui) trie par date croissante
    const nextRdv = db
      .prepare(`
        SELECT rdv_id, rdv_date 
        FROM RDV 
        WHERE julianday(
            substr(rdv_date,7,4) || '-' || substr(rdv_date,4,2) || '-' || substr(rdv_date,1,2)
        ) >= julianday('now','localtime')
        ORDER BY rdv_date desc	
        LIMIT 1;
      `)
      .get() as RendezVous | undefined;

    return nextRdv || null;
  } finally {
    db.close();
  }
}