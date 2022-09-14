import React, {useState} from "react";
import { Link } from "react-router-dom";
import '../assets/custom-style.css'
import { ImSpinner5 } from 'react-icons/im';

const Signup =()=>{
    const [loading, setLoading] = useState(false)


        /**
     * @desc Login route to open provider window for SSO
     * @param provider - Name of provider we are sending user auth to.
     */
       const login = () => {
            // this.loading = true
            setLoading(true)
            const width = 640
            const height = 660
            const left = window.screen.width / 2 - (width / 2)
            const top = window.screen.height / 2 - (height / 2)

            let providerUrl = `${process.env.REACT_APP_API_URL}/api/google/redirect`
            // if (provider === 'okta')
            //   providerUrl = `${this.assets?.apiUrl}/redirectstate/${provider}`

            const win = window.open(providerUrl, 'Log In',
                `toolbar=no, location=no, directories=no, status=no, menubar=no, scollbars=no,
            resizable=no, copyhistory=no, width=${width},height=${height},top=${top},left=${left}`)

            const interval = setInterval(() => {
              if (win === null || win.closed) {
                clearInterval(interval)
                // this.loading[provider] = false
                setLoading(false)
              }
            }, 200)
          };

    return(
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-3/5">
                <div className="flex justify-between">
                    <img src="https://dev.rimsys.dev/logo/logo-bar.png" alt="Workflow" className="h-12 w-auto" />
                    <img src="https://dev.rimsys.dev/logo/logo-bar.png" alt="Workflow" className="h-12 w-auto" />
                </div>
                <div className="w-full py-20 m-4 bg-slate-100 mx-auto flex justify-center items-center">
                {/* <Link to="/calender" className="h-3 border-2 rounded p-3 hover:bg-indigo-200 font-bold"> Go to Calender</Link> */}
                    <div className={`${!loading ? 'cursor-pointer' : 'pointer-events-none' } google-btn mx-auto`} onClick={() => login()}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="g-sign"/>
                        </div>
                        <p className={`btn-text ${!loading ? 'show' : 'hidden' }`}>
                            <b>Sign in with google</b>
                        </p>
                        <p className={`btn-spinner ${!loading ? 'hidden' : 'show' }`}>
                            <ImSpinner5 className="animate-spin" />
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
