using System.Security.Cryptography;

namespace TeslaRentingApp
{
    public static class Security
    {
        public static byte[] CreateSalt()
        {
            byte[] salt = new byte[8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        public static string HashThePassword(string password, byte[] salt)
        {
            string saltString = BitConverter.ToString(salt);
            string concatPswSalt = password + saltString;

            Rfc2898DeriveBytes hash = new(concatPswSalt, salt, 1000);
            byte[] hashBytes = hash.GetBytes(32);
            string hashString = BitConverter.ToString(hashBytes);

            return hashString;
        }
    }
}
