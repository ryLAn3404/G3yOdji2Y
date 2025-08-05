// 代码生成时间: 2025-08-06 01:00:25
const crypto = require('crypto');

/**
 * Password encryption and decryption tool
 *
 * @class PasswordTool
 */
class PasswordTool {
  /**
   * Encrypts a password using a secret key and algorithm.
   *
   * @static
   * @param {string} password Plain text password to be encrypted
   * @param {string} secretKey Secret key for encryption
   * @returns {string} Encrypted password
   */
  static encrypt(password, secretKey) {
    try {
      if (typeof password !== 'string' || typeof secretKey !== 'string') {
        throw new Error('Password and secret key must be strings.');
      }

      const cipher = crypto.createCipher('aes-256-cbc', secretKey);
      let encrypted = cipher.update(password, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
    } catch (error) {
      console.error('Encryption failed:', error.message);
      throw error;
    }
  }

  /**
   * Decrypts a password using a secret key and algorithm.
   *
   * @static
   * @param {string} encryptedPassword Encrypted password to be decrypted
   * @param {string} secretKey Secret key for decryption
   * @returns {string} Decrypted password
   */
  static decrypt(encryptedPassword, secretKey) {
    try {
      if (typeof encryptedPassword !== 'string' || typeof secretKey !== 'string') {
        throw new Error('Encrypted password and secret key must be strings.');
      }

      const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
      let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      console.error('Decryption failed:', error.message);
      throw error;
    }
  }
}

// Example usage:
const secretKey = 'your-secret-key-here';
const password = 'your-password-here';

const encrypted = PasswordTool.encrypt(password, secretKey);
console.log('Encrypted:', encrypted);

const decrypted = PasswordTool.decrypt(encrypted, secretKey);
console.log('Decrypted:', decrypted);