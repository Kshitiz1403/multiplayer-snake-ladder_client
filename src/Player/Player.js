import React, { useContext, useEffect, useState } from 'react'
import player1 from '../assets/player/mummy-head.svg'
import player2 from '../assets/player/cleopatra.svg'
import player3 from '../assets/player/monk-face.svg'
import player4 from '../assets/player/goblin-head.svg'
import player5 from '../assets/player/female-vampire.svg'
import { LayoutContext } from '../contexts/LayoutContext'
import { DispatchPositionContext, PositionContext } from '../contexts/PositionContext'
import { laders, snakes } from '../config'
import { VictoryContext } from '../contexts/VictoryContext'
import stylesheet from './Player.module.css'

const Player = () => {
    const { squareDimension } = useContext(LayoutContext)
    const { dice, location, coordinates } = useContext(PositionContext)
    const { dispatchLocation, dispatchCoordinates } = useContext(DispatchPositionContext)
    const { won } = useContext(VictoryContext)

    const Character = () => (
        <div className={stylesheet.character} style={{ width: squareDimension, height: squareDimension, padding: squareDimension * 0.4 }}>
            <img src={player5} />
        </div>
    )

    useEffect(() => {
        if (dice.value + location + 1 > 100) {
            return
        }
        let boolean = false
        for (const snake of snakes) {
            if (dice.value + location + 1 == snake.from) {
                dispatchLocation({ type: "TO", value: snake.to - 1 })
                boolean = true
                break
            }
        }
        for (const lader of laders) {
            if (dice.value + location + 1 == lader.from) {
                dispatchLocation({ type: "TO", value: lader.to - 1 })
                boolean = true
                break
            }
        }
        if (boolean == true) return;

        dispatchLocation({ type: "INCREMENT", value: dice.value })
    }, [dice])

    useEffect(() => {
        if (location == 99) {
            // show victory model
            won(true)
        }
        movementHandler(location)
    }, [location])


    const movementHandler = (location) => {
        const verticalCor = Math.floor(location / 10)
        let horizontalCor
        if (verticalCor % 2 == 1) { horizontalCor = 9 - location % 10 }
        else { horizontalCor = location % 10 }

        dispatchCoordinates({ type: "UPDATE", payload: { horizontal: horizontalCor, vertical: verticalCor } })
    }
    return (
        <div className={stylesheet.container} style={{ bottom: squareDimension * coordinates.vertical, left: squareDimension * coordinates.horizontal }}>
            <Character />
        </div>
    )
}

export default Player