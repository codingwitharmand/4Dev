

const InputDefault = (props: { label?: string, placeholder?: string, type?: string, value?: string, onChange?: (e: any) => void, className?: string, disabled?: boolean, editable?: boolean, onpressEnter?: (e: any) => void }) => {

    return (!props.disabled ? <div className={`my-2 max-w-[425px] ${props.className || ""}`}>
        {props.label && <label className="text-xs text-white">{props.label}</label>}
        <input
            className="w-full h-[35px] p-2 border border-white rounded bg-black outline-none placeholder:text-sm text-sm"
            placeholder={props.placeholder}
            type={props.type}
            defaultValue={props.value}
            onChange={props.onChange}
            onKeyDown={(e) => e.key === "Enter" && props.onpressEnter && props.onpressEnter(e)}
        />
    </div> : <div className={`my-2 max-w-[425px] ${props.className || ""} opacity-50 select-none`}>
        {props.label && <label className="text-xs text-white">{props.label}</label>}
        <div className="w-full h-[35px] p-2 border border-white rounded bg-black flex items-center text-sm">
            <p>{props.value}</p>
        </div>
    </div>)
}

export default InputDefault;