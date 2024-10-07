import { useState } from 'react';

interface ChatProps {
    onSendMessage: (x:string) => void
}


export default function Chat(props: ChatProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.onSendMessage(e.currentTarget.value)
        }
    };
    const [message, setMessage] = useState('')
    return (
        <div className="row">
            <input onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} className="col-11" type="text" placeholder="Type your message here" />
            <button onClick={() => props.onSendMessage(message)} className="col btn btn-primary" type="submit">Send</button>
        </div>
    )
}