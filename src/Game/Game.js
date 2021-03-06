import React, { useContext } from 'react'
import { VictoryContext } from '../contexts/VictoryContext'
import stylesheet from './Game.module.css'

export const Game = (props) => {
    const { isVictory } = useContext(VictoryContext)
    return (
        <div>
            {isVictory ? <h1 className={stylesheet.victoryContainer}>Congratulations!</h1> : null}
            <div className={stylesheet.backdrop} style={{ opacity: isVictory ? 0.5 : 1 }}>
                {props.children}
            </div>
        </div>
    )
}
