import Link from 'next/link'
import React from 'react'
import { getNextRendezVous } from '@/app/lib/db'

const homePage = async () => {

  const nextRdv = getNextRendezVous()
  console.log('nextRdv', nextRdv)

   return (
    <div>
      <h1>Accueil</h1>
      
      {/* Section du prochain RDV */}
      <div style={{ 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '30px',
        border: '1px solid #ddd'
      }}>
        <h2>📅 Prochain Rendez-vous</h2>
        {nextRdv ? (
          <div>
            <p>Date : {nextRdv.RDV_DATE}</p>
          </div>
        ) : (
          <p>Aucun rendez-vous programmé</p>
        )}
      </div>

      {/* Navigation existante */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <Link href="/home/rendez_vous" style={{ textDecoration: 'none' }}>
          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
            <h2>📅 Rendez-vous</h2>
          </div>
        </Link>
     
        <Link href="/home/arbre_genealogique" style={{ textDecoration: 'none' }}>
          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
            <h2>🌳 Arbre Généalogique</h2>
          </div>
        </Link>
    
        <Link href="/home/gallerie" style={{ textDecoration: 'none' }}>
          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
            <h2>🖼️ Galerie</h2>
          </div>
        </Link>
   
        <Link href="/home/profil" style={{ textDecoration: 'none' }}>
          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
            <h2>👤 Profil</h2>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default homePage
