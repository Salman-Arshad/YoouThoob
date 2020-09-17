var fs = require("fs");
const request = require("request");
var progress = require("request-progress");
var ProgressBar = require("progress");
var _cliProgress = require("cli-progress");
var _colors = require("colors");
// var bar = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
//   complete: '=',
//   incomplete: ' ',
//   width: 20,
//   total: 9000
// });
// progress(request(
//     {
//         headers: {
//             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
//         },
//         uri: "https://ill.ijjiii.is/a621f1956f1e11b11d69be79306772d3/xKx_80QM2LU/caiwuiwcewcaa",
//         encoding: null,
//     },
//     function (error, response, image) {
//         if (!error && response.statusCode == 200) {
//             fs.writeFileSync("song.mp3", image);
//         } else {
//             console.log("here ");
//             console.log(response.statusCode);
//         }
//     }
// )).on('progress',function(state){
//   bar.tick(state.percent);
// })
const progressBar = new _cliProgress.MultiBar(
    {fps:60,
        format: "Downloading  Kangana Tera Ni - ABEER ARORA | Hardbazy (VIDEO)|" + _colors.cyan("{bar}") + "| {percentage}% || {value}/{total} Mbs|| Speed: {speed}",
    },
    _cliProgress.Presets.shades_classic
);
const download = (url, filename, callback) => {
    

    const file = fs.createWriteStream(filename);
    let receivedBytes = 0;
    let bar

    request
        .get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
            },
        })
        .on("response", (response) => {
            if (response.statusCode !== 200) {
                return callback("Response status was " + response.statusCode);
            }

            const totalBytes = response.headers["content-length"];
            bar  = progressBar.create(parseFloat((totalBytes / (1048576.0)).toFixed(2)), 0);
        })
        .on("data", (chunk) => {
            // console.log(chunk.length);
            mbs = chunk.length/(1024*1024)
            receivedBytes += mbs
            let receivedBytes2=(parseFloat(receivedBytes.toFixed(2)))
            // console.log()
            bar.update(receivedBytes2,{speed:45});
        })
        .pipe(file)
        .on("error", (err) => {
            fs.unlink(filename);
            bar.stop();
            return callback(err.message);
        });

    file.on("finish", () => {
        bar.stop();
        file.close(callback);
    });

    file.on("error", (err) => {
        fs.unlink(filename);
        progressBar.stop();
        return callback(err.message);
    });
};

download("https://jsj.ijjiii.is/1f4d33723aece98fe9f5b80fd9931cd6/w6u_qim3muE/cccwsswcsrwces", "6.mp3", (e) => {
    if (e) console.log(e);
});
download("https://slj.ijjiii.is/9e0284d2c9a17c8436830dc3a54ed665/ayVS5nUwXkQ/cccxssxcsrxces", "5.mp3", (e) => {
    if (e) console.log(e);
});