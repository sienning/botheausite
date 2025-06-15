import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='absolute inset-x-0 top-0 z-50' >
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className='flex lg:flex-1'>
                    <Link href={"/home"}>
                        <h1 className='font-bold' >Botheausite</h1>
                    </Link>
                </div>

                <div className='flex lg:flex-1'>
                    <Link href="/home/rendez_vous">
                        <h2>Rendez-vous</h2>
                    </Link>
                </div>


                <div className='flex lg:flex-1'>

                    <button type="button" className="">
                        <Link href="/home/arbre_genealogique">
                            <h2>Historique</h2>
                        </Link>
                    </button>
                </div>
                <div className='flex lg:flex-1'>

                    <Link href="/home/galerie">
                        <h2>Galerie</h2>
                    </Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href="/home/profil">
                        <h2>Profil</h2>
                    </Link>
                </div>

            </nav>
        </div>
    )
}

export default Header;