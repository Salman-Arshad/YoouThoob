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

const download = (url, filename, callback) => {
    const progressBar = new _cliProgress.SingleBar(
        {
            format: "Downloading  Kangana Tera Ni - ABEER ARORA | Hardbazy (VIDEO)|" + _colors.cyan("{bar}") + "| {percentage}% || {value}/{total} Chunks || Speed: {speed}",
        },
        _cliProgress.Presets.shades_classic
    );

    const file = fs.createWriteStream(filename);
    let receivedBytes = 0;

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
            progressBar.start((totalBytes / (1048576.0)).toFixed(2), 0);
        })
        .on("data", (chunk) => {
            // console.log(chunk.length);
            mbs = chunk.length / 1048576.0;
            receivedBytes += mbs
            receivedBytes=(parseFloat(receivedBytes.toFixed(2)))
            // console.log()
            progressBar.update(receivedBytes);
        })
        .pipe(file)
        .on("error", (err) => {
            fs.unlink(filename);
            progressBar.stop();
            return callback(err.message);
        });

    file.on("finish", () => {
        progressBar.stop();
        file.close(callback);
    });

    file.on("error", (err) => {
        fs.unlink(filename);
        progressBar.stop();
        return callback(err.message);
    });
};

download("https://jji.ijjiii.is/e6a8610482cb8c6061776682da8c31ad/8_Yz2hUmfIU/ccczsszcsmzo", "2.mp3", (e) => {
    if (e) console.log(e);
});