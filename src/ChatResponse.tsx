interface ChatResponseProps {
    result: string
}

export default function ChatResponse(props: ChatResponseProps) {

    return (
        <div className="row">
            <textarea className="col" placeholder={props.result} readOnly/>
        </div>
    )
}