import Database from 'better-sqlite3';
import path from 'path';

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