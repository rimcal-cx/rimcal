import PureModal from 'react-pure-modal';
import { IoMdCloseCircle } from 'react-icons/io'
import { useEffect } from 'react';
import { ImSpinner5 } from 'react-icons/im';

export function PopupModal ({popupToggle, setPopupToggle, header, footer, content, syncToggle}) {
    useEffect(() => {
    },[popupToggle, header, footer, content, syncToggle])

    const onConfirm = () => {
        if (footer?.confirm?.onConfirm)
            footer.confirm.onConfirm()
        setPopupToggle((prevToggle) => !prevToggle)
    }

    const onCancel = () => {
        if (footer?.cancel?.onCancel)
            footer.cancel.onCancel()
        setPopupToggle((prevToggle) => !prevToggle)
    }

    return (
        <PureModal
            replace={true}
            portal={true}
            isOpen={popupToggle}
            className={'!w-screen !h-screen'}
        >
        {!syncToggle ?
            (<div className="popup">
                <div id="popup-modal-header" className='bg-gray-200 rounded-t-xl p-3 border-b-2'>
                    <div className='w-5/6'>
                        <div className="flex flex-start" >
                            <p className="text-gray-900 text-lg font-medium">{header ?? "Are you sure ?"}</p>
                        </div>
                    </div>
                    <button className="close !right-2.5" onClick={() => { setPopupToggle((prevToggle) => !prevToggle) }}>
                        <IoMdCloseCircle className='w-7 h-7 text-red-700' />
                    </button>
                </div>
                <div id="popup-modal-content" className="content p-7 text-sm font-normal">
                    {content ?? 'Content Goes here!'}
                </div>
                <div id="popup-modal-footer" className='border-t-2 bg-gray-200 rounded-b-xl py-3 pl-3 pr-1'>
                    <div className='flex justify-end'>
                        <div className={`w-2/5 flex ${footer?.confirm ? 'justify-around' : 'justify-end pr-3' }`} >
                            <button className={`bg-red-700 hover:bg-red-800 text-gray-50 px-3 py-1 rounded-lg ${footer?.cancel?.customCss ?? ''}`} onClick={onCancel} >{footer?.cancel?.cancelText ?? "Cancel"}</button>
                            { footer?.confirm && <button className={`px-3 py-1 rounded-lg ring-gray-300 ring-1 ${footer?.confirm.customCss}`} onClick={onConfirm}>{footer?.confirm?.confirmText ?? "Save" }</button> }
                        </div>
                    </div>
                </div>
            </div>)
            :
            (
                <div className='popup !bg-transparent'>
                    <div className='flex justify-center rounded-full'>
                    <ImSpinner5 className="w-10 h-10 text-white animate-spin" />
                    </div>
                </div>
            )
        }
        </PureModal>
    )
}
