

 function ToastBody ({ title, body, type }) {
    let titleColor = ''
    let bodyColor = ''
    let borderColor = ''
    switch(type) {
        case 'error':
            titleColor = 'text-red-800';
            borderColor = 'border-y-red-800';
            bodyColor = 'text-red-800';
            break;
        case 'success':
            titleColor = 'text-lime-600';
            borderColor = 'border-y-lime-600';
            bodyColor = 'text-lime-800';
            break;
        default:
            titleColor = 'text-amber-500';
            borderColor = 'border-y-amber-500';
            bodyColor = 'text-amber-500';
    }
    return (
        <div>
            <div className="flex">
                <div className={`text-md px-1 ${titleColor} mb-1 border-b-2 ${borderColor}`}>{title}</div>
            </div>
            <div>
                <p className={`text-xs ${bodyColor}`}>{body}</p>
            </div>
        </div>
    )
 }

 export default ToastBody
