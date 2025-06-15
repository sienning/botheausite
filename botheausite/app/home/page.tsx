import Link from 'next/link'
import React from 'react'

const homePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/home/rendez_vous">
        <h2>Rendez-vous</h2>
      </Link>
   
      <Link href="/home/arbre_genealogique">
        <h2>Arbre Genealogique</h2>
      </Link>
  
      <Link href="/home/gallerie">
        <h2>Galerie</h2>
      </Link>
 
      <Link href="/home/profil">
        <h2>Profil</h2>
      </Link>
    </div> 
  )
}

export default homePage
