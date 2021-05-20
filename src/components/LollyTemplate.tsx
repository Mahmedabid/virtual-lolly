import React, { useState } from 'react'
import Header from './Header'
import { Lolly } from './Lolly'

interface PageProps {
    c1: string
    c2: string
    c3: string
    msg: string
    sender: string
    receiver: string
    lollyPath: string
}

const LollyTemplate: React.FC<PageProps> = ({ c1, c2, c3, msg, sender, receiver, lollyPath }) => {

    const path = `https://ahm-vlolly.netlify.app/viewlolly/${lollyPath}`;
    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipboard = () => {
        const textField = document.createElement('textarea');
        textField.innerText = path;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        setCopySuccess('Copied!')
      };


    return (
        <div>
            <Header />
            <div className="showLollyDiv">
                <Lolly LollyTop={c1} LollyMiddle={c2} LollyBottom={c3} />
                <div>
                    <p className="share" >Your Lolly is freezing. Share it with this link:</p>
                    <pre>{path}</pre>
                    <div>
                        <button className="copy" onClick={copyToClipboard}>Copy</button>
                        &nbsp;{copySuccess}
                    </div>
                    <br />
                    <div className="details" >
                        <p className="recipient" >{receiver}</p>
                        <div className="message" >{msg}</div>
                        <p className="from" >___&nbsp;{sender}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LollyTemplate
