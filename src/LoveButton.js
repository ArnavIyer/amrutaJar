import { useState } from 'react'
import heart from './heart.svg'

export function LoveButton() {

    return (
        <div className="absolute inset-0">
            <img src={heart} className="place-content-center" />
        </div>
    )
}