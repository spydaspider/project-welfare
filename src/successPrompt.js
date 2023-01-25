const SuccessPrompt = ({message,handleSuccessClose}) =>{
    return(
            <div className = "pending-loan">
                <div onClick = {handleSuccessClose} className = "success-prompt-close">
                    <span className = "bar-l black"></span>
                    <span className = "bar-l black"></span>
                    <span className = "bar-l black"></span>

                </div>
                <p className = "success">{message}</p>
            </div>
    
    )

}
export default SuccessPrompt;