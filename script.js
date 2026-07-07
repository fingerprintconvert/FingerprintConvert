// ======================================
// FingerprintConvert
// Frontend JavaScript
// Version 2
// ======================================

const API = window.location.origin;

// Generic converter
async function uploadAndConvert(fileInputId, formatInputId, endpoint) {

    const file = document.getElementById(fileInputId)?.files[0];
    const format = document.getElementById(formatInputId)?.value;

    if (!file) {
        alert("Please select a file.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    if (format) {
        formData.append("format", format);
    }

    try {

        const response = await fetch(API + endpoint, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Conversion failed");
        }

        const blob = await response.blob();

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = "converted";

        document.body.appendChild(a);

        a.click();

        a.remove();

        URL.revokeObjectURL(url);

    } catch (error) {

        alert(error.message);

    }

}

// Audio
document.getElementById("convertAudio")?.addEventListener("click", () => {
    uploadAndConvert("audioFile","audioFormat","/audio/convert");
});

// Video
document.getElementById("convertVideo")?.addEventListener("click", () => {
    uploadAndConvert("videoFile","videoFormat","/video/convert");
});

// Image
document.getElementById("convertImage")?.addEventListener("click", () => {
    uploadAndConvert("imageFile","imageFormat","/image/convert");
});

// PDF
document.getElementById("convertPdf")?.addEventListener("click", () => {
    uploadAndConvert("pdfFile","pdfTool","/pdf/process");
});

// Downloader
document.getElementById("downloadBtn")?.addEventListener("click", async () => {

    const url = document.getElementById("videoUrl").value;
    const platform = document.getElementById("platform").value;

    if (!url) {

        alert("Please paste a URL.");

        return;

    }

    const response = await fetch(API + "/downloader/download", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            url,

            platform

        })

    });

    const data = await response.json();

    alert(data.message);

});