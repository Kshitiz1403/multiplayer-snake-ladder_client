import React, { useContext, useState } from 'react'
import { socket } from './App'
import { DispatchUserContext } from './contexts/UserContext'

export const JoinRoom = () => {

    const {setMyPlayerNumber, setRoomID} = useContext(DispatchUserContext)

    const [tempRoomID, setTempRoomID] = useState('')
    const [tempUserName, setTempUserName] = useState('')

    const joinOrCreateRoom = (tempUserName, tempRoomID) => {
        socket.emit('join_room', { userName: tempUserName, room: tempRoomID })
        setRoomID(tempRoomID)

        socket.on('roomUsers', data => {
            const user = data.users.find(user => user.id === socket.id)
            setMyPlayerNumber(user.playerNumber)
        })

    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zoom: 3 }}>
            <div>
                Enter Room ID
            </div>
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    joinOrCreateRoom(tempUserName, tempRoomID)
                }} >
                    <div>
                        <input placeholder='roomid' value={tempRoomID} onChange={v => setTempRoomID(v.target.value)} />
                    </div>
                    <div>
                        <input placeholder='username' value={tempUserName} onChange={v => setTempUserName(v.target.value)} />
                    </div>
                    <button type='submit'>Join</button>
                </form>
            </div>
        </div>
    )
}
