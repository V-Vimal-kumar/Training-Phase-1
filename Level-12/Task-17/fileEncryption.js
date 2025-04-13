const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32); 
const iv = crypto.randomBytes(16);  

const inputPath = path.join(__dirname, "secret.txt");
const encryptedPath = path.join(__dirname, "secret.enc");
const decryptedPath = path.join(__dirname, "secret-dec.txt");

function encryptFile(input, output) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const inputStream = fs.createReadStream(input);
    const outputStream = fs.createWriteStream(output);

    inputStream.pipe(cipher).pipe(outputStream);

    outputStream.on("finish", () => {
        console.log("🔒 File encrypted and saved as:", output);
        decryptFile(encryptedPath, decryptedPath);
    });

    inputStream.on("error", err => console.error("❌ Read Error:", err));
    outputStream.on("error", err => console.error("❌ Write Error:", err));
}

function decryptFile(input, output) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const inputStream = fs.createReadStream(input);
    const outputStream = fs.createWriteStream(output);

    inputStream.pipe(decipher).pipe(outputStream);

    outputStream.on("finish", () => {
        console.log("✅ File decrypted and saved as:", output);

        const original = fs.readFileSync(inputPath, "utf8");
        const decrypted = fs.readFileSync(decryptedPath, "utf8");
        if (original === decrypted) {
            console.log("✅ Decrypted content matches the original!");
        } else {
            console.error("❌ Decrypted content does NOT match the original.");
        }
    });

    inputStream.on("error", err => console.error("❌ Read Error:", err));
    outputStream.on("error", err => console.error("❌ Write Error:", err));
}

encryptFile(inputPath, encryptedPath);
