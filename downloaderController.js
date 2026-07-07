exports.downloadMedia = async (req, res) => {

    try {

        const { url, platform } = req.body;

        if (!url) {

            return res.status(400).json({

                success: false,

                message: "Please provide a URL."

            });

        }

        const supportedPlatforms = [

            "tiktok",
            "facebook",
            "instagram",
            "x",
            "pinterest"

        ];

        if (!supportedPlatforms.includes(platform)) {

            return res.status(400).json({

                success: false,

                message: "Unsupported platform."

            });

        }

        return res.json({

            success: true,

            message: "Downloader endpoint created successfully.",

            platform,

            url

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: "Downloader error."

        });

    }

};