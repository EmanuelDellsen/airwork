const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const path = require("path"); //enable using relative path

// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive",
];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.resolve(__dirname, "../../token.json");
const EXTENSION = "json";

async function getCredentials() {
  var data = fs.readFileSync(
    path.resolve(__dirname, "../../credentials.json"),
    (err, content) => {
      if (err) {
        throw err;
      } else {
        return content;
      }
    }
  );
  return data;
}

async function getOAuthClient(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.content;
  const oAuthClient = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  return oAuthClient;
}

async function getAccessToken() {
  var data = fs.readFileSync(TOKEN_PATH, (err, token) => {
    if (err) {
      return null;
    } else {
      return token;
    }
  });
  return data;
}

async function createAccessToken(oAuthClient) {
  const authUrl = oAuthClient.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
    });
  });
}

async function createFolder(auth) {
  const drive = google.drive({ version: "v3", auth });

  let date = new Date();
  let date_string = date.toString();

  var fileMetadata = {
    //name = name of folder
    name: date_string,
    mimeType: "application/vnd.google-apps.folder",
  };
  let folder = await drive.files.create({
    resource: fileMetadata,
    fields: "id",
  });
  return folder.data.id;
}

async function uploadFile(auth, folder_id, file) {
  const drive = google.drive({ version: "v3", auth });
  var fileMetadata = {
    //name = name of file in drive
    name: file,
    parents: [folder_id],
  };
  var media = {
    mimeType: "text/plain",
    body: fs.createReadStream(`collections/${file}`),
  };
  let content = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id",
  });
  return content.data.id;
}

function getAllFilesByExtension(base, ext) {
  console.log(base);
  var files = fs.readdirSync(base);
  var result = [];

  files.forEach(function(file) {
    if (file.substr(-1 * (ext.length + 1)) == "." + ext) {
      result.push(file);
    }
  });
  return result;
}

async function main() {
  try {
    var credentials = await getCredentials();
    var oAuthClient = await getOAuthClient(JSON.parse(credentials));
    var token = await getAccessToken();

    if (!token) {
      await createAccessToken(oAuthClient);
      token = await getAccessToken();
    }
    oAuthClient.setCredentials(JSON.parse(token));
    var folder_id = await createFolder(oAuthClient);

    // get files to be uploaded
    var ptr = path.resolve(__dirname);
    var fullpath = ptr.concat("/collections");
    console.log(fullpath)
    var files = getAllFilesByExtension(fullpath, EXTENSION);

    console.log("Files",files)

    files.forEach(async function(file) {
      try {
        var num = await uploadFile(oAuthClient, folder_id, file);
        console.log(num);
      } catch (e) {
        console.log("Error caught");
      }
    });
  } catch (err) {
    console.log(err);
  }
}

var methods = {
  run: function() {
    // run main
    main();
  },
};

module.exports = methods;
