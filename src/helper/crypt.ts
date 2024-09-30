import crypto from 'crypto';

// Secret key for encryption (should be stored securely in env variables)
const secretKey = String(process.env.TOKEN_SECRET);
console.log(secretKey)

// Function to encrypt the token
export function encryptToken(token: any) {
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
  let encrypted = cipher.update(token);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Function to decrypt the token
export function decryptToken(encryptedToken: any) {
  const [iv, encrypted] = encryptedToken.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
