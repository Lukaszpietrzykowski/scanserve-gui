import React, {useEffect, useState} from 'react';
import "./QRCodes.css"
import axios from "axios";
import {Button, Divider} from "@mui/material";

function QrCodes() {

    const [isLoading, setIsLoading] = useState(true)
    const [tablesData, setTablesData] = useState([])

    useEffect(() => {
        getTablesQRdata()
    }, []);


    function getTablesQRdata() {
        setIsLoading(true)
        axios.get("/tables")
            .then(response => {
                setTablesData(response.data)
                setIsLoading(false)
            })
    }

    function downloadAllQRCodes() {
        tablesData.forEach((tableItem) => downloadImage(tableItem))
    }

    function downloadImage(tableItem) {
        const image = "data:image/png;base64," + tableItem.qrCode;
        const byteString = atob(image.split(',')[1]);
        const mimeString = image.split(',')[0].split(':')[1].split(';')[0];
        const buffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(buffer);
        for (let i = 0; i < image.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([buffer], {type: mimeString});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = tableItem.name + ".png"; // Set the file name
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }

    return !isLoading ? (
        <div className={"qr-codes-container"}>
            <div className={"top-bar-container"}>
                <h2>QR Codes</h2>
                <Button sx={{height: "30px"}} variant="contained" onClick={downloadAllQRCodes} disableElevation>Download All QR Codes</Button>
            </div>
            <Divider/>
            <div className={"qr-codes-display-container"}>
                {tablesData.map((tableItem, index) => (
                    <div key={index + tableItem.id} className={"qr-code-item"}>
                        <div className={"qr-table-name"}>
                            <span style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "center"
                            }}><b>{tableItem.name}</b></span>
                        </div>
                        <div className={"qr-code-image"}>
                            <img src={"data:image/png;base64," + tableItem.qrCode} alt={"qr-code"}/>
                        </div>
                        <div className={"qr-code-buttons"}>
                            <Button sx={{height: "40px"}} variant="contained" onClick={() => downloadImage(tableItem)}
                                    disableElevation>Download QR</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : null;
}

export default QrCodes;