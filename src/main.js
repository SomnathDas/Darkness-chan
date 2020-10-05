const nhentai = require('nhentai-js');
let fs = require('fs');
let request = require('request');
const imgToPDF = require('image-to-pdf');
const path = require('path');

let download_Status = false;
let error_boii = false;
let down_Count = document.getElementById('down_Count');

async function getDoujin(id) {

  const PDFpages = []; 
  const directory = require('path').join(require('os').homedir(), 'Desktop/temp_images');
  let pages_array = [];
  error_boii = false;

  try {

    console.log('\x1b[41m%s\x1b[0m', 
      `Welcome To 『 𝓓𝓸𝓾𝓳𝓲𝓷 𝓒𝓸𝓭𝓮 𝓣𝓸 𝓟𝓓𝓕 』|『 同人コードをPDFに 』`);
    console.log('\x1b[41m%s\x1b[0m', 
      `        『 Created By Somnath Das, @samurai3247 [Instagram] 』`);
    console.log('\x1b[44m%s\x1b[0m', 
      `Processing and Converting your Code, Please Wait, senpai uwu`);

    fs.mkdir(directory, (damn_error) => {
            if(damn_error) {
              if(damn_error.hasOwnProperty('errno') && damn_error['errno'] == '-17') {
                console.log("Directory already exists");
              } else {
              console.log(damn_error);
              }
            } else if(!damn_error){
              console.log("Created New Directory To Store Images");
            }
          });

    if(nhentai.exists(id)) {

        const dojin = await nhentai.getDoujin(id);
        pages_array = dojin.pages;
        let title = dojin.title;
        let download_count = 0;
        pages_array = dojin.pages;
        
        console.log(`Doujin title: ${title}`);
        console.log("Downloading...")
        for (let i = 0; i < pages_array.length; i++) {
          image_name = require('path').join(require('os').homedir(), 'Desktop/temp_images/image' + i + '.jpg');
          //image_name = 'temp_images/image' + i + '.jpg';
          await new Promise((resolve) => request(pages_array[i]).pipe(fs.createWriteStream(image_name)).on('finish', resolve))
          PDFpages.push(image_name);
          download_count++;
          down_Count.innerHTML = `Downloading: ${download_count} out of ${pages_array.length}`;
          console.log(`Downloading: ${download_count} out of ${pages_array.length}`)
        }

        let damn_pdfDir = require('path').join(require('os').homedir(), `Desktop/${title}.pdf`);
        imgToPDF(PDFpages, 'A4').pipe(fs.createWriteStream(damn_pdfDir));

        try {
          fs.readdir(directory, (err, files) => {
          if (err) throw err;

          for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
            });
          }
          });

        }catch(eRR) {
          console.log(eRR);
        }

    } else {
      console.log("Nuke Code doesn't exists, bakka shi nee *^*")
    }
    
  }catch(wtf_error) {
    console.log(wtf_error);
    error_boii = true;

  }finally {
    download_Status = true; 
    console.log("Completed");   
  }

}

// Created by Somnath Das :) @samurai3247 [Instagram]
// Enjoy :) my fellow man/woman of culture 

async function nyan() {
  let nukeCode = document.getElementById('nuke_Code').value;
  let nukeBtn = document.getElementById('nuke_Button');
  let doujin_Pages = document.getElementById('doujin_Pages');
  let status = document.getElementById('status');
  let loading_Icon = document.getElementById('loading_Icon');
  let doujin_Title = document.getElementById('doujin_Title');
  let completion_msg;
  let title;

  nukeCode.toString();
  //console.log(nukeCode);

  loading_Icon.removeAttribute("style");
  status.innerHTML = "";
  doujin_Title.innerHTML = "";

  try {
    const doujin = await nhentai.getDoujin(nukeCode);
    title = doujin.title;
    doujin_Title.innerHTML = `Title: ${title}`;
  }catch(err) {
    //console.log(err);
  }

  nukeCode.toString();
  await getDoujin(nukeCode);  

  console.log(`Error: ${error_boii}`);

  if(nukeCode.length == 0) {

    loading_Icon.setAttribute("style", "display: none;");
    completion_msg = "Enter the code, fuck face"; 
  } else if(error_boii == true) {
    loading_Icon.setAttribute("style", "display: none;");
    completion_msg = "ERROR: DOUJIN DOESN'T EXISTS, TRY AGAIN";
  } else {
    doujin_Title.innerHTML = "";
    loading_Icon.setAttribute("style", "display: none;");
    down_Count.innerHTML = "";
    completion_msg = `Completed! Filename: ${title}.pdf`;
  }

  if(download_Status == true) {
    status.innerHTML = completion_msg;
  }

  
}

function go_to_Credits() {
  location.href = "credits.html";

}

function back() {
  location.href = "index.html";
}

function redirect_Git() {
  location.href = "https://github.com/SomnathDas/DoujinCodeToPdf/blob/master/README.md";
}

function stopBtn() {
  window.location.reload();
}

async function checkBtn() {
  try {
    let loading_Icon = document.getElementById('loading_Icon');
    loading_Icon.removeAttribute("style");
    let status = document.getElementById('status');
    let nukeCode = document.getElementById('nuke_Code').value;
    let doujin_Pages = document.getElementById('doujin_Pages');
    status.innerHTML = "";
    const doujin = await nhentai.getDoujin(nukeCode);
    let title = doujin.title;
    let doujinPages = doujin['pages'].length;
    loading_Icon.setAttribute("style", "display: none;");
    doujin_Title.innerHTML = `Title: ${title}`;
    doujin_Pages.innerHTML = `Pages: ${doujinPages}`;
  }catch(err) {
    let nukeCode = document.getElementById('nuke_Code').value;
    let status = document.getElementById('status');
    if(nukeCode.length == 0) {
      loading_Icon.setAttribute("style", "display: none;");
      status.innerHTML = "Enter the code, fuck face"; 
    } else {
      loading_Icon.setAttribute("style", "display: none;");
      status.innerHTML = "ERROR: DOUJIN DOESN'T EXISTS, TRY AGAIN";
    }
    
    console.log(err);

  }
}

// Created by Somnath Das :) @samurai3247 [Instagram]
// Enjoy :) my fellow man/woman of culture 
